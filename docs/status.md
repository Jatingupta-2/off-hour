# OFFHOUR — Development Status

**Last updated:** 11 November 2026  
**Current phase:** Application scaffold implemented; storefront features and external integrations are not connected.

## How to maintain this tracker

- `[ ]` = planned or unfinished; `[x]` = implemented and verified, or an explicitly completed planning deliverable.
- Update this file in the same change as each developed feature. Check individual tasks before checking their parent feature.
- Add new major features and smaller sub-features under the relevant section before or alongside implementation.
- Record meaningful milestones in the progress log with validation and any remaining limits.
- Do not mark integrations complete because a placeholder, mocked response, or environment variable exists. Label simulations clearly.
- Keep deferred work separate from version 1. Unchecked design/tooling proposals are not finalized implementation decisions.
- Work in batches of at most two or three concrete steps. State the batch first, verify and report its results, then wait for the user's explicit go-ahead before the next batch. See `AGENTS.md` for the full checkpoint and branch rules.

## Scope and source documents

- [PRD](./OFFHOUR-PRD.md)
- [Database design](./OFFHOUR-DATABASE-DESIGN.md)
- [API design](./OFFHOUR-API-DESIGN.md)

OFFHOUR sells its own hoodies, oversized tees, linen shirts, and co-ord sets in India. Co-ords use one size for the complete set. The prototype uses Next.js/Node.js as a modular monolith, MongoDB Atlas, local product assets, Google and email/password authentication, and Razorpay test payments.

The latest homepage direction supersedes the earlier multi-section concept: a minimal desktop homepage with an interactive rail, compact header, tagline, and quiet footer. No homepage product grid or promotional sections. The shop listing remains a separate page. Homepage mobile adaptation is later work; responsive core shopping remains a version 1 goal. Five thousand concurrent visitors is a future capacity target, not prototype acceptance criteria.

## 1. Planning and documentation

- [x] Define brand name and tagline: OFFHOUR — Wear your own time.
- [x] Agree audience, categories, India market, and single-size co-ords.
- [x] Create PRD.
- [x] Create database design.
- [x] Create API design.
- [x] Organize project documents under `docs/`.
- [x] Create this feature tracker.
- [x] Draft minimal desktop homepage prompt for Stitch.
- [x] Draft matching desktop login prompt for Stitch.
- [ ] Review and approve actual Stitch homepage/login outputs.
- [ ] Create system architecture document if needed; discussion exists, standalone document does not.
- [ ] Reconcile original PRD homepage sections with the latest minimal rail direction.
- [ ] Keep API/database documentation aligned with implementation changes.

## 2. Application foundation

- [x] Initialize Git on `main` and configure `origin` as `https://github.com/Jatingupta-2/off-hour.git`.
- [x] Establish `dev` integration branch and document feature/fix/chore branch workflow in `AGENTS.md`.
- [x] Document incremental development batches and mandatory user checkpoints after two or three steps.
- [ ] Add automated CI and GitHub branch protection if requested; the branch workflow is currently procedural.
- [ ] Create the Next.js App Router and TypeScript scaffold.
  - [x] Initialize runnable app, lockfile, shared layout, and placeholder pages.
  - [x] Add lazy validated database configuration and `.env.example`; integration-specific validation remains pending.
  - [x] Confirm package manager, supported Node.js version, and pin dependencies.
  - [ ] Configure styling approach and accessible component primitives.
  - [x] Organize storefront, auth, account, checkout, and API routes.
  - [x] Create feature modules for catalog, cart, customers, inventory, checkout, payments, orders, and returns.
  - [x] Separate server-only code from client components.
  - [x] Configure linting, formatting, type checks, and useful project scripts.
  - [ ] Validate environment configuration; add `.env.example` without secrets.
  - [x] Add setup/run instructions and ignore rules for local credentials/artifacts.
  - [x] Configure appropriate test tools and test commands.
  - [x] Add shared error handling, request IDs, and safe logging.

## 3. Shared design and navigation

