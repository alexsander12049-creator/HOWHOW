import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { terms } from "@/lib/legal";

export const metadata: Metadata = { title: terms.meta.title, description: terms.meta.description };

export default function Page() {
  return <LegalPage doc={terms} />;
}
