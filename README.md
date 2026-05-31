## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy to Cloudflare Workers

This project uses [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) to run Next.js on Cloudflare Workers.

### Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/)
2. [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (installed as dev dependency)
3. Log in locally: `npx wrangler login`

### Environment variables

Copy `.env.example` to `.env.local` for local development.

For Cloudflare deploy, set these at **build time** (they are baked into the client bundle when prefixed with `NEXT_PUBLIC_`):

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL |
| `API_TIMEOUT` | API request timeout (ms) |
| `NEXT_STORAGE_HOST` | Image storage host |
| `NEXT_STORAGE_PORT` | Image storage port |
| `NEXT_PUBLIC_DOMAIN_URL` | Public site URL |

### Deploy from your machine

```bash
# Set env vars (or use .env.production)
export NEXT_PUBLIC_API_BASE_URL=https://api.example.com
export API_TIMEOUT=30000
export NEXT_STORAGE_HOST=cdn.example.com
export NEXT_STORAGE_PORT=443
export NEXT_PUBLIC_DOMAIN_URL=https://example.com

npm run deploy
```

Preview locally in the Workers runtime:

```bash
npm run preview
```

### Deploy via GitHub Actions

Add these repository secrets:

- `CLOUDFLARE_API_TOKEN` — [API token](https://dash.cloudflare.com/profile/api-tokens) with **Workers Scripts: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — Account ID from Cloudflare dashboard
- `NEXT_PUBLIC_API_BASE_URL`, `API_TIMEOUT`, `NEXT_STORAGE_HOST`, `NEXT_STORAGE_PORT`, `NEXT_PUBLIC_DOMAIN_URL`

Push to `main` or run the **Deploy to Cloudflare Workers** workflow manually.

Worker name is configured in `wrangler.jsonc` (`oriented-spa`).
