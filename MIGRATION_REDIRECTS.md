# Legacy URL Redirect Register

GitHub Pages does not support repository-defined HTTP `301` rules. For clear equivalents, the build emits noindex HTML redirect files with an immediate meta refresh and `window.location.replace`. The canonical destination is the one-page production URL; fragments select the matching existing section.

| Legacy URL | New equivalent | Redirect status | Reason | Hosting implementation |
| --- | --- | --- | --- | --- |
| `/history/` | `/#about` | Implemented; HTTP 200 platform fallback | The existing About section contains the institutional history. | `dist/history/index.html` |
| `/mission/` | `/#mission` | Implemented; HTTP 200 platform fallback | Direct existing Mission section equivalent. | `dist/mission/index.html` |
| `/research-areas/` | `/#themes` | Implemented; HTTP 200 platform fallback | The existing Strategic Research Themes section is the clear equivalent. | `dist/research-areas/index.html` |
| `/leadership/` | `/#leadership` | Implemented; HTTP 200 platform fallback | Direct existing Leadership section equivalent. | `dist/leadership/index.html` |
| `/activities/` | `/#events` | Implemented; HTTP 200 platform fallback | Existing Activities & Events section equivalent. | `dist/activities/index.html` |
| `/events/` | `/#events` | Implemented; HTTP 200 platform fallback | Direct existing Events section equivalent. | `dist/events/index.html` |
| `/publications/` | `/#publications` | Implemented; HTTP 200 platform fallback | Direct existing Publications section equivalent. | `dist/publications/index.html` |
| `/contact-us-2/` | `/#contact` | Implemented; HTTP 200 platform fallback | Direct existing Contact section equivalent. | `dist/contact-us-2/index.html` |
| `/2015/07/01/bblsabah/` | None | Not redirected | No clear equivalent article or section exists in the current repository. Redirecting it to unrelated content would be misleading. | GitHub Pages retains its normal 404 response. |

If hosting later moves to a platform with redirect-rule support, configure the eight implemented mappings as permanent `301` redirects and remove the generated HTML fallbacks.
