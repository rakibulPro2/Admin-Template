# Nexus Admin - HTML + Tailwind CSS Dashboard Template

A 5-page, responsive admin dashboard template with light and dark mode.

## Folder structure
```
nexus-admin/
├── index.html        Dashboard (stats, charts, transactions, activity)
├── analytics.html    Retention heatmap, traffic sources, performance table, top countries
├── users.html        User management (search, filters, add / edit / delete)
├── products.html     Product catalog grid (category chips + search)
├── settings.html     Tabs: profile, password & security, system alerts
└── assets/js/app.js  Shared behaviour (sidebar, theme toggle, page features)
```

## Quick start
1. Unzip and open `index.html` in any browser. No build step needed.
2. An internet connection is required for the Tailwind CSS CDN and Google Fonts.

## Customisation
- **Brand name / logo:** search for `Nexus` in each page (sidebar + `<title>`).
- **Colours:** the accent is Tailwind `indigo` / `violet`. Replace those words to change it.
- **Default theme:** light. Visitors can switch with the sun/moon button; the choice is saved in the browser.
  To start in dark mode, remove the theme-detection script in each page `<head>` and add `class="dark"` to `<html>`.
- **User data:** edit the `users` array in `assets/js/app.js`, or load it from your API.
- **Charts:** inline SVG placeholders. Replace with Chart.js, ApexCharts, etc. if you need live data.
- **Adding a page:** copy any page, change the content inside `<main>`, and add a link in the sidebar of every page.

## Notes
- The forms and tables are front-end demos. Connect them to your backend to save data.
- Images and avatars are CSS placeholders, so no third-party image licences are included.
- Fonts: Inter (Google Fonts, SIL Open Font License).
