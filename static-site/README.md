# StratSearch Foundation Portal — Static Site Archive
This directory contains the completely self-contained, standalone static website files for the **StratSearch Foundation, Inc. (SSFI)** platform portal. 

These files are designed to run instantly inside any browser without compiling, node server configurations, databases, or third-party frameworks. They are optimized and structured for hosting on **GitHub Pages**.

---

## 📁 File Structure
- `index.html` — The primary structural backbone containing SEO optimization, semantic headings, JSON-LD organization tags, and Layout architecture.
- `styles.css` — Custom global rules, scrollbar formatting, high-trust colors, active link highlights, entrance animations, and print media optimizations.
- `script.js` — Client side controls driving the sticky header, intersection nav tracking, mobile hamburger drawer, publications search/filter database, and simulation dispatches.

---

## 🚀 Deployment to GitHub Pages

To deploy this website for public access under your own custom domain or github.io address, follow these exact 4 steps:

### Step 1: Create a GitHub Repository
1. Log into your account on [GitHub](https://github.com/).
2. Click the green **New** button to create a new repository.
3. In **Repository Name**, enter: `stratsearch` (or any custom name).
4. Set the repository to **Public** (required for free GitHub Pages hosting).
5. Leave "Add a README", ".gitignore", and "License" unchecked, then click **Create Repository**.

### Step 2: Upload Your Standalone Files
1. Drag and drop the static files from the `/static-site/` folder directly into the GitHub web interface:
   - `index.html`
   - `styles.css`
   - `script.js`
2. **Alternatively**, if using the terminal:
   ```bash
   git init
   git add index.html styles.css script.js
   git commit -m "Initialize StratSearch Foundation Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/stratsearch.git
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages
1. Navigate to your repository page on GitHub.
2. In the top tabs, click **Settings**.
3. In the left sidebar, scroll down and select **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Set **Source** to: `Deploy from a branch`
   - Under **Branch**, select your primary branch (e.g., `main` or `master`) and set the folder to `/ (root)`.
5. Click **Save**.

### Step 4: Access Your Live Site
Within 1–2 minutes, GitHub will compile and host your static files. You can see your live think-tank portal link at:
`https://YOUR_USERNAME.github.io/stratsearch/`

---

## ✍️ Customizing and Maintaining the Portal

### Replacing Leadership Portrait Placeholders
The portal includes elegant high-trust text crest placeholders (`CC` and `DL`) instead of hotlinked files to prevent latency issues.
To add corporate portraits:
1. Create a folder named `assets/` in your repository.
2. Save your professional portraits as:
   - `assets/clarita-carlos.jpg`
   - `assets/dennis-lalata.jpg`
3. Edit `index.html` where the profile placeholders reside and swap the placeholder tags to absolute images:
   ```html
   <!-- Replace the CC/DL text blocks with actual image links -->
   <img src="assets/clarita-carlos.jpg" alt="Dr. Clarita R. Carlos" class="w-20 h-20 rounded-full object-cover border-2 border-accentGold shadow-md">
   ```

### Adding and Modifying Publications
All publications are located inside a structured array at the top of the `/static-site/script.js` file:
```javascript
const publications = [
  {
    id: 'pub1',
    title: 'Disaster Management in the Philippines',
    year: 'In Press',
    status: 'In Press',
    category: 'Resilience',
    categoryLabel: 'Disaster Risk & Resilience',
    author: 'StratSearch Foundation Core Research Panel',
    description: 'An exhaustive assessment of vulnerability indices...'
  },
  // ... Add new publications here
];
```
To append articles:
1. Open `script.js`.
2. Duplicate one block, update fields, set category matches to (`Governance`, `Electoral`, `ASEAN`, or `Resilience`), and save.
3. The search field and category tab buttons will auto-compile, index, count, and display the new listing dynamically!

---

## 🔒 Security and Privacy Safeguards
- **Zero Tracker Scripts**: The site has no third-party trackers, keeping data collection zero.
- **Form Protection**: Communications forms use client-side logging triggers without databases to comply with government privacy guidelines.
- **Secure CDN Use**: All links load from verified secure CDNs (Tailwind CDN, Lucide, and Google Fonts) with HTTPS encryption.
