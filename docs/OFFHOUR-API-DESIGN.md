# OFFHOUR — API Design

**Version:** 1.0  
**Date:** 10 November 2026  
**Status:** Design baseline; endpoints are not implemented  
**Related documents:** [PRD](./OFFHOUR-PRD.md), [Database design](./OFFHOUR-DATABASE-DESIGN.md)

## 1. Scope and architecture

The Next.js/Node.js modular monolith exposes same-origin JSON APIs through Route Handlers. Commerce endpoints use `/api/v1`. Better Auth owns `/api/auth/*`. Provider webhooks and operational endpoints have separate namespaces and authentication rules.

Server-rendered pages may call shared application services directly rather than making HTTP requests to their own server. HTTP handlers and direct callers must enforce equivalent authorization, validation, and business rules. MongoDB Atlas is persistent storage; Razorpay operates only in test mode.

The prototype supports discovery, customer accounts, carts, checkout, order history, and return/exchange requests. There are no public admin, inventory-write, refund-execution, file-upload, or simulated-payment-success APIs. Demonstration fulfillment changes use explicitly invoked developer tooling outside the public API.

## 2. Contract conventions

- HTTPS in deployed environments; same-origin browser requests use secure cookie sessions.
- JSON request bodies use `Content-Type: application/json`, except provider webhooks, which are validated as original bytes before parsing.
- IDs are opaque strings. Commerce ObjectIds must be valid 24-character hex strings. Auth user IDs follow the adapter's canonical string representation.
- Dates are ISO 8601 UTC strings. All money is integer paise with `currency: "INR"`.
- Request fields not defined by a schema are rejected. Optional omitted fields mean no change in PATCH; `null` is allowed only where explicitly documented.
- Application success responses use `{ "data": ..., "meta": { "requestId": "..." } }`. Lists add pagination to `meta`.
- All errors include a safe request ID; never expose stack traces, secrets, provider payloads, or database errors.
- Private responses use `Cache-Control: private, no-store`. Public catalog caching is explicitly separate.
- Unsupported methods return `405`; oversized bodies `413`; unsupported media types `415`.
- Customer mutation body limit: 32 KiB. Webhook limit: 256 KiB, adjustable after verifying real provider payload sizes. These are application limits, subject to tighter hosting limits.
- No request may supply effective `userId`, stock counters, computed totals, paid status, or fulfillment status.

