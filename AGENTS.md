# OFFHOUR project guidance

- Use this checkout as the project root. Requirements and progress live in `docs/`.
- Read `docs/status.md` before implementation. Update it in the same change as developed features; add newly discovered major features and sub-features. Check off only implemented and verified work and record validation/limitations in its progress log.
- Preserve the modular Next.js monolith: feature business logic in `src/features`, infrastructure in `src/lib`, thin API handlers. Protect server-only modules from client imports.
- Follow `docs/OFFHOUR-API-DESIGN.md` and `docs/OFFHOUR-DATABASE-DESIGN.md`; keep them aligned when contracts change.
- Latest homepage direction is a minimal desktop clothing rail, not the original multi-section homepage. The current landing page is only a scaffold.
- Never simulate authentication or successful payment behind real-looking controls. Label prototype fulfillment/refunds explicitly. Keep Razorpay in test mode.
- Keep secrets out of source/logs; use `.env.example` for empty configuration examples.
- Run relevant checks for changes. Foundation commands are `npm run check`, `npm run build`, and `npm run test:e2e` (requires installed Chromium and free port 3000).
