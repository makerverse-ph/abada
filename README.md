
# StratSearch Foundation, Inc.

React 19 and Vite website for `https://stratsearch.org/`.

## Run locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Optionally copy the SEO verification variables from [.env.example](.env.example) into `.env.local`.
3. Run the app:
   `npm run dev`

## Validate and build

- `npm run lint` runs the TypeScript check.
- `npm test` runs TypeScript, the production build, prerendering, redirect generation, and SEO validation.
- `npm run build` creates the deployable GitHub Pages artifact in `dist/` and validates its technical SEO output.

The generated homepage contains prerendered content and hydrates into the existing React application in the browser. See [SEO_OPERATIONS.md](SEO_OPERATIONS.md) for deployment and search-engine verification procedures.
