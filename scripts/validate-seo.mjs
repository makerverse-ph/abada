import {access, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const productionOrigin = 'https://stratsearch.org';
const indexableRoutes = [{path: '/', output: 'index.html'}];
const redirectRoutes = [
  'history',
  'mission',
  'research-areas',
  'leadership',
  'activities',
  'events',
  'publications',
  'contact-us-2',
];
const failures = [];

function fail(route, message) {
  failures.push(`${route}: ${message}`);
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/g)].map((match) => [
      match[1].toLowerCase(),
      match[3],
    ]),
  );
}

function getMeta(html, key, value) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (attrs[key] === value) return attrs.content || '';
  }
  return '';
}

function stripMarkup(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const route of indexableRoutes) {
  const html = await readFile(resolve('dist', route.output), 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() || '';
  const description = getMeta(html, 'name', 'description');
  const robots = getMeta(html, 'name', 'robots');
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => attrs.rel === 'canonical');
  const canonical = canonicalTag?.href || '';
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainCount = (html.match(/<main\b/gi) || []).length;
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';

  if (!title) fail(route.path, 'missing or empty title');
  if (titles.has(title)) fail(route.path, 'duplicate title');
  titles.add(title);

  if (!description) fail(route.path, 'missing or empty meta description');
  if (descriptions.has(description)) fail(route.path, 'duplicate meta description');
  descriptions.add(description);

  if (!canonical.startsWith(`${productionOrigin}/`)) fail(route.path, 'canonical is not an absolute production URL');
  if (canonicals.has(canonical)) fail(route.path, 'duplicate canonical');
  canonicals.add(canonical);

  if (!/^index,\s*follow/i.test(robots)) fail(route.path, 'robots directive is not index, follow');
  if (h1Count !== 1) fail(route.path, `expected exactly one h1, found ${h1Count}`);
  if (mainCount !== 1) fail(route.path, `expected exactly one main landmark, found ${mainCount}`);
  if (stripMarkup(main).length < 500) fail(route.path, 'main content is empty or unexpectedly short');
  if (!/<html\b[^>]*lang=["']en["']/i.test(html)) fail(route.path, 'document language is missing or incorrect');

  let previousHeadingLevel = 0;
  for (const heading of html.matchAll(/<h([1-6])\b[^>]*>/gi)) {
    const level = Number(heading[1]);
    if (previousHeadingLevel > 0 && level > previousHeadingLevel + 1) {
      fail(route.path, `heading order skips from h${previousHeadingLevel} to h${level}`);
    }
    previousHeadingLevel = level;
  }

  const requiredOpenGraph = [
    'og:title',
    'og:description',
    'og:url',
    'og:type',
    'og:site_name',
    'og:image',
    'og:image:width',
    'og:image:height',
    'og:image:alt',
  ];
  for (const property of requiredOpenGraph) {
    if (!getMeta(html, 'property', property)) fail(route.path, `missing ${property}`);
  }

  const requiredTwitter = [
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt',
  ];
  for (const name of requiredTwitter) {
    if (!getMeta(html, 'name', name)) fail(route.path, `missing ${name}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (jsonLdBlocks.length === 0) fail(route.path, 'missing JSON-LD');
  for (const [, source] of jsonLdBlocks) {
    try {
      JSON.parse(source);
    } catch (error) {
      fail(route.path, `invalid JSON-LD: ${error.message}`);
    }
  }

  if (/https?:\/\/(?:localhost|127\.0\.0\.1)|\.github\.io|staging\./i.test(html)) {
    fail(route.path, 'development or staging URL found in production HTML');
  }

  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attributes(match[0]).href;
    if (href === undefined || href.trim() === '') {
      fail(route.path, 'anchor has a missing or empty href');
    } else if (href.startsWith('#') && !ids.has(decodeURIComponent(href.slice(1)))) {
      fail(route.path, `broken fragment link ${href}`);
    }
  }

  for (const match of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const resource = attrs.src || attrs.href;
    if (!resource?.startsWith('/') || resource.startsWith('//')) continue;

    const resourcePath = resource.split(/[?#]/, 1)[0].replace(/^\//, '');
    try {
      await access(resolve('dist', resourcePath));
    } catch {
      fail(route.path, `referenced build asset is missing: ${resource}`);
    }
  }

  if (!html.includes('Championing science,') || !html.includes('Connect With SSFI Secretariat')) {
    fail(route.path, 'expected primary page content is absent from initial HTML');
  }
}

const sitemap = await readFile(resolve('dist/sitemap.xml'), 'utf8');
const robotsTxt = await readFile(resolve('dist/robots.txt'), 'utf8');

if (!/^<\?xml[^>]*>[\s\S]*<urlset\b[^>]*>[\s\S]*<\/urlset>\s*$/i.test(sitemap.trim())) {
  fail('/sitemap.xml', 'sitemap XML structure is invalid');
}

for (const route of indexableRoutes) {
  const canonical = `${productionOrigin}${route.path}`;
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(route.path, 'route is missing from sitemap.xml');
}

if (!robotsTxt.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
  fail('/robots.txt', 'production sitemap reference is missing');
}
if (/Disallow:\s*\//i.test(robotsTxt)) fail('/robots.txt', 'normal public crawling is blocked');

for (const route of redirectRoutes) {
  const output = resolve('dist', route, 'index.html');
  try {
    await access(output);
    const html = await readFile(output, 'utf8');
    if (!getMeta(html, 'name', 'robots').startsWith('noindex')) {
      fail(`/${route}/`, 'redirect page is not noindex');
    }
  } catch {
    fail(`/${route}/`, 'redirect output is missing');
  }
}

if (sitemap.includes('/history/') || sitemap.includes('/contact-us-2/')) {
  fail('/sitemap.xml', 'legacy redirect URLs must not be included');
}

if (failures.length > 0) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${indexableRoutes.length} indexable route and ${redirectRoutes.length} redirects.`);