### Error shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Check the highlighted fields.",
    "fields": [{ "path": "shippingAddress.postalCode", "code": "INVALID_FORMAT" }],
    "retryable": false
  },
  "meta": { "requestId": "req_example" }
}
```

| HTTP | Meaning / common codes |
|---|---|
| 400 | Malformed JSON, invalid cursor, `VALIDATION_ERROR` |
| 401 | `AUTH_REQUIRED`, expired session |
| 403 | `EMAIL_VERIFICATION_REQUIRED`, invalid origin, action forbidden |
| 404 | `NOT_FOUND`; also used for another customer's resource |
| 409 | `CART_VERSION_CONFLICT`, `IDEMPOTENCY_CONFLICT`, `OUT_OF_STOCK`, `CHECKOUT_EXPIRED`, `ORDER_STATE_CONFLICT`, `RETURN_NOT_ELIGIBLE`, `QUOTE_CHANGED` |
| 422 | Valid input that cannot be applied: `PROMOTION_INVALID`, `ADDRESS_NOT_SERVICEABLE` |
| 429 | `RATE_LIMITED`; include `Retry-After` in seconds |
| 503 | `DEPENDENCY_UNAVAILABLE`, bounded transaction retries exhausted; include `Retry-After` when known |
| 500 | Unexpected internal failure; safe generic message |

Temporary provider uncertainty after an order is durably created is normally `202`, not an instruction to create a new order.

### Pagination

List requests accept `limit` (default 20, maximum 50) and opaque `cursor`. Responses include `meta.page: { nextCursor: string|null, hasMore: boolean }`. Cursors are validated, bound to filters/sort, and use a stable ID tie-breaker. No total count is required.

## 3. Authentication and security boundary

Better Auth mounts at `/api/auth/[...all]`. Use its client/server SDK for registration, email/password login, Google sign-in, session lookup, logout, email verification, and password reset. Its routes, bodies, cookies, errors, and redirect responses remain library-owned and do not use the commerce envelope. Pin the library version and generate its exact endpoint reference during implementation; do not duplicate password or OAuth handling in commerce handlers.

| User operation | Application behavior |
|---|---|
| Register | Name, email, password through auth SDK; verification through configured email callback |
| Google sign-in | Auth SDK initiates provider redirect and validates callback/state |
| Email/password sign-in | Auth SDK creates session after credential and verification checks |
| Session | Library session API; commerce reads trusted server session |
| Verify/reset | Library token validation, expiry, and consumption |
| Logout | Auth SDK revokes current session and clears cookie |

Email/password users must verify their email before checkout. Google users must have provider-verified identity according to auth configuration. No production-style bypass is enabled to compensate for email delivery restrictions. Development recipients/inboxes support prototype testing; unrestricted delivery waits for a sending domain.

Browser mutations require a trusted Origin and JSON content type. Configure library CSRF/origin protections; commerce checks origin independently. Cross-origin requests are denied by default. Cookies are HttpOnly, Secure in deployment, and configured with appropriate SameSite behavior. OAuth redirect destinations are allowlisted; arbitrary external return URLs are rejected. Provider webhooks use signature authentication instead of browser-origin rules.

Every private resource query includes authenticated ownership. Public IDs, order numbers, and Razorpay IDs never grant access. Browser storage contains no password, session token, reset token, or payment secret.

## 4. Endpoint inventory

Paths below are relative to `/api/v1`, unless fully qualified.

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/storefront` | Public | Home collections, categories, theme/media configuration |
| GET | `/products` | Public | Listing, search, filters, sorting |
| GET | `/products/{slug}` | Public | Product details and variants |
| GET | `/delivery-estimates?postalCode=...` | Public | Clearly simulated serviceability/estimate |
| GET | `/me` | Customer | Safe profile and auth identity summary |
| PATCH | `/me` | Customer | Phone/theme preferences |
| GET | `/me/addresses` | Customer | Saved addresses |
| POST | `/me/addresses` | Customer | Create address |
| PATCH | `/me/addresses/{addressId}` | Customer | Edit saved address |
| DELETE | `/me/addresses/{addressId}` | Customer | Remove saved address |
| PUT | `/me/default-address` | Customer | Set/clear default address |
| GET | `/cart` | Customer | Cart with current price estimates |
| PUT | `/cart/items/{variantId}` | Customer | Set absolute line quantity |
| DELETE | `/cart/items/{variantId}` | Customer | Remove line |
| PUT | `/cart/promotion` | Customer | Apply sample promotion |
| DELETE | `/cart/promotion` | Customer | Remove promotion |
| POST | `/cart/merge` | Customer | Merge anonymous cart once |
| POST | `/checkout/quote` | Verified customer | Calculate authoritative review quote; no stock hold |
| POST | `/checkout/orders` | Verified customer | Create order, reserve stock, prepare payment |
| GET | `/orders` | Customer | Cursor-paginated history |
| GET | `/orders/{orderId}` | Customer | Detail, payment progress, eligibility |
| POST | `/orders/{orderId}/payment-attempts` | Verified customer | Resume/retry payment safely |
| POST | `/orders/{orderId}/payment-verifications` | Customer | Verify Razorpay browser result |
| POST | `/orders/{orderId}/cancellation` | Customer | Cancel before shipment |
| GET | `/orders/{orderId}/return-requests` | Customer | Requests for an order |
| POST | `/orders/{orderId}/return-requests` | Customer | Create return/exchange request |
| GET | `/return-requests/{requestId}` | Customer | Request details |
| POST | `/return-requests/{requestId}/cancellation` | Customer | Withdraw unprocessed request |
| GET | `/orders/{orderId}/refunds` | Customer | Safe refund status, including simulation labels |
| POST | `/api/webhooks/razorpay` | Provider signature | Durable event receipt |
| POST | `/api/internal/jobs/run` | Service secret | Bounded job processing |
| GET | `/api/health` | Public | Minimal process liveness |

## 5. Public catalog contracts

### GET `/storefront`

