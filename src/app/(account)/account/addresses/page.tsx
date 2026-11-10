import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Your addresses." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Your addresses."
      description="Saved delivery addresses will be managed here."
    />
  );
}
