import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Your bag." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Your bag."
      description="Persistent shopping bag and variant selection are planned."
    />
  );
}
