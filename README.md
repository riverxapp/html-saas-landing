# Orbit SaaS Landing Page

A one-page product landing page for **Orbit**, a concept workspace for product teams. Built with plain HTML, CSS, and JavaScript, with no runtime packages or build step.

## Page and interactions

- Hero with workspace personalization and a three-step guided product tour.
- Interactive project preview with Board, List, and Timeline layouts, a filter for Jamie’s tasks, and a form for adding tasks to any status column.
- Feature sections covering planning, collaboration, automations, views, and focus.
- Integration map and catalog describing proposed Slack, Notion, Figma, GitHub, Google Drive, and Linear connections.
- Free, Pro, and Business pricing cards with a monthly/yearly toggle. Pro is $12 monthly or $9.60 per member/month with annual billing; Business is $24 or $19.20. These are illustrative prices.
- Expandable FAQ, closing call to action, and mobile navigation menu.

The product preview is rendered directly in HTML and JavaScript; it is not a screenshot or embedded video. “Watch demo” opens the guided tour.

## Concept boundaries and data

This is a frontend demonstration. Signup, login, and plan buttons open the same workspace-personalization dialog; they do not authenticate users, create online accounts, or process payments. Integration entries describe proposed workflows and do not connect external accounts. Feature illustrations do not implement messaging, notifications, or automation services.

Only the workspace name persists, using the `orbit-workspace` key in this origin’s browser `localStorage`. Storage failures are tolerated. Newly added tasks, selected views, filters, and billing selections live in memory and reset on reload. To reset the workspace name, remove that key using browser developer tools. No application form data is submitted to a backend.

Google Fonts supplies Space Grotesk and Geist through external stylesheet/font requests. Local sans-serif fallbacks apply when those requests are unavailable.

## Local preview

Run from the repository root with Node.js. The Docker image uses Node 22; the package declares pnpm 10.26.2. No dependency installation is needed for this static page.

```bash
rtk pnpm dev
```

Open `http://localhost:5173`. `rtk pnpm preview` starts the same server.

If the default port is occupied, start the server directly on another port:

```bash
rtk node scripts/static-server.js --host 127.0.0.1 --port 5199
```

The defaults are host `0.0.0.0` and port `5173`. Each setting resolves in this order: `--host`/`--port` flags, command-line `HOST=value`/`PORT=value` arguments, environment variables, then defaults. The server does not load `.env` files itself. Stop it with Ctrl+C.

## Docker

```bash
rtk docker build -t orbit-landing .
rtk docker run --rm -p 5173:5173 orbit-landing
```

Open `http://localhost:5173`. To change only the host-side port, use `-p 5199:5173`. The container launches the same static preview server.

## Source and customization

| File | Responsibility |
| --- | --- |
| `index.html` | Page sections, copy, metadata, SVG symbols, forms, and native dialogs. |
| `tokens.css` | Shared colors, fonts, radii, timing, and headline sizing. |
| `styles.css` | Layout, responsive breakpoints, component states, and animations; imports `tokens.css`. |
| `app.js` | Sample tasks, view rendering, forms, local storage, tour, pricing toggle, navigation, and reveal behavior. |
| `scripts/static-server.js` | Node HTTP server for local and Docker previews. |
| `.hallmark/` | Design preflight and design-history metadata; not loaded by the page. |

Edit page copy and plan descriptions in `index.html`. Update sample tasks, integration descriptions, tour steps, and pricing-toggle amounts in `app.js`. Pricing changes must stay consistent between the initial HTML and the JavaScript toggle. Adjust the visual palette and typography in `tokens.css`; web-font loading is configured in the HTML head.

No bundler or compilation is required. For static hosting, publish `index.html`, `styles.css`, `tokens.css`, and `app.js` together, preserving their relative paths. The Node server serves its current working directory and is intended for preview; publish only the page assets through a production static host. No hosted deployment has been verified.

## Motion, keyboard support, and responsive behavior

The page includes button/card transitions, a drawn headline underline, floating accents, task/dialog entry animations, and scroll-triggered reveals. CSS disables animations and transitions under `prefers-reduced-motion: reduce`; JavaScript skips reveal setup when that preference is enabled at load. Explicit JavaScript scroll actions currently request smooth scrolling.

Implemented keyboard affordances include visible focus outlines, a skip link, arrow/Home/End navigation for project-view tabs, native form validation, native dialogs with Escape dismissal, and native FAQ disclosures. Responsive styles adapt navigation, the product preview, grids, and footer for narrow screens; the dashboard sidebar is hidden on phones.

These implementations have not yet received browser-based accessibility or responsive verification.

## Verification

Completed during implementation:

- JavaScript syntax check with `rtk node --check app.js`.
- Static checks for unique HTML IDs, resolvable section/SVG references, local asset existence, defined CSS tokens, and balanced CSS braces.
- HTTP 200 checks for `/`, `/styles.css`, `/tokens.css`, and `/app.js` on the local preview server.

Visual and interaction testing was unavailable because no preview browser was connected. There is no automated test suite or build script configured.

Before publishing, check the following in a browser:

1. Inspect desktop and 320, 375, 414, and 768 px widths for overflow, clipped content, and readable controls.
2. Open/close mobile navigation, follow section links, and expand FAQ items.
3. Complete the three-step tour; try Board, List, and Timeline views and the task filter.
4. Add a task to each status and confirm that tasks reset on reload.
5. Personalize the workspace, reload to verify persistence, and check behavior with storage blocked.
6. Toggle monthly/yearly pricing and verify all plan buttons open the preview dialog with the selected plan label.
7. Navigate with the keyboard; check dialog focus and Escape dismissal, form errors, reduced-motion behavior, and integration-catalog disclosure.

## AI Agent Permission Policy

The AI agent has full permission to inspect, modify, create, rename, or delete any file in this repository as it sees fit.

There are no repository-level restrictions on:

- HTML changes
- CSS changes
- JavaScript changes
- Folder structure changes
- Build or runtime changes
- Content replacement
- Deleting files judged unnecessary

The agent should optimize for the requested outcome, not preserve prior structure.
