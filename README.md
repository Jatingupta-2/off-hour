# OFFHOUR

Next.js + TypeScript modular-monolith scaffold for OFFHOUR. This is a local development foundation, not a functioning shop yet.

## Start locally

Use Node.js 24 (the scaffold was created with 24.14.1) and npm 11.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment credentials are needed for the placeholder pages or `/api/health`.

Copy `.env.example` to `.env.local` when connecting services. Set `MONGODB_URI` and `MONGODB_DB` before calling the database helper. Credentials must remain local or in deployment secrets. Environment validation is lazy so a missing integration does not prevent a scaffold build.

## Commands

| Command                | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Local development                                   |
| `npm run build`        | Production build                                    |
| `npm start`            | Serve the production build                          |
| `npm run check`        | Lint, typecheck, unit/integration tests             |
| `npm run format:check` | Formatting check                                    |
| `npm run format`       | Format source/configuration                         |
| `npm run test:e2e`     | Playwright smoke tests; starts its own local server |

For browser tests, install Chromium once with `npx playwright install chromium`. Stop any separate server on port 3000 before running the tests.

## Project structure

```text
docs/                         PRD, database/API designs, status tracker
public/images/products/       Imported Stitch garment images
public/images/shared/logos/   Logo references and shared SVGs
scripts/db/                   Reserved for migrations, indexes, and seeds
src/
  app/
    (storefront)/             Home, shop, products, bag, about
    (auth)/                   Login, registration, password recovery
    (account)/account/        Profile, addresses, orders
    checkout/                 Checkout placeholder
    api/
      health/                 Working process-liveness endpoint
      auth/[...all]/          Reserved for Better Auth
      v1/                     Reserved commerce endpoints
      webhooks/razorpay/       Reserved signed webhook integration
      internal/jobs/          Reserved authenticated job runner
  components/
    layout/                   Shared header/footer and placeholder layout
    ui/                       Shared controls
  features/
    catalog/ cart/ checkout/ inventory/
    orders/ payments/ customers/ returns/
  lib/
    auth/                     Reserved for auth setup
    db/                       Lazy server-only MongoDB client
    env/                      Server environment validation
    errors/ http/ validation/ Shared API/validation building blocks
tests/
  unit/                       Input-boundary tests
  integration/                Reserved for database/service integration tests
  e2e/                        Browser navigation/liveness smoke tests
```

Each feature has `components/`, `schemas/`, and `server/` folders. Add `import "server-only"` to database access and business services that must never reach browser bundles. Route handlers validate/authenticate and invoke feature services. Server-rendered pages can invoke the same services directly. Avoid empty abstraction classes and duplicated HTTP calls to our own server.

Route groups organize code without changing URLs. Placeholder account/checkout pages are public explanatory screens; they contain no customer data. Protect them on the server before adding private data or actions. Reserved API folders intentionally contain no handlers: there are no fake successful payment/auth responses.

## Current boundaries

- Shared header/footer, grey layout, white/dark CSS tokens, placeholder routes, error/loading/not-found pages.
- Theme switching/persistence and accessible dialog primitives are not implemented.
- MongoDB client is prepared but has not been connected or tested against Atlas.
- Better Auth, Razorpay, email, stock, jobs, and actual catalog are not connected.
- Homepage is a temporary text/layout placeholder, not the approved clothing-rail design. Imported assets and their limitations are listed in [docs/assets.md](./docs/assets.md).
- Prototype indexing is disabled through metadata and response headers.
- No deployment has been created.

Track development in [docs/status.md](./docs/status.md). Update it alongside completed and verified work. Source requirements: [PRD](./docs/OFFHOUR-PRD.md), [database design](./docs/OFFHOUR-DATABASE-DESIGN.md), [API design](./docs/OFFHOUR-API-DESIGN.md).
