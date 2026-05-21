<div align="center">

# Henrique Nunes — Portfolio V2

**[henriquenunes.com](https://henriquenunes.com)**

Personal portfolio, freelance showcase, and blog — built with Angular 19.

[![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev)
[![ngx-translate](https://img.shields.io/badge/ngx--translate-17-green)](https://github.com/ngx-translate/core)

</div>

---

## About

HenriqueNunesDev V2 is the second version of my personal site. It serves as a living CV, a showcase for personal and freelance projects, and a reader for my [Medium](https://medium.com/@nunesdealmeidahenrique) articles — all in a single Angular application with **dark mode** and **PT / EN** internationalisation.

---

## Features

| Page         | Highlights                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Home**     | Hero section, work history (EDS · Nava · Black101 · Atlas), project timeline, downloadable CV (PT & EN)                 |
| **Projects** | Personal products — PLVNO, Conecta Currículo, Ultimate Champion Creator — with galleries, tech stacks, and status       |
| **Studio**   | Freelance client work (BM Cleaning Queens, W.A Fitas, Pokefrenzy, IG Clean) with category filter chips and detail pages |
| **Articles** | Medium RSS feed parsed at runtime, skeleton loading, article reader with reading-progress bar                           |
| **About**    | Multi-paragraph bio, interactive tech drag-and-drop canvas, photo carousel                                              |
| **Contact**  | Cal.com meeting scheduler, LinkedIn, and email                                                                          |
| **Setup**    | Workstation, development tools, and productivity setup with staggered scroll-reveal                                     |

---

## Tech Stack

| Layer      | Technology                                                                           |
| ---------- | ------------------------------------------------------------------------------------ |
| Framework  | [Angular 19](https://angular.dev) — standalone components, new control flow, signals |
| Language   | TypeScript 5.7 — `strict` mode, `strictTemplates`                                    |
| Styling    | Tailwind CSS 3.4 + SCSS — `darkMode: 'class'` strategy                               |
| Reactivity | Angular Signals (`signal`, `computed`, `effect`) + RxJS 7.8                          |
| i18n       | [@ngx-translate](https://github.com/ngx-translate/core) v17 with JSON language files |
| Icons      | [Font Awesome](https://fontawesome.com) Kit                                          |
| Fonts      | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts                    |
| Build      | `@angular-devkit/build-angular:application` (esbuild)                                |
| Testing    | Karma + Jasmine                                                                      |
| Deployment | Apache with SPA rewrite via `.htaccess`                                              |

---

## Project Structure

```
src/app/
├── components/
│   ├── carousel/         # Photo carousel (About page)
│   ├── drop-area/        # Drag-and-drop tech stack canvas
│   ├── footer/
│   ├── header/           # Nav glider, theme toggle, language toggle
│   ├── menu/             # Mobile hamburger menu
│   └── timeline/         # Shared project timeline
│
├── core/
│   ├── directives/
│   │   └── reveal.directive.ts   # Scroll-reveal (IntersectionObserver)
│   ├── pipe/
│   │   ├── safe-html.pipe.ts
│   │   └── short-date.pipe.ts
│   └── services/
│       ├── articles.service.ts   # Medium RSS via rss2json
│       ├── projects.service.ts   # In-memory project data
│       ├── studio.service.ts     # In-memory freelance data
│       ├── seo.service.ts        # Dynamic meta / OG / Twitter tags
│       ├── schema.service.ts     # JSON-LD injection
│       └── theme.service.ts      # Dark/light toggle
│
├── pages/
│   ├── home/
│   ├── about/
│   ├── articles/         # List + view/:path
│   ├── contact/
│   ├── projects/         # List + view/:path
│   ├── setup/
│   └── studio/           # Grid + :slug detail
│
├── app.component.ts
├── app.config.ts         # Providers: router, HTTP, translate
└── app.routes.ts
```

---

## Getting Started

**Prerequisites:** Node.js LTS (≥ 20) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/hnunezz/HenriqueNunesDev-V2.git
cd HenriqueNunesDev-V2

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
# → http://localhost:4200
```

### Other commands

```bash
# Production build
npm run build
# Output: dist/henrique-nunes-dev-v2/

# Run unit tests
npm test

# Build in watch mode (development)
npm run watch
```

---

## Internationalisation (i18n)

Translation files live in `public/assets/i18n/`:

```
public/assets/i18n/
├── pt.json   # Portuguese (default)
└── en.json   # English
```

Add new keys to both files and inject `TranslateService` (or use the `| translate` pipe) in your template.

---

## Deployment

The app is deployed at **[henriquenunes.com](https://henriquenunes.com)** on an Apache server.

`public/.htaccess` is included and configures SPA rewriting so all routes resolve to `index.html`.

```bash
npm run build
# Upload contents of dist/henrique-nunes-dev-v2/ to your web server root
```

---

## Author

**Henrique Nunes** — Software Engineer

[![Website](https://img.shields.io/badge/henriquenunes.com-000?logo=google-chrome&logoColor=white)](https://henriquenunes.com)
[![GitHub](https://img.shields.io/badge/hnunezz-181717?logo=github&logoColor=white)](https://github.com/hnunezz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henriquenunesdealmeida)
[![Medium](https://img.shields.io/badge/Medium-000?logo=medium&logoColor=white)](https://medium.com/@nunesdealmeidahenrique)

---

<div align="center">
  <sub>Built with Angular 19 · Designed and developed by Henrique Nunes</sub>
</div>

///
