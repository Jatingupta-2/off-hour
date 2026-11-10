import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "The collection." };
export default function Page() {
  return (
    <PlaceholderPage
      title="The collection."
      description="Product browsing, search, and filters will be built here."
    />
  );
}
