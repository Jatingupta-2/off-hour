import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Product details." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Product details."
      description="Product gallery, sizing, and purchase controls are planned."
    />
  );
}
