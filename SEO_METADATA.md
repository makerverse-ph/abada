# SEO Metadata Register

The production site has one indexable route. Hash destinations are sections of the same document and inherit the homepage metadata.

| Route | Title | Meta description | Canonical | Robots | Structured data |
| --- | --- | --- | --- | --- | --- |
| `/` | StratSearch Foundation, Inc. \| Evidence-Based Policy Research | StratSearch Foundation, Inc. (SSFI) is a Philippine policy research and strategic development think tank championing science, evidence, and strategic insight in public decision-making. | `https://stratsearch.org/` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `Organization`, `WebSite` |

## Social metadata

The route includes:

- Open Graph title, description, absolute URL, `website` type, site name, image, image dimensions, and image alt text.
- Twitter/X `summary_large_image` card, title, description, image, and image alt text.

## Ownership verification

The HTML metadata transform conditionally adds verification tags when these build variables are present:

- `VITE_GOOGLE_SITE_VERIFICATION`
- `VITE_BING_SITE_VERIFICATION`

The values are omitted entirely when unset, so placeholder verification values cannot reach production.
