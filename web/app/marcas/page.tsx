import type { Metadata } from "next";
import SegmentPage from "@/components/segment/SegmentPage";
import { brandsPage } from "@/lib/content";

export const metadata: Metadata = { title: brandsPage.meta.title, description: brandsPage.meta.description };

export default function MarcasPage() {
  return <SegmentPage page={brandsPage} kind="marcas" />;
}
