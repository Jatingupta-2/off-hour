# Feature boundaries

Each feature owns its UI components, validation schemas, and server business services/repositories. Import server-only protection in server files. Empty folders mark intended boundaries, not implemented features.

- `catalog`: public products, categories, variants, media resolution.
- `cart`: cart persistence, concurrency, merge, promotion estimates.
- `customers`: commerce profile and saved addresses.
- `inventory`: conditional stock allocation and reservation lifecycle.
- `checkout`: pricing/quotes and order orchestration.
- `payments`: Razorpay attempts, verification, webhook inbox, reconciliation.
- `orders`: snapshots, history, cancellation.
- `returns`: eligibility, exchange requests, refund resolution.

Keep shared infrastructure in `src/lib`. HTTP routes adapt contracts; they do not own business transactions. Authentication itself belongs in `src/lib/auth` when configured.
