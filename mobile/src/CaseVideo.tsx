import { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType, type ViewStyle } from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Rect } from "react-native-svg";
import { c, f } from "./theme";
import { Heart } from "./icons";
import { Pill } from "./ui";

const videos: Record<number, { src: number; poster: ImageSourcePropType }> = {
  1: { src: require("../assets/howhow/videos/video-1.mp4"), poster: require("../assets/howhow/videos/capa-1.jpg") },
  2: { src: require("../assets/howhow/videos/video-2.mp4"), poster: require("../assets/howhow/videos/capa-2.jpg") },
  3: { src: require("../assets/howhow/videos/video-3.mp4"), poster: require("../assets/howhow/videos/capa-3.jpg") },
};

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
};

// Só um vídeo toca por vez: quem começa a tocar avisa os outros.
export const listeners = new Set<(id: number) => void>();
export const announcePlay = (id: number) => listeners.forEach((fn) => fn(id));

type Props = { brand: string; campaign: string; result: string; gradient: string[]; video: number; aspect: number };

// Card de case com vídeo, como na referência:
// - com mouse (web), uma bolinha de play acompanha o cursor; o vídeo continua parado até o clique;
// - o clique toca e a bolinha vira pausa; indo para outro card, a bolinha vai junto e o clique ali troca o vídeo;
// - no toque (celular), o play fica fixo no centro enquanto o vídeo está pausado.
export function CaseVideo({ brand, campaign, result, gradient, video, aspect }: Props) {
  const v = videos[video];
  const player = useVideoPlayer(v.src, (p) => {
    p.loop = true;
    p.muted = true;
    p.timeUpdateEventInterval = 0.5;
  });
  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  const time = useEvent(player, "timeUpdate", { currentTime: 0, currentLiveTimestamp: null, currentOffsetFromLive: null, bufferedPosition: 0 });
  const [started, setStarted] = useState(false);
  const [hover, setHover] = useState(false);
  // computador com mouse: sem play fixo no centro, só a bolinha que segue o cursor
  const [mouse, setMouse] = useState(
    () => Platform.OS === "web" && typeof window !== "undefined" && !!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches,
  );
  const hovering = useRef(false);
  const [muted, setMuted] = useState(true);
  const ball = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // a bolinha desliza atrás do cursor (interpolação a cada quadro, igual ao site)
  useEffect(() => {
    if (!hover) return;
    let id = 0;
    const step = () => {
      const cur = current.current;
      const t = target.current;
      cur.x += (t.x - cur.x) * 0.22;
      cur.y += (t.y - cur.y) * 0.22;
      ball.setValue({ x: cur.x, y: cur.y });
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [hover, ball]);

  // mouse: na web o Pressable vira um elemento da página; os eventos de ponteiro são escutados direto nele.
  const cardRef = useRef<View>(null);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = cardRef.current as unknown as HTMLElement | null;
    if (!el?.addEventListener) return;
    const pos = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || hovering.current) return;
      hovering.current = true;
      const p = pos(e);
      target.current = p;
      current.current = { ...p }; // entra já no lugar do cursor
      ball.setValue(p);
      setMouse(true);
      setHover(true);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!hovering.current) enter(e); // garante a bolinha mesmo se o "enter" não vier
      target.current = pos(e);
    };
    const leave = () => {
      hovering.current = false;
      setHover(false);
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ball]);

  useEffect(() => {
    const onOther = (id: number) => {
      if (id !== video) player.pause();
    };
    listeners.add(onOther);
    return () => {
      listeners.delete(onOther);
    };
  }, [player, video]);

  const play = () => {
    setStarted(true);
    announcePlay(video);
    player.play();
  };
  const left = player.duration ? player.duration - (time?.currentTime ?? 0) : null;
  const showCenter = !mouse && !isPlaying;

  return (
    <Pressable
      ref={cardRef}
      onPress={() => (isPlaying ? player.pause() : play())}
      style={[st.card, { aspectRatio: aspect }, mouse && Platform.OS === "web" && hideCursor]}
      accessibilityRole="button"
      accessibilityLabel={`${isPlaying ? "Pausar" : "Tocar"} vídeo do case ${brand}`}
    >
      <LinearGradient colors={gradient as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 1 }} style={StyleSheet.absoluteFill} />
      <VideoView player={player} style={st.fill} contentFit="cover" nativeControls={false} />
      {!started && <Image source={v.poster} style={st.fill} resizeMode="cover" />}
      <LinearGradient colors={["rgba(0,0,0,.35)", "transparent"]} style={[StyleSheet.absoluteFill, { bottom: "78%" }]} pointerEvents="none" />
      <LinearGradient colors={["transparent", "rgba(0,0,0,.6)"]} style={[StyleSheet.absoluteFill, { top: "50%" }]} pointerEvents="none" />

      <Text style={st.brand}>{brand.toUpperCase()}</Text>
      {isPlaying && left !== null && <Text style={st.time}>{fmt(left)}</Text>}

      {/* toque: play fixo no centro enquanto está pausado */}
      <View style={st.center} pointerEvents="none">
        <View style={[st.btn, { opacity: showCenter ? 1 : 0, transform: [{ scale: showCenter ? 1 : 0.6 }] }]}>
          <PlayIcon />
        </View>
      </View>

      <View style={{ gap: 10, marginRight: 46 }}>
        <Text style={st.title}>{campaign}</Text>
        <View style={{ alignSelf: "flex-start" }}>
          <Pill small icon={<Heart color={c.orange} size={15} />}>{result}</Pill>
        </View>
      </View>

      {isPlaying && (
        <Pressable
          style={st.sound}
          accessibilityLabel={muted ? "Ativar som" : "Desativar som"}
          onPress={() => {
            player.muted = !muted;
            setMuted(!muted);
          }}
        >
          <Svg viewBox="0 0 24 24" width={18} height={18}>
            <Path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="#fff" />
            {muted ? (
              <Path d="M16 9.5l5 5M21 9.5l-5 5" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            ) : (
              <Path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="#fff" strokeWidth={2} strokeLinecap="round" fill="none" />
            )}
          </Svg>
        </Pressable>
      )}
      {/* mouse: bolinha que acompanha o cursor */}
      {hover && (
        <Animated.View pointerEvents="none" style={[st.ball, { transform: [{ translateX: ball.x }, { translateY: ball.y }] }]}>
          <View style={[st.btn, { marginLeft: -28, marginTop: -28 }]}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</View>
        </Animated.View>
      )}
    </Pressable>
  );
}

function PlayIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
      <Path d="M8 5.5v13l10.5-6.5Z" fill="#000" />
    </Svg>
  );
}
function PauseIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
      <Rect x={7} y={5.5} width={3.6} height={13} rx={1.2} fill="#000" />
      <Rect x={13.4} y={5.5} width={3.6} height={13} rx={1.2} fill="#000" />
    </Svg>
  );
}

// esconde a seta do mouse em cima do card (a bolinha faz o papel dela); só existe na web
const hideCursor = { cursor: "none" } as unknown as ViewStyle;

const st = StyleSheet.create({
  ball: { position: "absolute", left: 0, top: 0, zIndex: 10 },
  fill: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
  card: { borderRadius: 20, padding: 20, justifyContent: "flex-end", overflow: "hidden", backgroundColor: c.dark },
  brand: { position: "absolute", top: 20, left: 20, fontFamily: f.bold, fontSize: 12, letterSpacing: 1.6, color: "#fff", opacity: 0.9 },
  time: { position: "absolute", top: 16, right: 16, fontFamily: f.semibold, fontSize: 12, color: "#fff", backgroundColor: "rgba(0,0,0,.45)", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8, overflow: "hidden" },
  center: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  btn: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 6 },
  title: { fontFamily: f.bold, fontSize: 28, lineHeight: 30, letterSpacing: -1, color: "#fff" },
  sound: { position: "absolute", right: 18, bottom: 22, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,.45)", alignItems: "center", justifyContent: "center" },
});
