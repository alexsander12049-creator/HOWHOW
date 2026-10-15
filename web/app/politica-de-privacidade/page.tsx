import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = { title: privacy.meta.title, description: privacy.meta.description };

export default function Page() {
  return <LegalPage doc={privacy} />;
}
