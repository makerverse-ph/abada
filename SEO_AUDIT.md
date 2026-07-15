# Technical SEO Audit

Audit date: 2026-07-15  
Production origin: `https://stratsearch.org/`

## Architecture and scope

- The production application uses React 19 with Vite 6.
- GitHub Pages deploys the generated `dist/` directory through `.github/workflows/deploy-pages.yml`.
- The website is one public page. Navigation destinations such as `#mission` and `#publications` are sections of `/`, not separate routes.
- There is no client-side router, SSR server, or pre-existing SSG implementation.
- `static-site/` is a standalone archive and is not part of the production Vite deployment artifact.

## Baseline technical problems

- The generated HTML contained an empty `#root`; headings, body content, and internal section links required client-side JavaScript.
- The document title was `My Google AI Studio App`.
- Canonical, robots, Open Graph, Twitter/X, and production structured-data metadata were absent from the Vite entry page.
- Vite emitted `/abada/` asset paths even though the verified production site uses the root custom domain.
- No `robots.txt` or XML sitemap was emitted.
- No automated SEO validation or test script existed.
- No legacy URL handling was generated for the evaluated WordPress section URLs.
- Analytics loaded in development as well as production.
- The page lacked a main landmark and skip link. Mobile and modal controls were missing several state and naming attributes.
- Google Fonts were discovered through a CSS `@import`, delaying font discovery.
- Six unused direct packages and their transitive dependency tree were installed.

## Changes implemented

### Rendering and crawlability

- Added build-time React prerendering. `dist/index.html` now contains the existing page content, one `h1`, all existing sections, publication cards, forms, and crawlable anchors before JavaScript runs.
- Changed the client entry to hydrate prerendered markup while retaining the existing interactive behavior.
- Set Vite to relative asset URLs so the same artifact works on GitHub project Pages (`/abada/`) and the custom-domain root.

### Metadata and structured data

- Added a centralized homepage SEO configuration in `src/seo.ts` and a Vite HTML transform that emits metadata into the initial document.
- Added a unique production title, meta description, absolute canonical, robots directive, complete Open Graph tags, and complete Twitter/X tags.
- Added verified `Organization` and `WebSite` JSON-LD. Organization data is limited to facts already visible in the repository.
- Added optional build-time Google and Bing verification meta tags.

### Discovery and canonicalization

- Added `public/robots.txt` with normal crawl access and the production sitemap location.
- Added `public/sitemap.xml` containing only the single canonical, indexable page.
- Added the production `CNAME` to the GitHub Pages artifact.
- Added eight noindex legacy redirect files for historical URLs with clear section equivalents.
- Query strings and hash fragments resolve to a document whose canonical remains `https://stratsearch.org/`.

### Semantics and accessibility

- Added one `main` landmark and a keyboard-accessible skip link.
- Preserved one primary `h1` and corrected non-semantic heading levels without changing their displayed wording or styling.
- Added navigation labels, mobile menu state/control attributes, dialog metadata, close-button names, and a back-to-top button name.
- Added reduced-motion handling.

### Performance and delivery

- Moved Google Font loading from CSS `@import` to early HTML links with preconnects and `display=swap`.
- Deferred analytics initialization until the production client loads and prevented it from loading on local or preview hostnames.
- Preserved Vite's content-hashed CSS and JavaScript assets.
- Removed unused direct dependencies. The audited install decreased from 215 packages to 91 packages with zero reported vulnerabilities.

### Validation and deployment

- Added build-time checks for titles, descriptions, canonical URLs, robots directives, one `h1`, non-empty main content, Open Graph, Twitter/X, JSON-LD syntax, production URL hygiene, fragment links, sitemap inclusion, crawlability, and redirect outputs.
- Added `npm test`; the GitHub workflow now type-checks before building, and the build itself runs SEO validation.

## Content-preservation result

Existing headings, paragraphs, labels, navigation wording, buttons, biographies, services, publications, events, contact information, page order, section order, styling, and interactive behavior were retained. Semantic element changes preserve the existing displayed words and classes. The only added interface text is the accessibility-required skip link, which remains off-screen until keyboard focus.

## Remaining technical limitations

- GitHub Pages cannot configure real origin-level `301` rules. Legacy paths therefore return a static page that immediately redirects using HTML and JavaScript. Moving to a host with redirect rules would allow true `301` responses without changing the site.
- GitHub Pages does not expose project-level custom cache-header configuration. Vite fingerprinting still provides cache-safe asset URLs.
- The `www`/apex and HTTP/HTTPS redirect behavior depends on GitHub Pages and DNS settings and must be verified after deployment.
- Core Web Vitals field data, Rich Results results, index coverage, and analytics receipt require the deployed site and owner access.
- The social-sharing image is the existing external image reference; its availability is controlled by the external host.
- Hash sections are not independent pages and therefore do not receive separate metadata or sitemap entries.
- No `Event` schema was added because the visible forthcoming events do not contain complete verified dates and locations.
- No image markup changes were necessary because the production React page has no raster `<img>` elements; its primary visual is inline SVG/CSS.
