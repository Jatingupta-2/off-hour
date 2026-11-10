import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Make yourself at home." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Make yourself at home."
      description="Account registration and email verification are planned."
    />
  );
}