- [ ] Implement the shared visual foundation.
  - [x] Warm grey default theme, charcoal text, typography, and spacing tokens.
  - [x] White and dark theme tokens and consistent component styling.
  - [ ] Theme preference persistence; anonymous browser preference and account preference handling.
  - [ ] Buttons, inputs, selectors, dialogs/drawers, loading and error components.
  - [ ] Keyboard focus, accessible labels, contrast, and reduced-motion support.
- [ ] Implement shared navigation.
  - [x] OFFHOUR wordmark, Shop/About links, account and bag controls.
  - [ ] Bag count and active navigation behavior.
  - [ ] Quiet footer and policy/support navigation where appropriate.
  - [ ] Theme control in an unobtrusive location without cluttering the homepage.

## 4. Minimal desktop homepage and clothing rail

- [ ] Build the approved desktop homepage.
  - [ ] Near-single-viewport composition with generous empty space.
  - [ ] Compact header, tagline, subtle interaction guidance, and minimal footer.
  - [ ] No additional product grid, promotional cards, newsletter, or editorial sections.
- [ ] Create the interactive clothing rail.
  - [ ] Full-width brushed-metal rail with consistent hangers.
  - [ ] Five or six realistic neutral garments, hanging sideways at rest.
  - [ ] Source/create consistent garment front and angled assets; validate rendering approach.
  - [ ] Hover reveals the full front silhouette without cropping.
  - [ ] Neighbouring garments move aside; hovered garment settles naturally.
  - [ ] Show selected product name and price only.
  - [ ] Pointer leave restores sideways position.
  - [ ] Single click opens the correct product page.
  - [ ] Keyboard focus/activation equivalents and reduced-motion behavior.
  - [ ] Asset-loading fallback, stable layout, and performance review.

## 5. Database and sample catalog

- [ ] Connect to MongoDB Atlas with a reusable, bounded connection pool.
- [ ] Implement versioned collection/index/validator setup.
  - [ ] Confirm Better Auth ID contract and required indexes.
  - [ ] Customer profiles, addresses, and carts.
  - [ ] Products, variants, promotions, and inventory counters.
  - [ ] Orders and stock reservations.
  - [ ] Payment attempts, transactions, and webhook inbox.
  - [ ] Return requests, refunds, and durable jobs.
  - [ ] Uniqueness, partial indexes, operational TTL cleanup, and schema validation.
- [ ] Create non-destructive, repeatable sample seeds.
  - [ ] Eight sample products across four categories; illustrative pricing validated.
  - [ ] Sizes, colors, stock, unavailable variants, and sold-out examples.
  - [ ] Consistent product copy, size guides, care, and fit information.
  - [ ] Sample promotion and clearly labeled demonstration order fixtures.
- [ ] Implement relative image keys under `public/images/products/`.
  - [ ] Media URL resolver that supports a future S3/CDN base URL.
  - [ ] Optimized images, alternative text, and stable aspect ratios.
- [ ] Document data export and verify a restore path before destructive changes.

## 6. Product listing, search, and delivery estimates

- [ ] Build shop-all, category, and search-results pages.
  - [ ] Product cards with price, colors, image, and sold-out state.
  - [ ] Product-name search with safe input validation.
  - [ ] Category, size, color, price, and availability filters.
  - [ ] Same-variant matching across combined filters.
  - [ ] Featured/newest/price sorting with stable pagination.
  - [ ] Active filters, clear-all, and shareable URL state.
  - [ ] Loading, empty-results, error, and retry states.
  - [ ] Public catalog cache policy; stock remains advisory until checkout.
- [ ] Add postcode serviceability/estimate endpoint with explicit simulation labels.

## 7. Product detail pages

- [ ] Implement product detail and related products.
  - [ ] Gallery, zoom, consistent views, and fabric detail.
  - [ ] Name, INR price, description, fabric, fit, and care.
  - [ ] Size/color selection and unavailable-variant states.
  - [ ] Single size control for complete co-ord sets.
  - [ ] Size guide and model sizing where supplied.
  - [ ] Quantity limits and required-option validation.
  - [ ] Add-to-bag feedback and sold-out handling.
  - [ ] Postcode estimate, shipping information, and return terms.
  - [ ] Missing/archived-product handling.

