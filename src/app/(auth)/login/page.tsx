import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Welcome back." };
export default function Page() {
  return (
    <PlaceholderPage
      title="Welcome back."
      description="Google and email/password sign-in will be connected here."
    />
  );
}
