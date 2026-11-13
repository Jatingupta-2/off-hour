import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-start">
        <Link href="/" aria-label="OFFHOUR home" className="brand">
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet="/images/shared/logos/offhour-watch-hands-reference.png"
            />
            <Image
              src="/images/shared/logos/offhour-dial-animated.svg"
              alt=""
              width={34}
              height={34}
            />
          </picture>
          <span className="brand-wordmark">OFFHOUR</span>
        </Link>
        <nav aria-label="Main navigation" className="header-links">
          <Link href="/shop" className="header-link">
            Shop
          </Link>
          <Link href="/about" className="header-link">
            About
          </Link>
        </nav>
      </div>
      <nav aria-label="Customer navigation" className="header-actions">
        <Link href="/login" className="header-link">
          Account
        </Link>
        <Link href="/bag" aria-label="Shopping bag" className="header-link">
          Bag <ShoppingBag size={14} strokeWidth={1.2} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
