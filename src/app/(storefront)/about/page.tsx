import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "On your own terms." };
export default function Page() {
  return (
    <PlaceholderPage
      title="On your own terms."
      description="The OFFHOUR brand story will live here."
    />
  );
}
