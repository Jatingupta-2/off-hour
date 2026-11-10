import Link from "next/link";
import { ShoppingBag, UserRound } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-6 px-6 py-7 md:px-14">
      <Link
        href="/"
        aria-label="OFFHOUR home"
        className="text-xl font-bold tracking-[-0.07em]"
      >
        OFFHOUR
      </Link>
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-5 text-sm md:gap-8"
      >
        <Link href="/shop" className="hover:underline underline-offset-4">
          Shop
        </Link>
        <Link href="/about" className="hover:underline underline-offset-4">
          About
        </Link>
        <Link href="/login" aria-label="Account" className="p-2">
          <UserRound size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
        <Link href="/bag" aria-label="Shopping bag" className="p-2">
          <ShoppingBag size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
