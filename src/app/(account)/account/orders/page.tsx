import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Your orders." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Your orders."
      description="Order history will be available after authentication is connected."
    />
  );
}
