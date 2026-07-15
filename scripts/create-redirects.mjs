import {mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const origin = 'https://stratsearch.org';
const redirects = new Map([
  ['history', '#about'],
  ['mission', '#mission'],
  ['research-areas', '#themes'],
  ['leadership', '#leadership'],
  ['activities', '#events'],
  ['events', '#events'],
  ['publications', '#publications'],
  ['contact-us-2', '#contact'],
]);

for (const [legacyPath, fragment] of redirects) {
  const target = `../${fragment}`;
  const directory = resolve('dist', legacyPath);
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="${origin}/">
    <title>StratSearch Foundation, Inc.</title>
    <script>window.location.replace(${JSON.stringify(target)});</script>
  </head>
  <body></body>
</html>
`;

  await mkdir(directory, {recursive: true});
  await writeFile(resolve(directory, 'index.html'), html, 'utf8');
}

console.log(`Generated ${redirects.size} GitHub Pages-compatible legacy redirects.`);