Returns category codes/labels, featured collections with links, selected product-card DTOs, theme choices/default, currency, and flags such as `paymentsMode: "test"`, `returnPhotoUploadsEnabled: false`. Editorial content may be static configuration. Never expose deployment secrets or provider API credentials other than the designated public checkout key in authorized payment responses.

### GET `/products`

Query parameters:

| Parameter | Validation |
|---|---|
| `q` | Trimmed product-name text, maximum 100 characters; escape regex metacharacters |
| `category` | One of `hoodies`, `oversized-tees`, `linen-shirts`, `co-ord-sets` |
| `size`, `color` | Repeatable controlled values; OR within a field, AND across fields |
| `minPricePaise`, `maxPricePaise` | Nonnegative safe integers; minimum <= maximum |
| `inStock` | Boolean `true` or `false`; omit for both |
| `tag` | Controlled collection tag |
| `sort` | `featured` (default), `newest`, `price_asc`, `price_desc` |
| `limit`, `cursor` | Pagination conventions |

Only active products/variants appear. All variant predicates must match the same variant. Price sorting uses minimum matching-variant price, then ID. `inStock=false` selects products with no available matching variant. Responses include product cards and full-query filter facets (before pagination). Cursors are best-effort across live catalog changes, not a frozen snapshot.

Product card fields: `id`, `slug`, `name`, `category`, `image: { url, alt }`, `priceFromPaise`, `currency`, `colors: [{ code, name, hex }]`, `availability: in_stock|sold_out`.

### GET `/products/{slug}`

Returns card fields plus description, fabric, fit, care, ordered gallery, size guide/model sizing, related cards, and variants: `{ id, sku, size, colorCode, pricePaise, compareAtPricePaise?, currency, available }`. `sizingMode` is `single`; a co-ord has one size for the entire set. Never return internal stock/reservation counters. Unknown or archived slugs return 404.

### Delivery estimates

Accept exactly six postcode digits. Return `{ postalCode, serviceable, minDays, maxDays, isSimulated: true }`, with day fields nullable when unserviceable. These estimates are not carrier promises. Final shipping fees are calculated by checkout pricing rules.

Public catalog responses may use a short shared cache (initial design: 60 seconds, up to 60 seconds stale-while-revalidate). Availability is advisory; checkout always rechecks. Do not set customer cookies on cached public responses. Delivery estimates may be cached independently.

## 6. Profile and address contracts

`GET /me` returns `{ user: { id, name, email, emailVerified, image }, profile: { phone, theme }, capabilities: { canCheckout, emailDeliveryMode } }`. Missing commerce profiles are lazily initialized; auth credentials are never returned.

`PATCH /me` accepts `{ phone?, theme? }`. Phone may be `null` to clear it; theme must be grey/white/dark. Identity name/email/password updates remain auth-owned and are outside this endpoint.

Address input: `{ recipientName, phone, line1, line2?, city, state, postalCode, country: "IN" }`. Normalize phone to E.164; validate Indian numbers and six-digit postcode without treating format as delivery eligibility. Text limits: recipient 100, address lines 200 each, city/state 100. Trim strings and reject blank required fields.

- GET addresses returns `{ addresses, defaultAddressId }`.
- POST accepts the full address plus optional `makeDefault`; returns 201 and Location. Maximum 10 addresses.
- PATCH accepts address fields only; final merged address must be valid. It cannot alter the address ID.
- DELETE returns 200 with the resulting address list/default pointer; repeated deletion returns 404. Removing the default clears its pointer atomically.
- PUT default-address accepts `{ addressId: string|null }`; referenced address must belong to the customer.

Address operations are atomic profile updates. They never update existing order snapshots. The small prototype uses last-write-wins for concurrent edits to the same address; the UI serializes local edits. Creation without an idempotency key must not be automatically retried after an unknown network outcome: refetch the address list first.

## 7. Cart contracts

GET returns `{ version, items, promotion, totals, warnings }`. Each line includes `variantId`, product summary, selected size/color, quantity, current unit/line prices, and availability. Warnings identify changed prices, missing/archived variants, invalid promotions, or reduced availability. Unavailable lines remain visible for removal. Totals are estimates; shipping may be null until quoted.

