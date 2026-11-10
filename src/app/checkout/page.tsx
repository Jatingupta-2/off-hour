import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Checkout." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Checkout."
      description="Verified login, stock reservations, and Razorpay test checkout will be built here."
    />
  );
}
