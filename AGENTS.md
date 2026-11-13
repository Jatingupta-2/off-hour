# OFFHOUR project guidance

- Use this checkout as the project root. Requirements and progress live in `docs/`.
- Read `docs/status.md` before implementation. Update it in the same change as developed features; add newly discovered major features and sub-features. Check off only implemented and verified work and record validation/limitations in its progress log.
- Preserve the modular Next.js monolith: feature business logic in `src/features`, infrastructure in `src/lib`, thin API handlers. Protect server-only modules from client imports.
- Follow `docs/OFFHOUR-API-DESIGN.md` and `docs/OFFHOUR-DATABASE-DESIGN.md`; keep them aligned when contracts change.
- Latest homepage direction is a minimal desktop clothing rail, not the original multi-section homepage. A first desktop implementation is available locally for review; missing garment views and cutout refinement remain tracked.
- Never simulate authentication or successful payment behind real-looking controls. Label prototype fulfillment/refunds explicitly. Keep Razorpay in test mode.
- Keep secrets out of source/logs; use `.env.example` for empty configuration examples.
- Run relevant checks for changes. Foundation commands are `npm run check`, `npm run build`, and `npm run test:e2e` (requires installed Chromium and free port 3000).

## Incremental development and review checkpoints

- Develop in small, reviewable batches of two or three concrete steps at most. Never build the entire application or all remaining sections in one run.
- Before coding a batch, state its numbered steps, intended visible result, and what is outside that batch. Choose narrowly scoped steps (for example header/layout, static rail presentation, then hover behavior); do not call an entire application a single step.
- Complete only the current user-authorized batch. A request to continue authorizes the next stated batch, not every remaining feature. Documentation-only requests do not authorize starting application development.
- After the batch, run relevant checks, update `docs/status.md`, and report completed steps, validation, remaining limits, and the proposed next batch.
- Then stop and wait for the user's explicit go-ahead before starting the next batch. This checkpoint is explicitly requested by the user. Do not treat elapsed time, earlier general project approval, or background continuations as permission to continue.
- If fewer than two steps are requested, finish only that scope. If blocked, explain the blocker and stop dependent work rather than expanding into unrelated features.
- Keep unfinished sections as honest placeholders. Do not wire future integrations, develop extra screens, or add features simply because their folders already exist.
- Finish necessary fixes/checks for the current batch before the checkpoint. Keep this separate from asking approval for ordinary implementation details within the authorized batch.

## Branch and integration workflow

- `main` is the stable milestone branch. `dev` is the integration branch.
- Before new work, inspect local changes and fetch the remote. Never overwrite unrelated work or force-push shared branches.
- Start each feature from up-to-date `dev` on `feature/<short-kebab-case-name>`. Use `fix/` for fixes and `chore/` for tooling/documentation; for example `feature/clothing-rail` or `feature/google-login`.
- Keep each branch focused. Update `docs/status.md`, run relevant checks, and leave changes local for the user's review. Do not push any branch until the user explicitly approves pushing the reviewed changes. This supersedes the earlier automatic-push authorization.
- Hold merges while review is pending. After explicit approval, commit with a descriptive message, push the feature branch, merge completed verified work into `dev` with `--no-ff` when authorized, and push `dev` only within that approval's scope.
- For a feature spanning multiple review batches, keep its branch open and local until the relevant batch is reviewed. Report local/commit/push/merge state at each checkpoint. Do not mark the whole feature done prematurely.
- Promote `dev` into `main` at a coherent, verified milestone, then push `main`. Do not promote every small task automatically. An explicit user request to release/promote is authorization; otherwise state the milestone and its validation before promotion.
- Branch creation and local development are authorized. Earlier approval of a design, permission to continue coding, or approval of a previous batch does not authorize pushing new changes. Wait for explicit review approval before a push; tool permission checks still apply.
- Keep `dev` as the resting branch after integration. Preserve pushed feature branches unless cleanup is requested. This is a documented workflow, not a claim that GitHub branch protection or CI enforcement has been configured.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