All cart writes require `If-Match: "cart-N"`, where N is the version returned by GET; GET/write responses include the matching ETag. Missing precondition returns 428 `CART_VERSION_REQUIRED`; stale version returns 409 `CART_VERSION_CONFLICT` with `currentVersion`. The client reloads and asks the user to resolve conflicting intent rather than blindly overwriting.

| Operation | Body / result |
|---|---|
| PUT line | `{ "quantity": 2 }`; integer 1–5, absolute quantity; returns updated cart |
| DELETE line | No body; removes line; returns updated cart |
| PUT promotion | `{ "code": "SAMPLE" }`; normalized, 1–40 chars; returns updated cart or 422 |
| DELETE promotion | No body; clears promotion; returns updated cart |
| POST merge | `{ "mergeToken": "uuid", "items": [{ "variantId": "...", "quantity": 1 }] }` |

Maximum 20 distinct lines. Cart writes do not reserve stock. Merge adds matching quantities, caps at five with explicit warnings, rejects invalid input, and skips unavailable items with warnings. Replaying the most recently applied merge token returns the current cart before checking its old If-Match and adds nothing. This matches the database's single `lastMergeToken`: it is not an unlimited historical deduplication ledger. The browser must keep one merge pending at a time and never replay an older merge after a newer merge has completed.

Cart writes are conditional and safe from lost updates; after an ambiguous response, GET before retrying with a fresh version. Anonymous users use local storage and do not call private cart APIs.

## 8. Checkout quote and order creation

### POST `/checkout/quote`

```json
{
  "cartVersion": 7,
  "addressId": "507f1f77bcf86cd799439011"
}
```

Alternatively supply `shippingAddress` in the address-input shape. Exactly one of `addressId` and `shippingAddress` is required; inline addresses are not saved automatically. Contact email comes from the verified account; phone comes from the selected address. Promotion is read from the cart.

Returns 200 with `{ cartVersion, items, shippingAddress, totals, quoteToken, quoteExpiresAt, pricingPolicyVersion, paymentsMode: "test" }`. Quote tokens are signed, customer-bound, short-lived (five minutes), and cover normalized items, quantities, prices, promotion, resolved address, shipping policy, and totals. They contain no publicly readable personal data: use a digest in the signed token, not an address payload. Quotes do not reserve stock.

If a saved address is used, the order request re-resolves it; edits invalidate the quote digest. Quote verification does not bypass server recalculation.

### POST `/checkout/orders`

Required header: `Idempotency-Key: <UUID>`. Body is the quote input plus `quoteToken`. The same customer/key/body must reuse the existing order even if the quote has since expired or the cart changed; check an existing idempotency record before new-request quote validation. Changed input under the same key returns 409.

For a new request, validate session/verification, quote signature/expiry, cart version, current product/price/address data, serviceability, and promotion. If pricing changed return 409 `QUOTE_CHANGED`; the client requests and displays a new quote before resubmitting with a new key. Unavailable stock returns 409 `OUT_OF_STOCK` with affected variant IDs. No partial reservation succeeds.

In one transaction, create the pending order, ten-minute reservation, payment-attempt record, and recovery job. Call Razorpay after commit. New ready orders return 201 with Location `/api/v1/orders/{id}`; unresolved provider creation returns 202 with the same Location and a suggested polling interval. Replays return 200 if ready or 202 if still resolving, with `meta.idempotencyReplayed: true`.

```json
{
  "data": {
    "orderId": "507f1f77bcf86cd799439012",
    "orderNumber": "OFF-DEMO-0001",
    "status": "pending_payment",
    "expiresAt": "2026-11-10T10:10:00.000Z",
    "payment": {
      "state": "ready",
      "attemptId": "507f1f77bcf86cd799439013",
      "provider": "razorpay",
      "mode": "test",
      "keyId": "rzp_test_example",
      "providerOrderId": "order_example",
      "amountPaise": 249900,
      "currency": "INR"
    }
  },
  "meta": { "requestId": "req_example", "idempotencyReplayed": false }
}
```

Pending payment DTO: `{ state: "preparing"|"reconciling", retryAfterSeconds: 5 }`, without fabricated provider IDs. Client keys are public Razorpay key IDs only, never API secrets. No new payment order is created merely because the first HTTP call timed out.

## 9. Payment retry, verification, and polling