## 8. Authentication

- [ ] Integrate Better Auth with MongoDB and secure cookie sessions.
  - [ ] Google OAuth configuration and verified identity handling.
  - [ ] Email/password registration and login.
  - [ ] Email verification and resend flow using permitted test recipients.
  - [ ] Forgot-password, reset, expired/invalid-link, and success states.
  - [ ] Password visibility, validation, credential errors, and loading states.
  - [ ] Session persistence, expiry, logout, and protected-route enforcement.
  - [ ] Safe account linking and allowlisted redirect destinations.
  - [ ] Checkout verification requirement; no silent verification bypass.
  - [ ] Return to checkout after login with bag preserved.
- [ ] Implement the approved minimal desktop login design.
- [ ] Configure development email transport/Resend testing without promising unrestricted delivery.

## 9. Customer profiles and saved addresses

- [ ] Build account overview and profile preferences.
  - [ ] Safe identity summary, phone, theme, and logout.
  - [ ] Lazy commerce-profile initialization.
- [ ] Build saved-address management.
  - [ ] Create, edit, delete, and select default address.
  - [ ] Indian phone/postcode validation and normalized storage.
  - [ ] Ten-address limit and empty/error states.
  - [ ] Ownership checks and atomic default-address updates.

## 10. Shopping bag and promotions

- [ ] Implement persistent cart behavior.
  - [ ] Anonymous local-storage cart and signed-in database cart.
  - [ ] Idempotent, serialized login merge with quantity/availability warnings.
  - [ ] Add, remove, and set quantities; enforce 20-line/five-unit limits.
  - [ ] Version/If-Match concurrency checks and conflict recovery.
  - [ ] Selected variant summary, current prices, and bag totals.
  - [ ] Unavailable items and changed-price messages.
  - [ ] Empty, loading, error, and retry states.
  - [ ] Login prompt before checkout.
- [ ] Implement sample promo-code validation/removal and deterministic discount allocation.
- [ ] Preserve later cart additions when purchased quantities are cleared.

## 11. Checkout, inventory, and payment integration

- [ ] Build login-required checkout UI.
  - [ ] Saved/inline address selection, validation, and order review.
  - [ ] Transparent discounts, shipping, and final INR totals.
  - [ ] Test-mode indication and Razorpay handoff.
- [ ] Implement authoritative quote flow.
  - [ ] Server-side price, promotion, address, and serviceability calculation.
  - [ ] Signed customer-bound quote digest and expiry.
  - [ ] Stale cart/changed quote recovery with explicit reconfirmation.
- [ ] Implement checkout order creation and stock reservation.
  - [ ] Customer-scoped idempotency keys and changed-input rejection.
  - [ ] Atomic all-or-nothing multi-variant holds; no overselling.
  - [ ] Ten-minute reservation, expiry cleanup, and safe release.
  - [ ] Short bounded-retry transactions without external provider calls inside them.
  - [ ] Cancellation/expiry/payment race protection.
- [ ] Integrate Razorpay test payments end to end.
  - [ ] Server-side provider order creation and persisted attempt linkage.
  - [ ] Safe attempt reuse, leases, and unknown-result reconciliation.
  - [ ] Client checkout launch and browser-result verification endpoint.
  - [ ] Verify signature, linkage, amount, currency, environment, and captured state.
  - [ ] Only verified captured payment confirms an order.
  - [ ] Duplicate payment protection and extra-payment review/refund case.
  - [ ] Payment success/failure/cancellation/pending/retry/expired/review screens.
  - [ ] Bounded client polling and recovery after browser closure.
  - [ ] Late-payment allocation or refund-review path without overselling.
- [ ] Implement Razorpay webhook inbox and settlement processing.
  - [ ] Bounded raw-body signature verification and event validation.
  - [ ] Durable receipt before acknowledgement; duplicate event handling.
  - [ ] Out-of-order events, domain idempotency, and recoverable leases.
  - [ ] Publicly reachable test webhook route with signature protection.

