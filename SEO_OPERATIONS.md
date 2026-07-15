# SEO Operations

## Deployment verification

1. Run `npm ci`, `npm run lint`, and `npm run build`.
2. Confirm the build reports successful prerendering, eight legacy redirects, and a passing SEO validation result.
3. After GitHub Pages deploys, verify:
   - `https://stratsearch.org/` returns `200` over HTTPS.
   - Page source contains the primary `h1`, body content, canonical, robots directive, social metadata, and JSON-LD.
   - `/robots.txt` and `/sitemap.xml` return `200` with the expected production URLs.
   - A legacy URL such as `/mission/` reaches `/#mission`.
   - CSS and JavaScript load from `/assets/`, not `/abada/assets/`.
4. Check both apex and `www` hostnames. The non-canonical hostname must redirect to `https://stratsearch.org/` through GitHub Pages/DNS configuration.

## Google Search Console

1. Add or open the Domain property for `stratsearch.org` and complete the DNS verification requested by Google.
2. If an HTML meta verification is preferred, store only the token value as the GitHub Actions repository variable `VITE_GOOGLE_SITE_VERIFICATION`, then redeploy.
3. Submit `https://stratsearch.org/sitemap.xml` in the Sitemaps report.
4. Inspect `https://stratsearch.org/` with URL Inspection, test the live URL, and request indexing after the verified deployment.
5. Monitor page indexing, HTTPS, manual actions, and Core Web Vitals reports.

## Bing Webmaster Tools

1. Add `https://stratsearch.org/` in Bing Webmaster Tools or import the verified Search Console property.
2. For meta verification, store the Bing token as `VITE_BING_SITE_VERIFICATION` in GitHub Actions repository variables and redeploy.
3. Submit `https://stratsearch.org/sitemap.xml` and verify successful retrieval.

## Google Analytics 4

- The supplied GA4 measurement ID is `G-036PVEWZS5`.
- The integration loads only when the production build runs on the exact `stratsearch.org` hostname.
- `VITE_GA_MEASUREMENT_ID` can override the configured ID at build time. The GitHub workflow reads the repository variable with that name.
- The site has one canonical route and hash-based section navigation, so the normal initial GA4 page view represents the page load. Hash scrolling does not create artificial route page views.
- After deployment, use GA4 Realtime and the browser network panel to confirm one Google tag request and one initial page view.

## Structured data and social previews

1. Test `https://stratsearch.org/` with Google's Rich Results Test and Schema.org Validator.
2. Confirm the `Organization` and `WebSite` nodes match the visible organization name, address, email, founding year, and description.
3. Recheck Open Graph and Twitter/X previews after any future social-image infrastructure change.

## Core Web Vitals

- Run PageSpeed Insights for mobile and desktop after deployment.
- Monitor LCP, INP, and CLS in Search Console field data once sufficient traffic is available.
- Use a fresh production build for lab checks so prerendering, deferred production analytics, font preconnects, and fingerprinted assets are included.
- GitHub Pages controls response headers; verify effective compression and caching in the deployed response headers.

## Ongoing crawl checks

- Run `npm test` before every deployment.
- Keep `src/seo.ts`, `public/sitemap.xml`, and the validator route list synchronized if a real public route is introduced later.
- Add only canonical, indexable URLs to the sitemap. Keep redirects, 404s, search states, and utility output excluded.
- Revalidate internal fragments and JSON-LD after structural component changes.
- Do not assign sitemap `lastmod` values unless a reliable source modification date is available.