### POST `/orders/{orderId}/payment-attempts`

Empty JSON body, required Idempotency-Key. Validate ownership and verified session. Reuse a ready provider order, return 202 for unknown creation outcome, or create a replacement only after the prior attempt is resolved/closed. An expired hold returns 409 `CHECKOUT_EXPIRED`; obtain a new quote/order with a new checkout key. Paid orders return their current confirmed state without creating another attempt. Cancelled/review orders cannot open checkout.

Attempt-command idempotency keys and request hashes are recorded in `outboxJobs` with a unique namespaced dedupeKey. Retain the record for the order's prototype lifetime and include its outcome/attempt reference in the minimal payload; do not purge it as a routine job. The operation's durable attempt lease also prevents parallel creation under different keys. This uses existing collections, with command metadata finalized in implementation.

### POST `/orders/{orderId}/payment-verifications`

```json
{
  "attemptId": "507f1f77bcf86cd799439013",
  "razorpay_order_id": "order_example",
  "razorpay_payment_id": "pay_example",
  "razorpay_signature": "signature_from_checkout"
}
```

Use the server-stored provider order ID for signature verification; compare supplied IDs against the owned attempt. Fetch authoritative provider payment state as needed and check amount, currency, order linkage, test environment, and captured status. A verified signature alone does not establish captured funds. Do not persist/log the submitted signature.

- 200: processed terminal outcome; return safe order/payment state.
- 202: authorized/pending or provider lookup temporarily unavailable; reconciliation continues.
- 400 `PAYMENT_VERIFICATION_FAILED`: invalid signature/linkage; no paid transition.
- 404: unknown or unowned order/attempt.

Deduplication uses the provider payment ID, so no separate Idempotency-Key is needed. The browser and webhook paths invoke the same settlement service. They may race safely. A second captured payment is recorded for review/refund without a second fulfillment. Late captured payments enter the database's review/reallocation process.

Client failure/dismissal events do not authoritatively mark the order failed, release stock, or cancel it. Customers can retry within the hold or explicitly cancel. Confirmation screens appear only after the server reports confirmed payment, never directly from the browser callback.

GET order is the recovery/polling endpoint. Start at five-second intervals with backoff up to 30 seconds; stop on confirmed, cancelled, expired, or payment_review, and show the appropriate result. Closing the page does not stop server recovery. Do not continuously poll after a terminal result.

## 10. Orders, cancellation, and refunds

GET `/orders` accepts limit/cursor and optional `status` from the order lifecycle enum. Returns summaries: ID, number, createdAt, total/currency, order/payment/fulfillment statuses, and thumbnail. Another customer's records never appear.

GET `/orders/{id}` returns immutable item/address/totals snapshots, safe lifecycle history, tracking with `isSimulated`, payment progress, and capabilities:

```json
{
  "canCancel": true,
  "canPay": false,
  "returnEligibility": {
    "eligible": false,
    "eligibleUntil": null,
    "reason": "NOT_DELIVERED",
    "lines": []
  }
}
```

Capabilities are UI hints, revalidated on mutation. No webhook payloads, signatures, session fields, lease state, internal error traces, or full provider transactions are returned.

POST cancellation accepts `{ reasonCode, comments? }` (comments <= 1000 chars) and requires Idempotency-Key. Cancellation is immediate when eligible; processing races dispatch through a conditional transition. Unpaid cancellation releases stock; paid cancellation restores stock once and opens refund resolution. Return 200 with updated order and optional refund summary. Already-cancelled retries return current state. Shipped/delivered or other incompatible states return 409. This endpoint does not execute a provider refund.

Cancellation command key/hash/outcome are stored in the order's cancellation object. A replay of the same key with changed input returns 409. Business-state checks ensure different-key retries do not restore stock or open refunds twice.

GET refunds returns `{ id, amountPaise, currency, status, executionMode, isSimulated, createdAt, completedAt }` records. Simulated success must remain clearly distinct from a Razorpay-confirmed refund. There is no customer endpoint to choose a refund amount or trigger arbitrary provider refund calls.

## 11. Return and exchange contracts

POST `/orders/{id}/return-requests` requires Idempotency-Key.

