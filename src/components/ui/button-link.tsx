import Link from "next/link";
import type { ComponentProps } from "react";

export function ButtonLink({
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-11 items-center justify-center bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-80 ${className}`}
    />
  );
}
