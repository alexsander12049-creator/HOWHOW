import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import Svg, { Path } from "react-native-svg";
import { announcePlay, listeners } from "./CaseVideo";
import { c, f } from "./theme";
import { Button } from "./ui";

const VSL_ID = 0; // os cards de case usam 1, 2, 3

// VSL do topo: capa com play grande; depois do play, os controles nativos do aparelho
// (barra, som, tela cheia); no fim, chamada para contato e "assistir de novo".
export function VslPlayer({ duration, onCta, wide }: { duration: string; onCta: () => void; wide: boolean }) {
  const player = useVideoPlayer(require("../assets/howhow/vsl.mp4"), (p) => {
    p.loop = false;
  });
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  useEventListener(player, "playToEnd", () => setEnded(true));

  // só um vídeo por vez na página
  useEffect(() => {
    const onOther = (id: number) => {
      if (id !== VSL_ID) player.pause();
    };
    listeners.add(onOther);
    return () => {
      listeners.delete(onOther);
    };
  }, [player]);

  const play = () => {
    if (ended) player.currentTime = 0;
    setEnded(false);
    setStarted(true);
    announcePlay(VSL_ID);
    player.muted = false;
    player.play();
  };

  return (
    <View style={[st.frame, { borderRadius: wide ? 28 : 18, borderWidth: wide ? 6 : 4 }]}>
      <VideoView player={player} style={st.fill} contentFit="cover" nativeControls={started && !ended} fullscreenOptions={{ enable: true }} />

      {!started && (
        <Pressable style={st.cover} onPress={play} accessibilityRole="button" accessibilityLabel="Assistir ao vídeo">
          <Image source={require("../assets/howhow/vsl-capa.jpg")} style={st.fill} resizeMode="cover" />
          <View style={st.shade} />
          <View style={[st.play, !wide && { width: 64, height: 64, borderRadius: 32 }]}>
            <Svg viewBox="0 0 24 24" width={wide ? 34 : 26} height={wide ? 34 : 26} style={{ marginLeft: 4 }}>
              <Path d="M8 5.5v13l10.5-6.5Z" fill="#000" />
            </Svg>
          </View>
          <Text style={[st.title, !wide && { fontSize: 16 }]}>Veja a Howhow em ação</Text>
          <Text style={st.sub}>{duration} · assista com som</Text>
        </Pressable>
      )}

      {ended && (
        <View style={st.end}>
          <Text style={[st.endTitle, !wide && { fontSize: 22 }]}>Pronto pra decolar?</Text>
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <Button label="Fale com a gente" tone="orange" onPress={onCta} />
            <Button label="↺ Assistir de novo" tone="white" onPress={play} />
          </View>
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  frame: {
    width: "100%", aspectRatio: 16 / 9, overflow: "hidden", backgroundColor: "#000", borderColor: "#fff",
    shadowColor: "#000", shadowOpacity: 0.35, shadowRadius: 40, shadowOffset: { width: 0, height: 30 }, elevation: 10,
  },
  fill: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
  cover: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", gap: 10 },
  shade: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.38)" },
  play: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", marginBottom: 6,
    shadowColor: "#000", shadowOpacity: 0.45, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 8,
  },
  title: { fontFamily: f.bold, fontSize: 22, letterSpacing: -0.5, color: "#fff" },
  sub: { fontFamily: f.medium, fontSize: 13, color: "rgba(255,255,255,0.85)" },
  end: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", alignItems: "center", justifyContent: "center", gap: 18, padding: 16 },
  endTitle: { fontFamily: f.bold, fontSize: 34, letterSpacing: -1.2, color: c.surface },
});