## 12. Orders and confirmation

- [ ] Build verified order confirmation with unique order reference.
- [ ] Build cursor-paginated order history and order detail.
  - [ ] Immutable product, price, discount, and address snapshots.
  - [ ] Separate order, payment, and fulfillment statuses.
  - [ ] Safe status history and permitted-action hints.
  - [ ] Demonstration tracking/timeline clearly marked as simulated.
  - [ ] Empty, loading, unavailable-order, and error states.
  - [ ] Ownership enforcement on every order read/mutation.
- [ ] Implement pre-dispatch cancellation.
  - [ ] Idempotent state transition and dispatch/payment race handling.
  - [ ] Release unpaid holds or restore paid stock exactly once.
  - [ ] Create refund resolution without falsely claiming provider completion.

## 13. Returns, exchanges, and refunds

- [ ] Implement seven-day return eligibility from delivery.
  - [ ] Per-line remaining quantities and active-request accounting.
  - [ ] Policy version/fee disclosure and acceptance.
  - [ ] Unworn/unwashed/tags declaration and reason/comments.
  - [ ] Wrong/damaged-item free-handling rule.
- [ ] Build return/exchange request creation, details, history, and withdrawal.
  - [ ] Retry-safe creation and changed-input rejection.
  - [ ] Prevent duplicate quantity claims; release claims once on withdrawal/rejection.
  - [ ] Exchange only size within same product/color; complete co-ord exchange.
  - [ ] Validate/reserve replacement stock at approval, not request submission.
  - [ ] Linked simulated replacement order without a second payment.
- [ ] Implement manual/developer-controlled demonstration processing.
  - [ ] Inspection/acceptance and explicit inventory restock.
  - [ ] Simulated refund records, partial refund allocation, and balance protection.
  - [ ] Clear simulation labels and safe refund-status reads.
  - [ ] Do not expose customer refund-execution or fulfillment-write endpoints.

## 14. Durable jobs and email

- [ ] Implement outbox job creation, atomic claims, leases, retries, and failure review.
- [ ] Add protected, bounded job-runner endpoint and explicit developer-run command.
- [ ] Select/configure free-compatible scheduling; document cadence and manual fallback.
- [ ] Process reservation expiry, provider reconciliation, confirmation email, and refund review.
- [ ] Build branded verification, reset, and order-confirmation email templates.
- [ ] Restrict delivery to supported development recipients until a sending domain exists.
- [ ] Keep paid orders valid when email fails; avoid untracked fire-and-forget work.
- [ ] Apply eligible operational cleanup without deleting unresolved or financial records.

## 15. Brand and support content

- [ ] About OFFHOUR.
- [ ] Contact and FAQs with confirmed details or clear placeholders.
- [ ] Size guide.
- [ ] Shipping page with simulated estimates distinguished from actual commitments.
- [ ] Seven-day returns/exchanges policy and fee disclosure.
- [ ] Privacy and terms prototype content; finalize before live use.
- [ ] Consistent loading, not-found, and unexpected-error pages.

## 16. API security and observability

- [ ] Shared request validation, response envelopes, error codes, and request IDs.
- [ ] Method/content-type/body-size checks and pagination validation.
- [ ] Customer resource ownership and safe public/private DTOs.
- [ ] Trusted-origin/CSRF defenses, secure cookies, and default-deny CORS.
- [ ] Shared/platform rate limits for auth, checkout, and other routes.
- [ ] Private no-store headers and public catalog cache separation.
- [ ] Redact credentials, payment signatures, tokens, and personal data from logs.
- [ ] Minimal liveness endpoint with no secret/dependency disclosures.
- [ ] Generate and validate commerce OpenAPI contract from implementation schemas.

## 17. Responsive design, accessibility, and performance

- [ ] Adapt homepage rail to touch/mobile after desktop approval.
  - [ ] Swipeable rail, centred front-facing garment, single-tap navigation.
  - [ ] Discoverable controls without hover dependency or page overflow.
