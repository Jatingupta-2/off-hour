import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "A fresh start." };
export default function Page() {
  return (
    <PlaceholderPage
      title="A fresh start."
      description="The password recovery flow is not connected yet."
    />
  );
}
