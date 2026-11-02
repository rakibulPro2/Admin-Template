# Nexus Admin - HTML + Tailwind CSS Admin Dashboard Template

A responsive, 11-page admin dashboard with light and dark mode. 100% offline: no CDN, no build step required to use it.

## Folder structure
```
nexus-admin/
├── index.html          Dashboard hub (stats, charts, transactions, activity)
├── analytics.html      Retention heatmap, traffic sources, performance table, top countries
├── users.html          User management (search, filters, add / edit / delete)
├── products.html       Product catalog (category chips + search)
├── chat.html           Messaging app (conversation list, bubbles, attachments)
├── file-manager.html   Storage overview, drag & drop upload, folders, files table/grid
├── billing.html        Plan overview, saved cards, invoice history with PDF download
├── calendar.html       Month / week / day calendar, upcoming events, add & edit events
├── settings.html       Tabs: profile, password & security, system alerts
├── login.html          Split-screen sign-in page
├── register.html       Split-screen sign-up page with live password checklist
├── assets/
│   ├── css/style.css   Compiled + minified stylesheet (Tailwind CSS 3.4 + design-system extras)
│   ├── js/app.js       All interactivity (vanilla JavaScript, no libraries)
│   ├── js/theme-init.js Applies the saved light/dark theme before the page paints
│   └── img/favicon.svg
├── src/input.css       Stylesheet source (Tailwind directives + custom classes)
├── tailwind.config.js  Tailwind configuration (dark mode = class, animations)
└── package.json        Build scripts
```

## Quick start
Unzip and open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). Nothing to install and no internet connection needed.
For production, upload the whole folder to any static web host.

## Features
- Light mode by default, with a sun/moon toggle (choice is remembered)
- Header: notification dropdown (unread dots, mark all as read), profile menu, logout confirmation modal
- Fully responsive sidebar (slides in on mobile)
- Design-system extras in the stylesheet: `.animate-gradient`, `.neon-border`, `.glass`, `.glass-dark`, `.text-gradient`
- Respects `prefers-reduced-motion`
- No third-party JavaScript. System font stack, so no web fonts are downloaded.

## Customising
- **Brand name / logo:** search for `Nexus` in each page (sidebar, `<title>`, auth pages).
- **Colours:** the accent is Tailwind `indigo` / `violet`. Change those words, then rebuild the CSS (below).
- **Demo data:** edit the arrays in `assets/js/app.js` (`users`, `chats`, `files`, `folders`, `INVOICES`, `cards`, `SEED` events).
- **Adding a page:** copy any page, replace the content inside `<main>`, and add its link to the sidebar of every page.
- **Default theme:** to start in dark mode, set `localStorage` default in `assets/js/theme-init.js` (change `=== 'dark'` to `!== 'light'`).

## Rebuilding the stylesheet (only needed after you change classes)
Requires Node.js 16+.
```
npm install
npm run build      # writes assets/css/style.css (minified)
npm run watch      # rebuilds while you edit
```
Tailwind scans `./*.html` and `./assets/js/app.js` (see `tailwind.config.js`). If you add new HTML files, they are picked up automatically.

## Important notes
- All data is demo data in the browser. Forms, uploads, payments and the chat do not talk to a server. Connect them to your own backend.
- Card form: never process or store raw card numbers yourself. Use a payment provider such as Stripe Elements.
- Passwords: the sign-in and sign-up pages are front-end demos only.
- Images: the template uses only CSS and inline SVG artwork, so there are no third-party image licences to worry about.

## Credits and licences
- Tailwind CSS v3.4 (MIT licence), https://tailwindcss.com. The compiled `style.css` contains Tailwind's base styles.
- Icons are original inline SVG paths in the style of open Lucide/Feather icons (MIT / ISC).
- Google and GitHub logos on the sign-in and sign-up pages are trademarks of their owners and are used only as sign-in button icons.
