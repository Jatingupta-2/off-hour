import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Order details." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Order details."
      description="Verified order details, tracking, and eligible actions are planned."
    />
  );
}
