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
- Original observed resolutions and backgrounds are preserved. No upscaling, background removal, or replacement artwork was performed.
- The current assets are not a complete paired front/side set for every garment. Linen/co-ord front views, matching crops, transparency, hanger alignment, and a sharp wordmark remain future work before a convincing rail turn can be finalized.
- Animated references are not final UI components. Final logo selection, sizing, reduced-motion behavior, and theme contrast must be checked during implementation.
- There is no SVG wordmark among the observed assets; the raster wordmark has not been mislabeled as vector artwork.