```json
{
  "kind": "exchange",
  "items": [
    {
      "orderLineId": "507f1f77bcf86cd799439014",
      "quantity": 1,
      "requestedVariantId": "507f1f77bcf86cd799439015"
    }
  ],
  "reasonCode": "SIZE_ISSUE",
  "comments": "Please exchange for L.",
  "conditionDeclaration": { "unworn": true, "unwashed": true, "tagsAttached": true },
  "acceptedPolicyVersion": "returns-v1",
  "acceptedPickupFeePaise": 0
}
```

`kind` is return/exchange; requestedVariantId is required only for exchange and must be a different size of the same product/color. Co-ords exchange as a complete set. Reasons: `SIZE_ISSUE`, `PREFERENCE`, `DAMAGED`, `WRONG_ITEM`, `OTHER`. Comments max 1000 characters. Duplicate line IDs are rejected. Quantity is an integer within remaining eligible quantity. All condition fields must be true under the prototype policy.

Order details expose current policy version/fee for consent. Posted fee/version acknowledge the displayed policy; they never override server policy. Changed policy/fee returns 409 `RETURN_POLICY_CHANGED`. Wrong/damaged items have zero return handling fee. Photo fields/uploads are not accepted in version 1.

Validate seven-day delivery window, ownership, fulfilled quantities, prior active requests, and available refund balance in the domain service. Exchange stock at request time is advisory; approval/reservation occurs through developer tooling. Successful creation returns 201 with Location and a request DTO. requestKey stores the header key; store a canonical request hash alongside it to detect changed-body replays. Retries return 200 with the existing request.

GET request DTO: ID, order ID, kind, item summaries/quantities/requested size, reason/comments, status, policy/fee snapshot, history, optional replacement order ID, `isSimulated: true`. No approval or inventory write capability is granted to customers.

POST request cancellation accepts `{}`. It is state-idempotent: withdraw only `requested` requests and release claimed quantities once. Already-cancelled returns 200; approved/received/completed/rejected states return 409. GET per-order requests returns a bounded list within the order's item/request limits.

## 12. Razorpay webhook contract

`POST /api/webhooks/razorpay` uses the provider's native body and headers, including `X-Razorpay-Signature` and `x-razorpay-event-id`. It does not require customer cookies or Origin. Configure separate test webhook secret and test provider credentials.

1. Read bounded raw bytes and verify signature with constant-time comparison before processing JSON.
2. Validate event identity/type and insert a minimized durable inbox record under the unique provider/mode/event key.
3. Return 200 after durable receipt, including already-received events. If persistence fails, return 503 so delivery can retry.
4. Process through bounded inline execution or the durable job runner. Returning 200 must not rely on an untracked fire-and-forget task.
5. Deduplicate domain writes independently of event deduplication; resolve ambiguous/out-of-order states through provider lookup.

Invalid signature returns 400; oversized body 413. Valid but unsupported events are recorded as ignored/processed and acknowledged with 200. Supported events include captured/failed payments and paid orders; refund events are handled only when provider-test refund execution is enabled. Subscribe to exact provider event names during setup. Missing required event identity/schema returns 400 and an operational alert/log rather than inventing an event key.

Response is a minimal native acknowledgement `{ "received": true }`; no customer data. Webhooks must not be blocked by a deployment login page. Protect this route using provider signatures rather than opening unrelated preview routes.

## 13. Jobs and health

POST `/api/internal/jobs/run` requires `Authorization: Bearer <service-secret>` checked server-side. It is not authenticated by customer/admin browser sessions. Body: `{ "limit": 20 }`, maximum 50; server-enforced execution budget leaves time before host timeout. Returns counts for claimed/completed/retried/failed and `hasMore`; no job payloads or secrets. No query parameter may provide a destination URL or arbitrary function name.

Jobs claim durable leases and safely resume after crashes. Service invocations must be scheduled externally or run explicitly by a developer. If a chosen scheduler only supports GET, add a narrowly scoped authenticated adapter to invoke the same runner; do not use an unprotected state-changing GET endpoint. Scheduling cadence remains an implementation dependency.

GET `/api/health` returns 200 `{ "status": "ok" }` if the process responds. It makes no database query and is not readiness/capacity evidence. It exposes no environment variables, connection strings, or dependency diagnostics.

