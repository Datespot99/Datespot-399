# Datespot

Landing page + UPI payment flow for the Datespot Telegram community.
React 18 · Vite 6 · Tailwind CSS 4 · Motion.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
```

## Edit content

Everything you are likely to change lives in [`src/config.ts`](src/config.ts): price, UPI ID,
Telegram invite link, lead-sheet endpoint, reviews and FAQ.

Theme tokens (colours, background layers) live in [`src/styles/index.css`](src/styles/index.css).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. One-time setup: **Settings → Pages → Source → GitHub Actions**.
The build uses a relative base path, so it also works on a custom domain or any static host.
