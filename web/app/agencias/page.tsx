import type { Metadata } from "next";
import SegmentPage from "@/components/segment/SegmentPage";
import { agenciesPage } from "@/lib/content";

export const metadata: Metadata = { title: agenciesPage.meta.title, description: agenciesPage.meta.description };

export default function AgenciasPage() {
  return <SegmentPage page={agenciesPage} kind="agencias" />;
}
