// Abre o pop-up de vídeo (components/VideoModal.tsx) de qualquer lugar da página.
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
