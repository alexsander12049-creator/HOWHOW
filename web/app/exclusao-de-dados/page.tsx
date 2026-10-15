import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { deletion } from "@/lib/legal";

export const metadata: Metadata = { title: deletion.meta.title, description: deletion.meta.description };

export default function Page() {
  return <LegalPage doc={deletion} />;
}
