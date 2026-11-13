# Homepage — desktop review batch

## Scope

This local batch adapts the [Stitch homepage](https://stitch.google.com/projects/1272478663952991774) into the existing Next.js application. It includes the shared header/footer treatment, neutral studio layout, locally hosted Space Grotesk/Plus Jakarta Sans, and a thirteen-item interactive rail: the original tee, linen shirt, graphite hoodie, and co-ord, plus olive/espresso/clay tees, navy/burgundy/grey marl hoodies, and white/black/baby pink linen shirts. The stone Studio Hoodie has been removed from the rail. No login, catalog API, database, checkout, or product detail functionality was added.

The user approved committing and pushing the reviewed changes on `feature/homepage-rail` on 13 November 2026. Merging into `dev` or promoting to `main` requires separate authorization. `AGENTS.md` records the review-before-push workflow.

## Interaction

- The graphite hoodie is expanded and front-facing when the rail is idle or it is selected. Hovering or focusing another garment turns it to its side view and narrows its slot like the others. Leaving the rail or clearing focus restores its front view.
- Each surrounding garment shows its separate side image at rest. Hover or keyboard focus expands its slot, rotates the side layer out by 90 degrees, turns the matching front layer in, and adds gentle settling about the hanger. Pointer leave reverses the view transition.
- Leaving the rail and details area restores the central hoodie's details; keyboard focus takes precedence while a garment or its details link is focused. Moving into the details preserves the selected garment. All unselected garments use their resting side view.
- The selected name, price, and color appear below the rail. Prices are editorial prototype values, not stock/pricing API data.
- Each garment is a real link: single click or Enter goes to `/products/{slug}`. Those destinations intentionally remain scaffold pages.
- Reduced-motion preference removes the rail transition/settling effects and uses a static brand image instead of the animated SVG.
- Image failures display a textual fallback and retain the product link. Explicit image dimensions/layout slots avoid image-driven layout jumps.

## Asset limits

- All thirteen displayed garments now have distinct transparent front and side assets. Eight additional views were made with the built-in imagegen tool: side views for six colour variants, plus linen and co-ord fronts. These are AI-generated prototype views derived from existing assets, not verified inventory photography. The removed stone hoodie's assets remain available in the project.
- Every displayed garment view uses a transparent PNG derivative with its hanger hooks meeting the rail directly. Masks and additional drawn hooks are disabled so full garment edges remain visible. The co-ord retains both pieces and hangers, without its source photograph's black rod. Per-view positioning compensates for transparent padding around the tee front and co-ord hooks.
- Current transitions rotate and crossfade two photographic layers, not a continuous 3D garment model. Final asset fidelity remains subject to user review.
- Trousers are excluded because they are outside the agreed launch categories.
- No Stitch injected scripts, focus suppression, placeholder hash navigation, fabricated fabric specifications, archive timestamps, or design annotations were copied.

## Review and next batch

Review paired-view consistency, rotation speed, and hanger alignment. Mobile currently has only a basic horizontally scrollable fallback; final mobile behavior remains deferred.

## Fuller rail colour batch

Thirteen items share the desktop rail width. Flexible resting slots make space for the selected garment and the default graphite hoodie. All variants now use separate side photographs at rest, replacing the earlier compressed front projections. Mobile retains its basic scrollable fallback.

## Wooden rail and approved hangers

The rail is 12px thick and uses a warm walnut finish, subtle grain, rounded ends and a restrained shadow. It extends slightly farther across the stage. All garment views use the user-selected flat gunmetal hanger design with a broad curved hook. Per-view positioning aligns the hooks with the thicker rail. Existing side/front rotation, keyboard access and reduced-motion support are retained.

## Thin silver hook refinement — 13 November 2026

All front/side garment views use slim light brushed silver wire hooks and stems, retaining the dark triangular frames and warm walnut rail. The view switching, rotation and default graphite selection behavior are unchanged.

## Studio background and corner lights — 13 November 2026

The default warm grey background is slightly deeper. Two softly feathered spotlight beams originate from the upper left and upper right and fall across the clothes, fading before the lower tagline. These are static CSS gradient layers behind the rail with no pointer interaction or extra image downloads. Muted text and border tokens were adjusted for the deeper grey. Existing hover/focus rotation and reduced-motion behavior are retained.

## Deeper backdrop and broader warm beams — 13 November 2026

The default backdrop now uses deeper warm greige with darker muted text for readability. Both spotlight cones are wider (74 degrees rather than 48), amber/champagne toned, and more softly feathered. Their warm pools cover more of the clothing row, with a gentle fade at the upper edge and lower page. The existing static, pointer-transparent CSS layers are retained.

## Visible fixtures and full-height cables — 13 November 2026

A transparent spotlight photograph appears at each upper corner, mirrored to point inward toward the clothes. Beam origins line up with their warm lenses. The rail cables now extend upward past the section boundary to the top edge of the page; lighting remains clipped locally so it does not add horizontal overflow. No shopping interactions changed.

## Softer brass lights and chain suspension — 13 November 2026

The visible fixtures now match the supplied brass/copper spotlight reference, shown at reduced opacity with softer warm beams. Both rail supports are narrow repeating interlocking chain patterns extending to the page top. Their positions and the shopping interactions remain unchanged.
