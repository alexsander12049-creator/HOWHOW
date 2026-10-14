import type { ImageSourcePropType } from "react-native";
import type { CreatorKey, ImageKey, LogoKey, PhotoKey } from "./content";

export const images: Record<ImageKey, ImageSourcePropType> = {
  foguete: require("../assets/howhow/foguete.png"),
  fogueteBranco: require("../assets/howhow/foguete-branco.png"),
  hopeRetrato: require("../assets/howhow/hope-retrato.jpg"),
  hopeCapa: require("../assets/howhow/hope-capa.jpg"),
  painelHome: require("../assets/howhow/painel-home.jpg"),
  painelCampanhas: require("../assets/howhow/painel-campanhas.jpg"),
  painelAnalytics: require("../assets/howhow/painel-analytics.jpg"),
  appCreator: require("../assets/howhow/app-creator.jpg"),
};

// Logos da faixa de marcas (recortados do site antigo, preto com transparência).
export const logos: Record<LogoKey, ImageSourcePropType> = {
  paramount: require("../assets/howhow/marcas/paramount.png"),
  aliexpress: require("../assets/howhow/marcas/aliexpress.png"),
  netflix: require("../assets/howhow/marcas/netflix.png"),
  garena: require("../assets/howhow/marcas/garena.png"),
  hbo: require("../assets/howhow/marcas/hbo.png"),
  picpay: require("../assets/howhow/marcas/picpay.png"),
  mondial: require("../assets/howhow/marcas/mondial.png"),
};

// Fotos dos depoimentos (do site antigo).
export const photos: Record<PhotoKey, ImageSourcePropType> = {
  luisa: require("../assets/howhow/depoimentos/luisa.jpg"),
  katia: require("../assets/howhow/depoimentos/katia.jpg"),
};

// Creators do exemplo do "Como funciona": pessoas fictícias, rostos gerados por IA.
export const creatorPhotos: Record<CreatorKey, ImageSourcePropType> = {
  c1: require("../assets/howhow/creators/c1.jpg"),
  c2: require("../assets/howhow/creators/c2.jpg"),
  c3: require("../assets/howhow/creators/c3.jpg"),
  c4: require("../assets/howhow/creators/c4.jpg"),
  c5: require("../assets/howhow/creators/c5.jpg"),
  c6: require("../assets/howhow/creators/c6.jpg"),
  c7: require("../assets/howhow/creators/c7.jpg"),
  c8: require("../assets/howhow/creators/c8.jpg"),
};
