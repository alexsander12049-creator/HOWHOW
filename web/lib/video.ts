// Abre o pop-up de vídeo (components/VideoModal.tsx) de qualquer lugar da página.
import { showcase } from "./content";
export type VideoItem = {
  src: string;
  poster: string;
  title?: string;
  subtitle?: string;
  vertical?: boolean; // vídeos 9:16 dos creators
};

export const OPEN_VIDEO = "howhow:open-video";

export function openVideo(items: VideoItem[], index = 0) {
  window.dispatchEvent(new CustomEvent(OPEN_VIDEO, { detail: { items, index } }));
}

// Todos os vídeos de case, para o pop-up poder passar de um para o outro com as setas.
export const caseVideos: VideoItem[] = showcase.items.map((c) => ({
  src: `/howhow/videos/video-${c.video}.mp4`,
  poster: `/howhow/videos/capa-${c.video}.jpg`,
  title: c.campaign,
  subtitle: c.brand,
  vertical: true,
}));
