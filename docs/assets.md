# OFFHOUR — Asset inventory

Imported from the [shared Stitch project](https://stitch.google.com/projects/1272478663952991774) on 11 November 2026. This batch saves source assets only; no page implementation changed.

## Folder structure

```text
public/images/
  products/                 Garment photographs
    references/             Extra garments outside launch scope
  shared/
    logos/                  Logo references and shared SVGs
```

Browser paths omit `public`: `/images/products/hoodie-graphite-premium-front.jpg`, for example. Keep future common icons/illustrations under `shared/`; customer uploads do not belong in these publicly served folders.

## Product images

| File                                    | View                                | Dimensions |
| --------------------------------------- | ----------------------------------- | ---------- |
| `linen-shirt-bone-side.jpg`             | Side profile                        | 448 × 600  |
| `oversized-tee-chalk-front.jpg`         | Front                               | 448 × 600  |
| `oversized-tee-chalk-side.jpg`          | Side profile                        | 448 × 600  |
| `hoodie-graphite-side.jpg`              | Side profile                        | 448 × 600  |
| `hoodie-graphite-premium-front.jpg`     | Featured front                      | 512 × 512  |
| `hoodie-graphite-front-alternate.jpg`   | Alternative front                   | 448 × 600  |
| `hoodie-stone-front.jpg`                | Front                               | 448 × 600  |
| `coord-slate-side.jpg`                  | Side profile                        | 448 × 600  |
| `references/trousers-charcoal-side.jpg` | Side profile; design reference only | 448 × 600  |

Trousers are retained as a Stitch reference, not added to the agreed product categories. These are generated design assets, not verified photographs/specifications of manufactured inventory.

## Remaining garment cutouts — 11 November 2026

Created with the built-in imagegen tool in edit mode. All four derivatives are 1083 × 1452 PNGs with genuine alpha transparency. Source JPEGs remain unchanged. This section records the initial cutout batch; dedicated linen/co-ord front views were subsequently added below.

| Project asset under `public/images/products/` | Edit target |
| --- | --- |
| `oversized-tee-chalk-front-cutout.png` | `oversized-tee-chalk-front.jpg` |
| `oversized-tee-chalk-side-cutout.png` | `oversized-tee-chalk-side.jpg` |
| `linen-shirt-bone-side-cutout.png` | `linen-shirt-bone-side.jpg` |
| `coord-slate-side-cutout.png` | `coord-slate-side.jpg` |

Final prompt for the tee front and co-ord:

> Use case: background-extraction. Edit target: supplied OFFHOUR garment photograph. Remove the entire studio background, background shadows and the horizontal black clothing rod (if visible). Keep only the exact garments and their wooden hangers and metal hooks, with genuine transparent alpha around and between all objects. Preserve garment identity, colour, fabric, folds, stitching, proportions, camera angle and original view. Do not invent a new garment or front view. Keep the complete garment and all hanger hooks without clipping, minimal transparent padding, hooks at the very top, garment group centred horizontally. Where a hook is occluded by the black rod, restore only that tiny hook segment so it can hang directly on a web rail. Co-ord: keep BOTH pieces and BOTH hangers together, hooks level. No backdrop, floor, rod, text, logo or extra objects.

Final prompt for the tee side and linen side (refined to retain one hanger each):

> Use case: background-extraction. Edit the supplied single garment photograph. Keep exactly ONE garment hanging from exactly ONE wooden hanger with exactly ONE metal hook. Preserve the original side view, fabric, colour, folds, stitching, proportions and garment identity. Remove the entire beige studio background, shadow and horizontal black rod. Restore only the tiny section of the ONE metal hook originally hidden by the black rod. Transparent alpha everywhere outside this single garment and hanger. NO doubled hanger, NO doubled hook, NO extra garments, no extra objects, no backdrop. Keep entire garment and one hook uncropped, centred. The top of the hook must meet the top edge of the output canvas with no extra top padding, for hanging directly from a website rail.

## Shared brand assets

All files below are under `public/images/shared/logos/`.

| File                                   | Purpose                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| `offhour-wordmark-reference.png`       | Original observed 50 × 50 raster reference; unsuitable as a sharp production wordmark |
| `offhour-watch-hands-reference.png`    | 800 × 800 dial/H logo reference                                                       |
| `offhour-dual-orbit-reference.png`     | 200 × 200 alternative brand reference                                                 |
| `offhour-clock-mark.svg`               | Simple clock mark from the login header                                               |
| `google-sign-in.svg`                   | Shared Google icon from the login design                                              |
| `offhour-dial-animated.svg`            | Animated dial/H emblem from the homepage                                              |
| `offhour-dial-standalone-animated.svg` | Standalone animated dial/H design                                                     |

SVG geometry and internal animation styles were extracted from rendered Stitch designs, not redrawn. Root SVG namespace, `viewBox` casing, inherited color, and external utility classes were normalized for standalone use. No page scripts, tracking, or Stitch cursor overlays were imported. The files contain no scripts or external resource dependencies.

## Verification and remaining limits

- Saved 12 raster images and four SVGs; all decode successfully. SVG files also pass XML parsing.
- Visually reviewed an asset contact sheet to confirm garment/name mapping and logo separation.
- [asset-manifest.json](./asset-manifest.json) records observed source URLs, dimensions, byte sizes, and SHA-256 hashes for all 16 files.
- Original Stitch files remain preserved; every displayed rail item now has transparent front and side derivatives.
- All ten displayed rail items have paired prototype views. User review of consistency and a sharp wordmark remain pending; AI-generated views are not verified product photography.
- Animated references are not final UI components. Final logo selection, sizing, reduced-motion behavior, and theme contrast must be checked during implementation.
- There is no SVG wordmark among the observed assets; the raster wordmark has not been mislabeled as vector artwork.

## Transparent hoodie derivatives — 11 November 2026

Created using the built-in imagegen tool in edit mode, with genuine PNG alpha transparency. Original JPEGs remain unchanged. These are AI-edited prototype assets.

| Project asset under `public/images/products/` | Edit target | Dimensions |
| --- | --- | --- |
| `hoodie-graphite-front-cutout.png` | `hoodie-graphite-premium-front.jpg` | 1254 × 1254 |
| `hoodie-graphite-side-cutout.png` | `hoodie-graphite-side.jpg` | 1083 × 1452 |
| `hoodie-stone-front-cutout.png` | `hoodie-stone-front.jpg` | 1083 × 1452 |

All three files decode and have alpha values ranging from 0 to 255. Resting and expanded desktop views were visually checked; the full hoodie silhouettes remain visible, and their own metal hooks meet the homepage rail.

The same final prompt was applied separately to each corresponding source image:

> Use case: background-extraction. Edit target: the supplied OFFHOUR hoodie photograph. Remove only the entire studio background and any cast background shadow, leaving a clean genuinely transparent alpha background. Preserve the exact hoodie, colour, shape, folds, stitching, proportions, lighting, camera view and wooden hanger with its metal hook. Do not invent a different garment, extra fabric, logos, lettering or scenery. Keep the entire garment and hanger hook visible without clipping. Centre the hanger hook horizontally and place its top at the top of the output canvas with only minimal transparent padding. This is a web clothing-rail product cutout; all pixels outside the garment and hanger must be transparent, including spaces around and inside the hanger. No floor or backdrop.

## Colour variants — 11 November 2026

Six transparent front-view variants were edited with the built-in imagegen tool. Full prompts, input paths, dimensions, and hashes are recorded in asset-manifest.json. These are prototype colour concepts, not live inventory. This initial batch used narrow front-image projections; those have now been replaced with separate side-view assets.

- `public/images/products/oversized-tee-olive-front-cutout.png` — muted dusty olive green
- `public/images/products/oversized-tee-espresso-front-cutout.png` — rich espresso brown
- `public/images/products/oversized-tee-clay-front-cutout.png` — muted terracotta clay
- `public/images/products/hoodie-navy-front-cutout.png` — deep ink navy blue
- `public/images/products/hoodie-burgundy-front-cutout.png` — muted dark burgundy wine
- `public/images/products/hoodie-grey-marl-front-cutout.png` — light heather grey marl

## Paired garment views and rotation — 11 November 2026

Eight transparent views were created with the built-in imagegen tool in edit mode. Exact prompts and identity/pose inputs are recorded per file in asset-manifest.json. Original assets remain preserved. The generated linen/co-ord fronts and six colour side views complete two distinct views for every displayed rail item. These are prototype interpretations and still require visual approval.

- public/images/products/oversized-tee-olive-side-cutout.png
- public/images/products/oversized-tee-espresso-side-cutout.png
- public/images/products/oversized-tee-clay-side-cutout.png
- public/images/products/hoodie-navy-side-cutout.png
- public/images/products/hoodie-burgundy-side-cutout.png
- public/images/products/hoodie-grey-marl-side-cutout.png
- public/images/products/linen-shirt-bone-front-cutout.png
- public/images/products/coord-slate-front-cutout.png

The homepage shows side views by default, turns to front views on hover/focus, and reverses on pointer leave. The graphite centrepiece defaults to its front view and turns sideways while another item is selected. The transition rotates two layers rather than simulating a continuous 3D mesh. Reduced-motion mode switches instantly.

## Linen shirt colours — 11 November 2026

White, black, and baby pink linen shirts each have front and side PNG cutouts, created using the built-in imagegen tool in edit mode from the matching bone view. Original assets are preserved. These are prototype colour concepts. Exact prompts, source paths, hashes and alpha metadata are in asset-manifest.json.

- public/images/products/linen-shirt-white-front-cutout.png
- public/images/products/linen-shirt-white-side-cutout.png
- public/images/products/linen-shirt-black-front-cutout.png
- public/images/products/linen-shirt-black-side-cutout.png
- public/images/products/linen-shirt-baby-pink-front-cutout.png
- public/images/products/linen-shirt-baby-pink-side-cutout.png

## Approved flat metal hangers and walnut rail — 11 November 2026

All 26 displayed front/side assets now use the selected dark gunmetal flat-frame hanger with a broad curved hook. The graphite front reuses the user-approved sample; the remaining views were edited separately with the built-in imagegen tool using that sample as the design reference. Existing cutouts remain unchanged; the new sibling files end in -cutout-modern.png under public/images/products/. Exact prompts, sources, dimensions and hashes are recorded in asset-manifest.json. Transparent top padding is compensated per view so the hooks align with the rail. These remain AI-edited prototype assets.

## Thin silver hooks — 13 November 2026

All 26 front/side views now use the approved thin light brushed silver hook and stem above the existing dark gunmetal frame. The graphite front reuses the approved demo; other views were edited with the built-in imagegen tool. The previous assets are preserved; new siblings end in -cutout-silver-hook.png under public/images/products/. Sources, dimensions, hashes and exact edit prompts are recorded in asset-manifest.json. Per-view top-padding compensation aligns hooks with the existing wooden rail. These remain AI-edited prototype assets.

## Visible spotlight fixture — 13 November 2026

Added public/images/shared/lighting/studio-spotlight.png, a generated transparent matte-black gallery spotlight with a warm lens. Created with the built-in imagegen tool; exact prompt, dimensions and hash are in asset-manifest.json. The homepage mirrors the same photo for its second corner rather than downloading a second asset. Both are decorative with empty alternative text and no pointer input.

## Brass fixture and chain supports — 13 November 2026

Replaced the displayed black spotlight with public/images/shared/lighting/brass-studio-spotlight.png, edited from the user reference with the built-in imagegen tool. The transparent lamp head/yoke keeps the slotted brass housing and warm lens; the long stand/background were removed. Exact prompt and hash are recorded in asset-manifest.json. Both mirrored copies use 55% opacity; the warm CSS beams use 70%. The old black fixture is retained. The support pattern at public/images/shared/lighting/rail-chain.svg is an original repeating SVG with alternating linked metal ellipses and no scripts or external resources.
