import { useEffect, useRef, useState, type ReactNode } from "react";
import { Children, type ReactElement } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View, useWindowDimensions, type StyleProp, type ViewStyle } from "react-native";
import { c, f } from "./theme";

// Quebras iguais às do site: celular < 810 ≤ tablet < 1200 ≤ computador.
export function useLayout() {
  const { width } = useWindowDimensions();
  const wide = width >= 810;
  const desktop = width >= 1200;
  const content = Math.min(width - 40, 1050);
  return { width, wide, desktop, content };
}

export function Section({ children, white, style, onLayout }: { children: ReactNode; white?: boolean; style?: StyleProp<ViewStyle>; onLayout?: (y: number) => void }) {
  const { wide } = useLayout();
  return (
    <View
      style={[{ width: "100%", alignItems: "center" }, white && { backgroundColor: c.surface }]}
      onLayout={onLayout ? (e) => onLayout(e.nativeEvent.layout.y) : undefined}
    >
      <View style={[s.section, wide && { paddingVertical: 100, gap: 60 }, style]}>{children}</View>
    </View>
  );
}

// Grade de colunas: no celular vira uma coluna só. `spans` deixa um item ocupar mais de uma coluna.
export function Grid({ children, cols, gap = 10, spans }: { children: ReactNode; cols: number; gap?: number; spans?: number[] }) {
  const { content } = useLayout();
  const unit = (content - gap * (cols - 1)) / cols;
  const items = Children.toArray(children) as ReactElement[];
  if (cols <= 1) return <View style={{ gap }}>{items}</View>;
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap }}>
      {items.map((child, i) => {
        const span = Math.min(spans?.[i] ?? 1, cols);
        return (
          <View key={i} style={{ width: unit * span + gap * (span - 1) }}>
            {child}
          </View>
        );
      })}
    </View>
  );
}

export function Tag({ children }: { children: string }) {
  return (
    <View style={s.tag}>
      <View style={s.tagIcon} />
      <Text style={s.tagText}>{children}</Text>
    </View>
  );
}

export function Heading({ tag, title, text }: { tag: string; title: string; text?: string }) {
  const { wide, desktop } = useLayout();
  return (
    <View style={[s.heading, { alignSelf: "center", maxWidth: 560 }]}>
      <Tag>{tag}</Tag>
      <Text style={[s.h2, wide && { fontSize: desktop ? 58 : 52, lineHeight: desktop ? 64 : 57, letterSpacing: -2.8 }]}>{title}</Text>
      {text ? <Text style={[s.lead, { textAlign: "center", opacity: 0.8 }, wide && { fontSize: 18, lineHeight: 27 }]}>{text}</Text> : null}
    </View>
  );
}

export function Pill({ children, icon, tone = "white", small }: { children: string; icon?: ReactNode; tone?: "white" | "gray" | "black"; small?: boolean }) {
  return (
    <View
      style={[
        s.pill,
        small && s.pillSm,
        tone === "gray" && { backgroundColor: c.bg },
        tone === "black" && { backgroundColor: c.ink, borderColor: c.ink },
        !icon && { paddingLeft: small ? 14 : 18 },
      ]}
    >
      {icon}
      <Text style={[s.pillText, small && { fontSize: 13 }, tone === "black" && { color: "#fff" }]}>{children}</Text>
    </View>
  );
}

export function Button({ label, onPress, tone = "black", full }: { label: string; onPress?: () => void; tone?: "black" | "white" | "outline" | "orange"; full?: boolean }) {
  const bg = tone === "black" ? c.ink : tone === "orange" ? c.orange : tone === "white" ? "#fff" : "transparent";
  const fg = tone === "black" || tone === "orange" ? "#fff" : c.ink;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.btn,
        { backgroundColor: bg, borderColor: tone === "outline" ? c.lineStrong : bg },
        full && { alignSelf: "stretch" },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      {tone !== "outline" && <View style={[s.dot, { backgroundColor: fg }]} />}
      <Text style={[s.btnText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

// Faixa que rola sem parar (o "ticker" da referência).
export function Ticker({ items, speed = 40, reverse, gap = 10 }: { items: ReactNode[]; speed?: number; reverse?: boolean; gap?: number }) {
  const [w, setW] = useState(0);
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!w) return;
    x.setValue(0);
    const anim = Animated.loop(
      Animated.timing(x, { toValue: 1, duration: speed * 1000 /* segundos por volta, igual ao site */, easing: Easing.linear, useNativeDriver: true }),
    );
    anim.start();
    return () => anim.stop();
  }, [w, speed, x]);

  const translateX = x.interpolate({ inputRange: [0, 1], outputRange: reverse ? [-w, 0] : [0, -w] });
  const row = (key: string) => (
    <View key={key} style={{ flexDirection: "row", gap, paddingRight: gap }} onLayout={key === "a" ? (e) => setW(e.nativeEvent.layout.width) : undefined}>
      {items.map((it, i) => (
        <View key={i}>{it}</View>
      ))}
    </View>
  );
  return (
    <View style={{ overflow: "hidden", width: "100%" }}>
      <Animated.View style={{ flexDirection: "row", transform: [{ translateX }] }}>
        {row("a")}
        {row("b")}
      </Animated.View>
    </View>
  );
}

// Entrada suave quando o bloco monta.
export function FadeIn({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: StyleProp<ViewStyle> }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v, delay]);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}

