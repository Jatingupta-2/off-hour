import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Reset your password." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Reset your password."
      description="Secure token validation and password reset are planned."
    />
  );
}
