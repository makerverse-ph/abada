import React, {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import App from '../src/App.tsx';

const outputPath = resolve('dist/index.html');
const template = await readFile(outputPath, 'utf8');
const rootPlaceholder = '<div id="root"></div>';

if (!template.includes(rootPlaceholder)) {
  throw new Error(`Unable to prerender: ${rootPlaceholder} was not found in dist/index.html.`);
}

const appHtml = renderToString(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (!appHtml.includes('<h1') || !appHtml.includes('id="main-content"')) {
  throw new Error('Unable to prerender: the rendered application is missing its primary content.');
}

await writeFile(
  outputPath,
  template.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`),
  'utf8',
);

console.log(`Prerendered ${appHtml.length.toLocaleString()} characters into dist/index.html.`);
