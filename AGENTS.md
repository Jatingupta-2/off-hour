# OFFHOUR project guidance

- Use this checkout as the project root. Requirements and progress live in `docs/`.
- Read `docs/status.md` before implementation. Update it in the same change as developed features; add newly discovered major features and sub-features. Check off only implemented and verified work and record validation/limitations in its progress log.
- Preserve the modular Next.js monolith: feature business logic in `src/features`, infrastructure in `src/lib`, thin API handlers. Protect server-only modules from client imports.
- Follow `docs/OFFHOUR-API-DESIGN.md` and `docs/OFFHOUR-DATABASE-DESIGN.md`; keep them aligned when contracts change.
- Latest homepage direction is a minimal desktop clothing rail, not the original multi-section homepage. The current landing page is only a scaffold.
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
- Keep each branch focused. Update `docs/status.md`, run checks appropriate to the change, commit with a descriptive message, and push the branch to `origin`.
- Merge completed, verified work into `dev` with a merge commit (`--no-ff`) and push `dev`. Do not merge incomplete or failing features just to finish a turn.
- For a feature spanning multiple review batches, push the current batch to its feature branch and keep the branch open until the feature is complete. Report its branch and merge state at the checkpoint. Independently complete, verified increments may be merged into `dev`; do not mark the whole feature done prematurely.
- Promote `dev` into `main` at a coherent, verified milestone, then push `main`. Do not promote every small task automatically. An explicit user request to release/promote is authorization; otherwise state the milestone and its validation before promotion.
- The user has authorized branch creation, feature pushes, and merging completed features into `dev` as the normal development workflow; do not repeatedly ask for conversational confirmation. Tool permission checks still apply.
- Keep `dev` as the resting branch after integration. Preserve pushed feature branches unless cleanup is requested. This is a documented workflow, not a claim that GitHub branch protection or CI enforcement has been configured.
