# rustune-landing

Landing page for [rustune](https://github.com/dzulfikar08/rustune), a lightweight terminal audio player with real Winamp skins. Live at <https://rustune.dzulfikar.com>.

## Stack

- `client/`: Vite + React + Tailwind (the site itself; page content is in `client/src/routes/index.tsx`)
- `server/`, `shared/`: Hono scaffolding from the bhvr template, not used by the static site

## Build and deploy

The **Build site** GitHub Actions workflow builds `client/dist` on every push, uploads it as the `site` artifact, and saves full-page screenshots as the `screenshots` artifact.

Deploy a build to Cloudflare Pages (project `rustune`):

```sh
gh run download <run-id> -n site -D dist
bunx wrangler pages deploy dist --project-name rustune --branch main
```

Local development: `bun install && bun run dev:client`.

## Writing style

No em dashes in site copy.
