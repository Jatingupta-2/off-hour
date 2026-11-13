"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useState } from "react";
import { homepageGarments } from "../data/homepage-garments";
import styles from "./clothing-rail.module.css";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const FEATURED_INDEX = homepageGarments.findIndex(
  (garment) => garment.slug === "everyday-hoodie",
);

function GarmentPhoto({
  src,
  name,
  featured,
  photoLift = 0,
}: {
  src: string;
  name: string;
  featured: boolean;
  photoLift?: number;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className={styles.imageFallback}>
      {name}
      <span>View product details ↗</span>
    </span>
  ) : (
    <Image
      src={src}
      alt=""
      fill
      sizes="(max-width: 760px) 240px, 320px"
      className={styles.photo}
      style={
        photoLift ? { transform: `translateY(-${photoLift}%)` } : undefined
      }
      priority={featured}
      loading={featured ? undefined : "eager"}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}

export function ClothingRail() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const activeIndex = focusedIndex ?? hoveredIndex ?? FEATURED_INDEX;
  const selected = homepageGarments[activeIndex];

  return (
    <section className={styles.home} aria-labelledby="home-heading">
      <h1 className="sr-only" id="home-heading">
        Wear your own time.
      </h1>
      <div className={styles.lightFixtures} aria-hidden="true">
        <Image
          src="/images/shared/lighting/brass-studio-spotlight.png"
          alt=""
          width={104}
          height={78}
          className={[styles.spotlightFixture, styles.spotlightLeft].join(" ")}
          draggable={false}
        />
        <Image
          src="/images/shared/lighting/brass-studio-spotlight.png"
          alt=""
          width={104}
          height={78}
          className={[styles.spotlightFixture, styles.spotlightRight].join(" ")}
          draggable={false}
        />
      </div>
      <div
        className={styles.stage}
        onPointerLeave={() => setHoveredIndex(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusedIndex(null);
          }
        }}
      >
        <div className={styles.railAssembly}>
          <div className={styles.hardware} aria-hidden="true">
            <i />
            <i />
            <span />
          </div>
          <ul
            className={styles.garments}
            aria-label="Explore the OFFHOUR collection"
          >
            {homepageGarments.map((garment, index) => {
              const active = activeIndex === index;
              const front = garment.frontImage;
              return (
                <li
                  className={styles.slot}
                  data-active={active}
                  data-featured={index === FEATURED_INDEX}
                  data-cutout={garment.cutout}
                  key={garment.slug}
                >
                  <Link
                    href={`/products/${garment.slug}`}
                    prefetch={false}
                    className={styles.garment}
                    aria-label={`${garment.name}, ${garment.color}, ${currency.format(garment.pricePaise / 100)}. View product.`}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setHoveredIndex(index);
                    }}
                    onFocus={() => {
                      setHoveredIndex(null);
                      setFocusedIndex(index);
                    }}
                    data-view="paired"
                  >
                    <span className={styles.hook} aria-hidden="true" />
                    <span className={styles.photoStage} aria-hidden="true">
                      <span
                        className={`${styles.view} ${styles.side}`}
                        data-garment-view="side"
                      >
                        <GarmentPhoto
                          src={garment.sideImage}
                          name={garment.name}
                          featured={false}
                          photoLift={garment.photoLift?.side}
                        />
                      </span>
                      <span
                        className={`${styles.view} ${styles.front}`}
                        data-garment-view="front"
                      >
                        <GarmentPhoto
                          src={front}
                          name={garment.name}
                          featured={index === FEATURED_INDEX}
                          photoLift={garment.photoLift?.front}
                        />
                      </span>
                    </span>
                    <span className={styles.floorShadow} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.details} aria-live="polite" aria-atomic="true">
          {selected && (
            <Link
              href={`/products/${selected.slug}`}
              prefetch={false}
              className={styles.productDetail}
            >
              <span className={styles.productLine}>
                <span>{selected.name}</span>
                <span className={styles.dot} aria-hidden="true" />
                <span>{currency.format(selected.pricePaise / 100)}</span>
                <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className={styles.color}>{selected.color}</span>
            </Link>
          )}
        </div>
        <p className={styles.hint}>
          <MoveHorizontal size={13} strokeWidth={1.2} aria-hidden="true" />
          <span className={styles.desktopHint}>
            Hover to reveal. Click to explore.
          </span>
          <span className={styles.touchHint}>
            Choose a piece. Make it yours.
          </span>
        </p>
      </div>
      <div className={styles.signature} aria-hidden="true">
        Wear your own time.
      </div>
    </section>
  );
}
