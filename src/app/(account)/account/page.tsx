import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Your OFFHOUR." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Your OFFHOUR."
      description="Profile preferences and account details are planned."
    />
  );
}
