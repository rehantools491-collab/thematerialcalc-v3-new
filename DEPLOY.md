# MaterialCalc.com — Deployment Guide

## Prerequisites

- Node.js 18+ installed on your local machine
- npm or yarn package manager
- Hostinger shared hosting account with file manager or FTP access
- Domain materialcalc.com pointed to Hostinger nameservers

---

## Step 1: Install Dependencies

```bash
cd materialcalc
npm install
```

## Step 2: Build the Static Export

```bash
npm run build
```

This creates an `out/` directory containing the complete static website.
The `next.config.ts` is already configured with `output: 'export'` and
`trailingSlash: true` for compatibility with Apache shared hosting.

## Step 3: Verify the Build

Check that `out/` contains:
```
out/
├── index.html                          (Homepage)
├── concrete-slab-calculator/
│   └── index.html
├── concrete-cost-calculator/
│   └── index.html
├── concrete-footing-calculator/
│   └── index.html
├── concrete-bags-calculator/
│   └── index.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── privacy-policy/
│   └── index.html
├── terms-of-service/
│   └── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── manifest.json
├── favicon.svg
├── .htaccess
└── _next/
    └── static/                         (JS, CSS bundles)
```

## Step 4: Upload to Hostinger

### Option A: File Manager (Recommended)

1. Log in to your Hostinger hPanel
2. Go to **Files → File Manager**
3. Navigate to `public_html/`
4. Delete any existing files (backup first if needed)
5. Upload the **entire contents** of the `out/` directory
   - Use the Upload button or drag-and-drop
   - Make sure `.htaccess` is uploaded (it may be hidden)
6. Verify all folders and files are in `public_html/`

### Option B: FTP

1. In hPanel, go to **Files → FTP Accounts**
2. Note your FTP credentials (or create a new account)
3. Connect with an FTP client (FileZilla recommended)
4. Navigate to `public_html/`
5. Upload the entire contents of `out/`
6. Ensure `.htaccess` is uploaded (enable "show hidden files" in FileZilla)

### Option C: SSH (if available on your plan)

```bash
# From your local machine
scp -r out/* username@your-server:/home/username/public_html/
scp out/.htaccess username@your-server:/home/username/public_html/
```

## Step 5: Configure SSL

1. In hPanel, go to **Security → SSL**
2. Install a free SSL certificate (Let's Encrypt)
3. Enable "Force HTTPS" in hPanel settings
4. The `.htaccess` also enforces HTTPS as a fallback

## Step 6: Verify Deployment

Test these URLs:
- https://materialcalc.com/ (Homepage + Concrete Calculator)
- https://materialcalc.com/concrete-slab-calculator/
- https://materialcalc.com/concrete-cost-calculator/
- https://materialcalc.com/concrete-footing-calculator/
- https://materialcalc.com/concrete-bags-calculator/
- https://materialcalc.com/about/
- https://materialcalc.com/contact/
- https://materialcalc.com/privacy-policy/
- https://materialcalc.com/terms-of-service/
- https://materialcalc.com/nonexistent-page (should show 404)
- https://materialcalc.com/robots.txt
- https://materialcalc.com/sitemap.xml

## Step 7: Submit to Search Engines

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add and verify materialcalc.com
3. Submit sitemap: `https://materialcalc.com/sitemap.xml`
4. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
5. Add site and submit the same sitemap

## Step 8: Google Analytics Setup

1. Create a Google Analytics 4 property at analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add the GA4 script to `src/app/layout.tsx` before the closing `</head>`:

```tsx
// In layout.tsx, add inside <head>:
<script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
    `,
  }}
/>
```

4. Rebuild and re-upload after adding the tracking code

---

## Updating the Site

Whenever you make changes:

```bash
npm run build
```

Then re-upload the contents of `out/` to `public_html/`.

---

## Performance Checklist

- [x] Static HTML export (no server required)
- [x] Inter font loaded via next/font (self-hosted, no render-blocking)
- [x] Tailwind CSS purged (only used classes shipped)
- [x] .htaccess enables gzip compression and caching
- [x] SVG favicon (tiny, no extra requests)
- [x] No external JS dependencies beyond React
- [x] All calculator logic runs client-side
- [x] Images: none required at launch (SVG icons only)

## Troubleshooting

**Pages show 404 on Hostinger:**
- Ensure `.htaccess` is uploaded to `public_html/`
- Check that `trailingSlash: true` is set in next.config.ts
- Verify folder structure matches the expected output above

**CSS/JS not loading:**
- Check that the `_next/` folder was uploaded completely
- Verify no file size limits on your hosting plan

**HTTPS not working:**
- Install SSL certificate in hPanel
- Wait up to 24 hours for propagation
- The `.htaccess` forces HTTPS once SSL is active

**Contact form not sending:**
- The form currently shows a success message client-side
- To make it functional, integrate Formspree (formspree.io)
  or Netlify Forms, or a serverless function endpoint
- Replace the `handleSubmit` function in `contact/page.tsx`