export const s = StyleSheet.create({
  section: { width: "100%", maxWidth: 1090, paddingHorizontal: 20, paddingVertical: 60, gap: 30, alignItems: "stretch" },
  heading: { alignItems: "center", gap: 15 },
  tag: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 7, paddingLeft: 12, paddingRight: 14, borderRadius: 40, backgroundColor: "#fff", borderWidth: 1, borderColor: "#dcdcdc", alignSelf: "center" },
  tagIcon: { width: 6, height: 6, borderRadius: 3, backgroundColor: c.orange },
  tagText: { fontFamily: f.semibold, fontSize: 13, color: c.ink2 },
  h1: { fontFamily: f.bold, fontSize: 40, letterSpacing: -2, lineHeight: 44, textAlign: "center", color: c.ink },
  h2: { fontFamily: f.semibold, fontSize: 34, letterSpacing: -1.7, lineHeight: 38, textAlign: "center", color: c.ink },
  h4: { fontFamily: f.medium, fontSize: 20, letterSpacing: -0.4, lineHeight: 24, color: c.ink },
  lead: { fontFamily: f.medium, fontSize: 16, lineHeight: 24, color: c.ink },
  body: { fontFamily: f.medium, fontSize: 15, lineHeight: 22, color: c.ink2 },
  small: { fontFamily: f.medium, fontSize: 13, color: c.muted },
  pill: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 10, paddingRight: 18, borderRadius: 40, backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong },
  pillSm: { paddingVertical: 7, paddingLeft: 10, paddingRight: 14, gap: 5 },
  pillText: { fontFamily: f.medium, fontSize: 16, letterSpacing: -0.3, color: c.ink2 },
  btn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 15, paddingHorizontal: 22, borderRadius: 40, borderWidth: 1 },
  btnText: { fontFamily: f.medium, fontSize: 16, letterSpacing: -0.3 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  card: { backgroundColor: "#fff", borderRadius: 30, padding: 20, gap: 18 },
});

// Foguete do logo: ao passar o mouse (web) ou tocar, treme, acende a chama, decola e volta por baixo.
export function LogoRocket({ size = 28, trigger }: { size?: number; trigger: number }) {
  const t = useRef(new Animated.Value(0)).current;
  const busy = useRef(false);
  useEffect(() => {
    if (!trigger || busy.current) return;
    busy.current = true;
    t.setValue(0);
    Animated.timing(t, { toValue: 1, duration: 1250, easing: Easing.linear, useNativeDriver: true }).start(() => {
      busy.current = false;
    });
  }, [trigger, t]);
  // mesmas etapas do site: 0–0.2 treme · 0.2–0.48 decola · 0.49 reaparece embaixo · 0.49–1 volta com quique
  const x = t.interpolate({ inputRange: [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.48, 0.49, 0.82, 0.92, 1], outputRange: [0, -1, 1, -1, 1, 0, 22, -16, 1, 0, 0] });
  const y = t.interpolate({ inputRange: [0, 0.04, 0.12, 0.2, 0.48, 0.49, 0.82, 0.92, 1], outputRange: [0, 1, 1, 2, -44, 30, -3, 1, 0] });
  const rot = t.interpolate({ inputRange: [0, 0.04, 0.08, 0.12, 0.16, 0.2, 1], outputRange: ["0deg", "-3deg", "3deg", "-2deg", "2deg", "0deg", "0deg"] });
  const scale = t.interpolate({ inputRange: [0, 0.2, 0.48, 0.49, 0.82, 0.92, 1], outputRange: [1, 0.94, 0.7, 0.7, 1.04, 0.99, 1] });
  const opacity = t.interpolate({ inputRange: [0, 0.2, 0.48, 0.49, 0.6, 1], outputRange: [1, 1, 0, 0, 1, 1] });
  const flame = t.interpolate({ inputRange: [0, 0.1, 0.22, 0.48, 1], outputRange: [0, 0.6, 1.4, 0, 0] });
  const puff = (d: number) => t.interpolate({ inputRange: [0, 0.15 + d, 0.3 + d, 0.85 + d, 1], outputRange: [0, 0, 0.9, 0, 0], extrapolate: "clamp" });
  const puffMove = (d: number) => t.interpolate({ inputRange: [0, 0.15 + d, 0.85 + d, 1], outputRange: [0, 0, 1, 1], extrapolate: "clamp" });
  return (
    <View style={{ width: size, height: size }}>
      {[0, 0.06, 0.12].map((d, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute", left: size * 0.14, top: size * 0.72, width: 8, height: 8, borderRadius: 4, backgroundColor: "#d9dde3",
            opacity: puff(d),
            transform: [
              { translateX: puffMove(d).interpolate({ inputRange: [0, 1], outputRange: [0, [-10, -2, -15][i]] }) },
              { translateY: puffMove(d).interpolate({ inputRange: [0, 1], outputRange: [0, [10, 14, 3][i]] }) },
              { scale: puffMove(d).interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.2] }) },
            ],
          }}
        />
      ))}
      <Animated.View style={{ width: size, height: size, opacity, transform: [{ translateX: x }, { translateY: y }, { rotate: rot }, { scale }] }}>
        <Animated.View
          style={{
            position: "absolute", left: size * 0.17, top: size * 0.62, width: 10, height: 16, borderRadius: 6, backgroundColor: "#ff8a00",
            opacity: flame.interpolate({ inputRange: [0, 0.1, 1.4], outputRange: [0, 1, 1] }),
            transformOrigin: "top", transform: [{ rotate: "35deg" }, { scaleY: flame }, { scaleX: flame.interpolate({ inputRange: [0, 1.4], outputRange: [0, 1] }) }],
          }}
        />
        <Image source={require("../assets/howhow/foguete.png")} style={{ width: size, height: size }} />
      </Animated.View>
    </View>
  );
}