## 14. Idempotency, retry, and concurrency rules

| Operation | Durable guard |
|---|---|
| Checkout creation | Unique customer/checkoutKey + canonical request hash on order |
| Payment-attempt preparation | Namespaced durable command job + attempt lease/state |
| Payment verification | Unique provider payment ID + conditional accepted-payment transition |
| Webhooks | Unique provider/mode/event ID + domain state guards |
| Cancellation | Order cancellation command metadata + conditional state transition |
| Return creation | Unique customer/requestKey + request hash |
| Return withdrawal | Conditional request status and transactional quantity release |
| Cart mutations | Version precondition; merge additionally uses last merge token |

Keys are client-generated UUIDs, scoped to customer and operation. Request hashes use validated canonical input, not raw JSON byte order. Side effects commit before reporting success. For key-based operations, an identical retry returns the current resource, which may have progressed since the first response; a byte-for-byte response replay is not promised.

After network uncertainty, retry with the same key, never a new one. Use exponential backoff with jitter and respect Retry-After. Do not automatically retry validation, authorization, or business conflicts. GETs have no commerce side effects. Never retry payment creation blindly after an external timeout.

## 15. Rate limits, logs, and client behavior

Initial configurable application limits (design defaults, not measured capacity): public catalog 120 requests/minute/IP, delivery estimate 30/minute/IP, private reads 120/minute/user, cart writes 60/minute/user, quote 20/minute/user, checkout/payment-attempt creation 5/minute/user, payment verification 20/minute/user, cancellation/returns 10/minute/user. Auth has separate library-configured sign-in/reset limits with both account and IP controls.

Use a shared atomic limiter or verified platform controls; process memory alone is insufficient across Vercel instances. Webhook limits must accommodate legitimate retries and bursts and must not share customer limits. Return 429 with Retry-After. Do not run a 5,000-user load test against free services or Razorpay without separately planning scope and provider constraints.

Log request ID, route template, latency, HTTP status, safe error code, and relevant internal order reference. Redact cookies, Authorization, password fields, reset/verification tokens, payment signatures, personal addresses, and raw provider payloads. Return request ID via `X-Request-Id` as well as the envelope.

Frontend rules: preserve the bag through login; show field-level validation; display changed totals before purchase; label test payments and simulated logistics/refunds; stop payment resubmission while reconciliation is pending; show recoverable errors without implying an uncertain payment failed.

## 16. Contract verification and implementation deliverables

Before declaring the APIs ready:

- Validate success/error schemas, method handling, limits, pagination, and cache headers.
- Verify auth expiry, origin rejection, and resource ownership on every private route.
- Exercise stale cart versions, login merge replay, changed quote, expired hold, and changed idempotency input.
- Exercise final-unit contention and multi-line reservation rollback.
- Exercise provider creation timeout, duplicate verification, duplicate/out-of-order webhooks, browser closure, and late captured payment.
- Exercise cancellation racing dispatch/payment and return quantities/refund bounds.
- Confirm job lease recovery and that email failure cannot undo payment.
- Confirm no route lets a customer set stock, payment success, fulfillment, or refund execution.
- Generate an OpenAPI 3.1 contract for commerce routes and machine-validated DTOs from the selected implementation schema source; include examples and error codes. Auth/provider protocols remain separately referenced.

## 17. Alignment notes and references

Implementation will add small command metadata fields to the approved logical database model: return request hashes, cancellation key/hash/outcome, and payment-preparation command metadata in durable jobs. These do not require a separate service or additional database. Record those additive fields in the database schema when implementation starts.

This API design specifies application behavior; it does not provision hosting, select a scheduler, enable unrestricted email, or claim free-tier capacity. Shipping prices and policy fees remain configured prototype rules, exposed for explicit checkout/return consent.

- [Better Auth Next.js integration and handler mounting](https://better-auth.com/docs/integrations/next)
- [Better Auth database schema](https://better-auth.com/docs/concepts/database)
- [Razorpay Standard Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [Razorpay webhook verification, duplicates, and event ordering](https://razorpay.com/docs/webhooks/validate-test/)

Exact auth SDK methods, provider event subscriptions, and capture configuration must be confirmed against pinned versions and the test account during implementation.