- [ ] Responsive navigation, listing filters, PDP, bag, checkout, and account pages.
- [ ] Keyboard/screen-reader review of core shopping flow; target WCAG 2.2 AA.
- [ ] Reduced-motion, image-loading, contrast, and form-error checks in all themes.
- [ ] Optimize images, lazy loading, caching, and animation work.
- [ ] Verify core flows in Chrome, Safari, Edge, and Firefox where available.

## 18. Verification and prototype deployment

- [ ] Automated type/lint/build checks.
- [ ] Integration tests for checkout transactions, idempotency, and ownership.
- [ ] Payment/webhook duplicate, timeout, expiry, and recovery tests.
- [ ] End-to-end browse → variant → bag → login → checkout → verified test payment.
- [ ] End-to-end failed/cancelled payment retry and order-history checks.
- [ ] Cancellation, return/exchange quantity, and refund-bound tests.
- [ ] Vercel deployment configuration and `.vercel.app` address.
- [ ] Configure Atlas access, OAuth redirect URLs, test keys, email test mode, and webhooks.
- [ ] Keep prototype deployment out of search indexing.
- [ ] Small bounded performance/concurrency validation within service constraints.
- [ ] Final UI review and documented prototype limits; no claim of 5,000-user capacity.

## 19. Deferred features and live-launch prerequisites

These are tracked for visibility, not required to finish the zero-cost prototype.

- [ ] Custom admin dashboard, product/stock management, and order operations.
- [ ] Move product assets to S3/CDN through the media resolver.
- [ ] Private return-photo uploads with authorized temporary access.
- [ ] Sending domain and unrestricted verified email delivery.
- [ ] Live Razorpay onboarding, payment/refund configuration, and readiness review.
- [ ] Real shipping, tracking, pickup, and return logistics integrations.
- [ ] Final tax/invoice rules, shipping charges, legal content, and support process.
- [ ] Production backups, monitoring, capacity, budget, and hosting-plan eligibility review.
- [ ] Validate 5,000 concurrent visitor target; evaluate admission control for drops.
- [ ] Reviews, wishlists, loyalty, referrals, and advanced recommendations if prioritized.
- [ ] Revisit Instagram sign-in only if explicitly required.

Separate native Android/iPhone apps, a multi-brand marketplace, and international selling are outside the agreed scope, not committed backlog items.

## Progress log

| Date       | Completed work                                                                                                                        | Validation / limits                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-11 | Established tracker; moved PRD, database design, and API design into `docs/`                                                          | Documentation only. Existing relative document links preserved. Application code and integrations have not been implemented.                 |
| 2026-11-11 | Created Next.js scaffold, feature boundaries, placeholder routes, shared layout, server-only DB helper, API helpers, and test tooling | Lint and typecheck passed; 3 validation tests and 2 Playwright smoke tests passed; production build passed. Integrations remain unconnected. |
| 2026-11-11 | Documented development batches of two or three steps and explicit user checkpoints in AGENTS.md                                       | Documentation only; no application features changed.                                                                                         |

## Scaffold verification notes

- npm package manager, Node.js 24, Next.js App Router, TypeScript, Tailwind CSS, Zod, and MongoDB driver installed with exact dependency versions and a lockfile.
- Shared layout and placeholder routes work without credentials. Only the health endpoint is implemented; auth/commerce/webhook/job API folders are reserved, not functioning endpoints.
- Theme tokens exist; switching/persistence and accessible dialog primitives remain pending.
- MongoDB helper is server-only and lazy; no Atlas connection or migrations have been performed.
- The homepage is a temporary shell, not the clothing-rail implementation. No garment assets or fake working login/payment controls were added.
- Dependency audit reports moderate findings in development lint tooling; no forced incompatible overrides were applied. Revisit when compatible upstream fixes are available.

- Verification complete: lint, typecheck, production build, three unit tests, and two Chromium smoke tests passed. Production dependency audit found zero vulnerabilities; development lint-tooling findings remain documented.
- Added project instructions in AGENTS.md requiring tracker updates alongside developed features.
