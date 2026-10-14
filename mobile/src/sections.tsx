import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated, Easing, Image, ImageBackground, LayoutAnimation, Platform, Pressable, StyleSheet, Text, TextInput, UIManager, View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  agency, brand, clients, compare, contact, creators, faq, finalCta, footer, goals, hero, managed, plans, refund, scale, showcase, start, steps, stories,
} from "./content";
import { creatorPhotos, images, logos, photos } from "./images";
import { c, f } from "./theme";
import { Check, Cross, Heart, Instagram, Plus, Star, Tick } from "./icons";
import { CaseVideo } from "./CaseVideo";
import { VslPlayer } from "./VslPlayer";
import { Button, FadeIn, Grid, Heading, Pill, Section, Tag, Ticker, s, useLayout } from "./ui";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Go = (id: string) => void;
type Mark = (id: string) => (y: number) => void;

const green = "#1a9a50";

/* ---------- 1. PROMESSA ---------- */
export function Hero({ go }: { go: Go }) {
  const { wide, desktop } = useLayout();
  return (
    <Section style={[{ paddingTop: 30, gap: 40 }, wide && { paddingTop: 70, gap: 70 }]}>
      <FadeIn style={{ alignItems: "center", gap: wide ? 28 : 20, alignSelf: "center", maxWidth: 720 }}>
        <Tag>{hero.tag}</Tag>
        <Text style={[s.h1, wide && { fontSize: desktop ? 70 : 58, lineHeight: desktop ? 77 : 64, letterSpacing: -3.5 }]}>{hero.title}</Text>
        <Text style={[s.lead, { textAlign: "center", opacity: 0.8, maxWidth: 560 }, wide && { fontSize: 18, lineHeight: 27 }]}>{hero.text}</Text>
        <View style={wide ? { flexDirection: "row", gap: 10 } : { alignSelf: "stretch", gap: 10 }}>
          <Button label={hero.primary.label} onPress={() => go("planos")} full={!wide} />
          <Button label={hero.secondary.label} tone="outline" onPress={() => go("contato")} full={!wide} />
        </View>
        <Text style={[s.small, { textAlign: "center" }]}>{hero.note}</Text>
      </FadeIn>

      <FadeIn delay={200} style={{ alignSelf: "center", width: "100%", maxWidth: 980 }}>
        <VslPlayer duration={hero.vsl.duration} onCta={() => go("contato")} wide={wide} />
        {wide && (
          <>
            <View style={[st.float, { top: -22, left: -26, transform: [{ rotate: "-6deg" }] }]}>
              <Balloon icon={<Instagram color={c.blue} />} live={green} tail="right" delay={500} period={4200}>Redes conectadas</Balloon>
            </View>
            <View style={[st.float, { top: "24%", right: -34, transform: [{ rotate: "7deg" }] }]}>
              <Balloon icon={<Heart color={c.orange} />} live={c.orange} tail="left" delay={800} period={3600}>Nova candidatura</Balloon>
            </View>
          </>
        )}
      </FadeIn>
    </Section>
  );
}

// Balão que entra com um "pop" e fica flutuando ao lado da VSL, com a bolinha "ao vivo" pulsando.
function Balloon({ children, icon, live, tail, delay, period }: { children: string; icon: ReactNode; live: string; tail: "left" | "right"; delay: number; period: number }) {
  const pop = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const ping = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(pop, { toValue: 1, delay, friction: 5, tension: 120, useNativeDriver: true }).start();
    const loops = [
      Animated.loop(Animated.timing(bob, { toValue: 1, duration: period, easing: Easing.linear, useNativeDriver: true })),
      Animated.loop(Animated.timing(ping, { toValue: 1, duration: 1800, easing: Easing.out(Easing.quad), useNativeDriver: true })),
    ];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [pop, bob, ping, delay, period]);
  const translateY = bob.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, -8, -14, -6, 0] });
  const rotate = bob.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: ["0deg", "1.5deg", "0deg", "-1.5deg", "0deg"] });
  return (
    <Animated.View style={{ opacity: pop, transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }, { translateY }, { rotate }] }}>
      <View style={st.balloon}>
        {icon}
        <Text style={s.pillText}>{children}</Text>
        <View style={{ width: 8, height: 8, marginLeft: 2 }}>
          <Animated.View style={[st.liveDot, { backgroundColor: live, opacity: ping.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }), transform: [{ scale: ping.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }] }]} />
          <View style={[st.liveDot, { backgroundColor: live }]} />
        </View>
      </View>
      <View style={[st.tail, tail === "right" ? { right: 34 } : { left: 30 }]} />
    </Animated.View>
  );
}

/* ---------- 2. LOGOS ---------- */
export function Clients() {
  const { wide } = useLayout();
  return (
    <Section white style={{ paddingVertical: 40, gap: 16 }}>
      <Text style={[s.small, { textAlign: "center" }]}>{clients.label}</Text>
      <Ticker
        speed={30}
        gap={0}
        items={clients.logos.map((l) => {
          const h = Math.round(l.height * (wide ? 1 : 0.75));
          return (
            <View key={l.logo} style={{ height: wide ? 70 : 54, justifyContent: "center", paddingHorizontal: wide ? 34 : 24 }}>
              <Image source={logos[l.logo]} accessibilityLabel={l.name} style={{ height: h, width: (h * l.w) / l.h, opacity: 0.42 }} resizeMode="contain" />
            </View>
          );
        })}
      />
    </Section>
  );
}

/* ---------- peças de animação compartilhadas ---------- */
// Número animado a partir de texto formatado ("R$ 1.097", "3,1 mi", "8,4%"): conta quando `on` liga e
// desliza do valor atual para o novo quando o texto muda (ex.: mensal → anual). Sem número ("∞") fica igual.
function NumText({ value, on, delay = 0, duration = 1300, style }: { value: string; on: boolean; delay?: number; duration?: number; style?: object }) {
  const m = value.match(/^(\D*?)([\d.,]+)(.*)$/);
  const decimals = m && m[2].includes(",") ? m[2].split(",")[1].length : 0;
  const target = m ? Number(m[2].replace(/\./g, "").replace(",", ".")) : 0;
  const v = useRef(new Animated.Value(0)).current;
  const [n, setN] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const id = v.addListener(({ value: x }) => setN(x));
    return () => v.removeListener(id);
  }, [v]);
  useEffect(() => {
    if (!on || !m) return;
    const first = !started.current;
    started.current = true;
    Animated.timing(v, { toValue: target, duration: first ? duration : 650, delay: first ? delay : 0, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, target]);
  if (!m) return <Text style={style}>{value}</Text>;
  return (
    <Text style={style}>
      {m[1]}
      {n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {m[3]}
    </Text>
  );
}

// Barra que cresce da esquerda até o tamanho final.
function Grow({ on, delay = 0, style, children }: { on: boolean; delay?: number; style?: object; children?: ReactNode }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (on) Animated.timing(v, { toValue: 1, duration: 1100, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [on, v, delay]);
  return <Animated.View style={[style, { transformOrigin: "left", transform: [{ scaleX: v }] }]}>{children}</Animated.View>;
}

// Brilho atravessando um bloco de tempos em tempos.
function Shine({ every = 4500, delay = 1000 }: { every?: number; delay?: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(every - 1400),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, every, delay]);
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-600, 900] }) }] }]}>
      <LinearGradient colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }} style={{ width: 260, height: "100%" }} />
    </Animated.View>
  );
}

// Pílula preta que desliza até a opção escolhida (chave mensal/anual e abas).
function useSlidingPill(active: number) {
  const x = useRef(new Animated.Value(0)).current;
  const w = useRef(new Animated.Value(0)).current;
  const spots = useRef<{ x: number; w: number }[]>([]);
  const ready = useRef(false);
  const move = (i: number, animate: boolean) => {
    const sp = spots.current[i];
    if (!sp) return;
    if (!animate) {
      x.setValue(sp.x);
      w.setValue(sp.w);
      return;
    }
    Animated.spring(x, { toValue: sp.x, friction: 8, tension: 90, useNativeDriver: false }).start();
    Animated.spring(w, { toValue: sp.w, friction: 8, tension: 90, useNativeDriver: false }).start();
  };
  useEffect(() => {
    move(active, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const onItemLayout = (i: number) => (e: { nativeEvent: { layout: { x: number; width: number } } }) => {
    spots.current[i] = { x: e.nativeEvent.layout.x, w: e.nativeEvent.layout.width };
    if (i === active) move(i, ready.current);
    ready.current = true;
  };
  return { x, w, onItemLayout };
}

/* ---------- 3. NÚMEROS ---------- */
export function Scale() {
  const { wide, desktop } = useLayout();
  const colors = [c.ink, c.orange, c.blue];
  const [ref, on] = useInView<View>();
  return (
    <Section>
      <Heading tag={scale.tag} title={scale.title} />
      <View ref={ref}>
        <Grid cols={wide ? 3 : 1}>
          {scale.stats.map((it, i) => (
            <Rise key={it.label} on={on} i={i} style={st.stat}>
              <NumText value={it.value} on={on} delay={i * 150} duration={1600} style={[st.statValue, { color: colors[i] }, wide && { fontSize: desktop ? 76 : 60, lineHeight: desktop ? 80 : 64 }]} />
              <Grow on={on} delay={500 + i * 150} style={{ width: 56, height: 4, borderRadius: 4, backgroundColor: colors[i] }} />
              <Text style={[s.lead, { color: c.ink2 }]}>{it.label}</Text>
            </Rise>
          ))}
        </Grid>
      </View>
      <Ticker items={scale.ticker.map((t) => <Pill key={t} icon={<Check />}>{t}</Pill>)} speed={40} />
      <Text style={[s.small, { textAlign: "center" }]}>{scale.note}</Text>
    </Section>
  );
}

/* ---------- 4. COMO FUNCIONA ---------- */
export function Steps({ go, mark }: { go: Go; mark: Mark }) {
  const { wide, desktop } = useLayout();
  return (
    <Section white onLayout={mark("como-funciona")}>
      <Heading tag={steps.tag} title={steps.title} />
      <View style={{ gap: 10 }}>
        {steps.items.map((it, n) => {
          const text = (
            <View style={[{ gap: 14, padding: 8 }, desktop && { flex: 1, paddingHorizontal: 20 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={st.stepNum}>0{n + 1}</Text>
                <Text style={[s.body, { fontFamily: f.semibold }]}>{it.key}</Text>
              </View>
              <Text style={[st.h3, wide && { fontSize: 34, lineHeight: 38 }]}>{it.title}</Text>
              <Text style={s.body}>{it.text}</Text>
            </View>
          );
          return <StepCard key={it.key} n={n} text={text} desktop={desktop} />;
        })}
      </View>
      <View style={{ alignSelf: "center" }}>
        <Button label={steps.cta.label} onPress={() => go("contato")} />
      </View>
    </Section>
  );
}

// Card de um passo: as peças da mini tela só entram quando o card aparece na tela.
function StepCard({ n, text, desktop }: { n: number; text: ReactNode; desktop: boolean }) {
  const [ref, on] = useInView<View>();
  const art = <View style={[st.art, desktop && { flex: 1.15 }]}>{stepArt(n, on)}</View>;
  return (
    <View ref={ref} style={[st.howCard, desktop && { flexDirection: "row", alignItems: "center" }]}>
      {desktop && n % 2 ? <>{art}{text}</> : <>{text}{art}</>}
    </View>
  );
}

// true quando o elemento aparece na tela (na web usa IntersectionObserver; no celular começa ligado).
function useInView<T>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(Platform.OS !== "web");
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = ref.current as unknown as Element | null;
    if (!el || typeof IntersectionObserver === "undefined") return setOn(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

// Entrada em sequência: i = ordem. "pop" cresce com mola, "stamp" cai como carimbo.
function Rise({ on, i = 0, kind = "up", children, style }: { on: boolean; i?: number; kind?: "up" | "pop" | "stamp"; children: ReactNode; style?: object }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!on) return;
    const delay = kind === "up" ? 250 + i * 120 : kind === "pop" ? 200 + i * 90 : 500 + i * 220;
    const anim = kind === "up"
      ? Animated.timing(v, { toValue: 1, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      : Animated.spring(v, { toValue: 1, delay, friction: 6, tension: 140, useNativeDriver: true });
    anim.start();
  }, [on, v, i, kind]);
  const transform =
    kind === "up"
      ? [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }]
      : kind === "pop"
        ? [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }]
        : [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1.8, 1] }) }, { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ["-12deg", "0deg"] }) }];
  return <Animated.View style={[style, { opacity: v.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }), transform }]}>{children}</Animated.View>;
}

// Botão "clicado" em loop, como se alguém estivesse usando a tela.
function Press({ on, children }: { on: boolean; children: ReactNode }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!on) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(2200),
        Animated.timing(v, { toValue: 1, duration: 140, useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 260, easing: Easing.out(Easing.back(3)), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [on, v]);
  return <Animated.View style={{ transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }) }] }}>{children}</Animated.View>;
}

// Número contando de 0 até o valor (formato brasileiro).
function Count({ on, to, prefix = "", style }: { on: boolean; to: number; prefix?: string; style?: object }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    const v = new Animated.Value(0);
    const id = v.addListener(({ value }) => setN(Math.round(value)));
    Animated.timing(v, { toValue: to, duration: 1200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [on, to]);
  return <Text style={style}>{prefix}{n.toLocaleString("pt-BR")}</Text>;
}

function Face({ photo, size = 32, dim }: { photo: keyof typeof creatorPhotos; size?: number; dim?: boolean }) {
  return <Image source={creatorPhotos[photo]} style={{ width: size, height: size, borderRadius: size / 2, opacity: dim ? 0.55 : 1 }} />;
}

function stepArt(n: number, on: boolean) {
  const people = steps.people;
  if (n === 0)
    return (
      <Rise on={on} style={st.artCard}>
        <Rise on={on} i={0}><Text style={st.artCaps}>NOVA CAMPANHA</Text></Rise>
        <Rise on={on} i={1} style={{ gap: 7 }}>
          <Text style={st.artLabel}>Produto</Text>
          <Text style={st.artField}>Sérum Vitamina C</Text>
        </Rise>
        <Rise on={on} i={2} style={{ gap: 7 }}>
          <Text style={st.artLabel}>Objetivo</Text>
          <Text style={st.artField}>Lançamento no Reels e TikTok</Text>
        </Rise>
        <Rise on={on} i={3}>
          <View style={st.seg}>
            {["Aberta", "Híbrida", "Fechada"].map((t, i) => (
              <Text key={t} style={[st.segItem, i === 1 && st.segOn]}>{t}</Text>
            ))}
          </View>
        </Rise>
        <Rise on={on} i={4} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={[st.av, { width: 18, height: 18, borderRadius: 9, backgroundColor: green }]}><Tick size={10} /></View>
          <Text style={{ fontFamily: f.semibold, fontSize: 12, color: green, flex: 1 }}>Briefing pronto</Text>
          <Press on={on}><Text style={st.artCta}>Publicar →</Text></Press>
        </Rise>
      </Rise>
    );
  if (n === 1)
    return (
      <View style={{ width: "86%", gap: 12 }}>
        <Rise on={on} i={0} style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}>
          <Count on={on} to={127} style={{ fontFamily: f.bold, fontSize: 32, letterSpacing: -1.2 }} />
          <Text style={[s.body, { flex: 1 }]}>candidaturas</Text>
          <Pill small>30 aprovados</Pill>
        </Rise>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {people.slice(0, 7).map((p, i) => (
            <Rise key={p.ini} on={on} i={i + 1} kind="pop">
              <Face photo={p.photo} dim={i > 2} />
              {i < 3 && (
                <View style={st.faceOk}><Tick size={8} /></View>
              )}
            </Rise>
          ))}
        </View>
        <Rise on={on} i={8} style={st.row}>
          <Face photo={people[0].photo} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: f.semibold, fontSize: 13 }}>{people[0].handle}</Text>
            <Text style={{ fontFamily: f.medium, fontSize: 11, color: c.muted }}>Skincare · 84,2 mil · 8,1%</Text>
          </View>
          <Press on={on}><Text style={st.approve}>Aprovar</Text></Press>
        </Rise>
      </View>
    );
  if (n === 2)
    return (
      <Rise on={on} style={[st.artCard, { width: "88%", gap: 10 }]}>
        <Rise on={on} i={0}><Text style={{ fontFamily: f.bold, fontSize: 14 }}>{steps.queue.title}</Text></Rise>
        <View style={{ flexDirection: "row", gap: 5 }}>
          {steps.queue.counters.map((k, i) => (
            <Rise key={k.label} on={on} i={i + 1} style={st.kpi}>
              <Count on={on} to={Number(k.value)} style={{ fontFamily: f.bold, fontSize: 16, letterSpacing: -0.5 }} />
              <Text style={{ fontFamily: f.medium, fontSize: 9, color: c.muted }}>{k.label}</Text>
            </Rise>
          ))}
        </View>
        {steps.queue.rows.map((r, i) => (
          <Rise key={r.campaign} on={on} i={i + 5} style={[st.row, { padding: 8 }]}>
            <Face photo={people[i + 4].photo} size={28} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: f.semibold, fontSize: 13 }}>{r.campaign}</Text>
              <Text style={{ fontFamily: f.medium, fontSize: 11, color: c.muted }}>{r.detail}</Text>
            </View>
            {i === 0 ? <Press on={on}><Text style={st.approve}>{r.action}</Text></Press> : <Text style={st.approve}>{r.action}</Text>}
          </Rise>
        ))}
      </Rise>
    );
  if (n === 3)
    return (
      <View style={{ width: "88%", gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          {steps.flow.map((label, i) => (
            <Rise key={label} on={on} i={i} kind="pop" style={{ flex: 1, alignItems: "center", gap: 6 }}>
              <View style={[st.flowDot, i < 2 && { backgroundColor: c.blue, borderColor: c.blue }, i === 2 && { borderColor: c.orange }]}>
                {i < 2 && <Tick />}
              </View>
              <Text style={[st.flowLabel, i === 2 && { color: c.orange }]}>{label}</Text>
            </Rise>
          ))}
        </View>
        <Rise on={on} i={5} style={[st.row, { padding: 10 }]}>
          <Image source={require("../assets/howhow/videos/capa-3.jpg")} style={{ width: 36, height: 50, borderRadius: 8 }} />
          <Face photo={people[0].photo} size={24} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: f.semibold, fontSize: 13 }}>Entrega de {people[0].handle}</Text>
            <Text style={{ fontFamily: f.medium, fontSize: 11, color: c.muted }}>Produto recebido · vídeo enviado</Text>
          </View>
        </Rise>
        <Rise on={on} i={6} style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
          <Text style={st.ghost}>Pedir ajuste</Text>
          <Press on={on}><Text style={st.artCta}>Aprovar</Text></Press>
        </Rise>
      </View>
    );
  return (
    <View style={{ width: "88%", gap: 7 }}>
      {steps.payouts.map((p, i) => (
        <Rise key={p.name} on={on} i={i} style={st.row}>
          <Face photo={p.photo} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: f.semibold, fontSize: 13 }}>{p.name}</Text>
            <Text style={{ fontFamily: f.medium, fontSize: 11, color: c.muted }}>Nota fiscal recebida</Text>
          </View>
          <Count on={on} to={p.value} prefix="R$ " style={{ fontFamily: f.bold, fontSize: 13 }} />
          <Rise on={on} i={i} kind="stamp"><Text style={st.paid}>Pago</Text></Rise>
        </Rise>
      ))}
    </View>
  );
}

/* ---------- 5. CONTEÚDO REAL ---------- */
export function Showcase() {
  const { wide } = useLayout();
  return (
    <Section>
      <Heading tag={showcase.tag} title={showcase.title} text={showcase.text} />
      <Grid cols={wide ? 3 : 1}>
        {showcase.items.map((it) => (
          <CaseVideo key={it.video} {...it} aspect={wide ? 0.56 : 0.8} />
        ))}
      </Grid>
    </Section>
  );
}

/* ---------- 6. CASES + DEPOIMENTOS ---------- */
export function Stories({ mark }: { mark: Mark }) {
  const { wide } = useLayout();
  return (
    <Section onLayout={mark("cases")} style={{ paddingTop: 0 }}>
      <Heading tag={stories.tag} title={stories.title} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        {stories.numbers.map((n) => (
          <View key={n.label} style={st.number}>
            <Text style={[st.numberValue, wide && { fontSize: 46, lineHeight: 50 }]}>{n.value}</Text>
            <Text style={s.small}>{n.label}</Text>
          </View>
        ))}
      </View>
      <Testimonials />
    </Section>
  );
}

// Depoimentos em destaque: foto, frase entrando com fade e troca automática a cada 7s
// com barra de progresso nas abas de baixo (tocar numa aba troca na hora).
const TESTI_MS = 7000;
function Testimonials() {
  const { wide } = useLayout();
  const quotes = stories.quotes;
  const [i, setI] = useState(0);
  const enter = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    enter.setValue(0);
    Animated.timing(enter, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    bar.setValue(0);
    const run = Animated.timing(bar, { toValue: 1, duration: TESTI_MS, easing: Easing.linear, useNativeDriver: true });
    run.start(({ finished }) => finished && setI((n) => (n + 1) % quotes.length));
    return () => run.stop();
  }, [i, enter, bar, quotes.length]);

  const q = quotes[i];
  const up = (from: number, delay = 0) => ({
    opacity: enter.interpolate({ inputRange: [0, 0.2 + delay, 1], outputRange: [0, 0, 1] }),
    transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }],
  });
  const photoSize = wide ? 200 : 120;

  return (
    <View style={{ gap: 10 }}>
      <View style={[st.testiCard, wide && { flexDirection: "row", alignItems: "center", padding: 40, gap: 44, minHeight: 320 }]}>
        <Animated.View style={[st.testiMark, { opacity: enter.interpolate({ inputRange: [0, 1], outputRange: [0, 0.08] }) }]}>
          <Text style={{ fontFamily: f.bold, fontSize: 160, lineHeight: 160, color: c.orange }}>”</Text>
        </Animated.View>
        <Animated.View style={{ width: photoSize, height: photoSize, opacity: enter, transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }, { rotate: enter.interpolate({ inputRange: [0, 1], outputRange: ["-3deg", "0deg"] }) }] }}>
          <View style={[st.testiRing, { borderRadius: wide ? 34 : 26 }]} />
          <Image source={photos[q.photo]} accessibilityLabel={q.name} style={{ width: "100%", height: "100%", borderRadius: wide ? 28 : 22 }} />
          <Text style={st.testiCompany}>{q.company}</Text>
        </Animated.View>
        <View style={[{ gap: 18 }, wide && { flex: 1 }]}>
          <Animated.View style={[{ flexDirection: "row", gap: 4 }, up(8)]}>
            {[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}
          </Animated.View>
          <Animated.Text style={[st.quote, wide && { fontSize: 26, lineHeight: 34 }, up(16, 0.1)]}>“{q.quote}”</Animated.Text>
          <Animated.View style={up(10, 0.3)}>
            <Text style={{ fontFamily: f.bold, fontSize: 16 }}>{q.name}</Text>
            <Text style={s.small}>{q.role} · {q.company}</Text>
          </Animated.View>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {quotes.map((t, n) => (
          <Pressable
            key={t.name}
            onPress={() => setI(n)}
            accessibilityRole="tab"
            accessibilityState={{ selected: n === i }}
            style={[st.testiTab, n === i && { borderColor: c.ink, opacity: 1 }]}
          >
            <Image source={photos[t.photo]} style={{ width: wide ? 44 : 34, height: wide ? 44 : 34, borderRadius: 22 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: f.bold, fontSize: wide ? 15 : 13 }} numberOfLines={1}>{t.name}</Text>
              <Text style={s.small}>{t.company}</Text>
            </View>
            {n === i && (
              <View style={st.testiTrack}>
                <Animated.View style={[st.testiBar, { transform: [{ scaleX: bar }] }]} />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* ---------- 7. OBJETIVO ---------- */
export function Goals({ go, mark }: { go: Go; mark: Mark }) {
  const [i, setI] = useState(0);
  const { wide } = useLayout();
  const pill = useSlidingPill(i);
  return (
    <Section white onLayout={mark("objetivo")}>
      <Heading tag={goals.tag} title={goals.title} text={goals.text} />
      <View style={{ flexDirection: "row", gap: 8, alignSelf: "center" }}>
        <Animated.View style={[st.slidePill, { left: pill.x, width: pill.w }]} />
        {goals.tabs.map((t, n) => (
          <Pressable key={t.label} onLayout={pill.onItemLayout(n)} onPress={() => setI(n)} style={[st.tab, { backgroundColor: "transparent" }, n === i && { borderColor: "transparent" }]}>
            <Text style={[st.tabText, n === i && { color: "#fff" }]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>
      <GoalBody key={i} i={i} go={go} />
    </Section>
  );
}

// Conteúdo da aba: monta de novo a cada troca, então tudo entra outra vez (lista, números e barras).
function GoalBody({ i, go }: { i: number; go: Go }) {
  const g = goals.tabs[i];
  const max = Math.max(...g.mix.map((m) => m.n));
  const { wide } = useLayout();
  const [ref, on] = useInView<View>();
  return (
    <View ref={ref}>
      <Grid cols={wide ? 2 : 1}>
        <Rise on={on} style={[st.goalBox, wide && { flex: 1 }]}>
          <Text style={[st.h3, wide && { fontSize: 34, lineHeight: 38 }]}>{g.title}</Text>
          <Text style={st.caps}>PLANO DE TESTE</Text>
          <View style={{ gap: 12, flex: wide ? 1 : undefined }}>
            {g.plan.map((p, k) => (
              <Rise key={p} on={on} i={k} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <Check color={c.blue} />
                <Text style={[s.lead, { flex: 1 }]}>{p}</Text>
              </Rise>
            ))}
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Button label={goals.cta.label} onPress={() => go("contato")} />
          </View>
        </Rise>
        <Rise on={on} i={1} style={[st.goalBox, wide && { flex: 1 }]}>
          <Text style={st.caps}>EXEMPLO DE CAMPANHA</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {g.example.map((e, k) => (
              <Rise key={e.label} on={on} i={k} kind="pop" style={[st.kpi, { backgroundColor: "#fff", padding: 12 }]}>
                <NumText value={e.value} on={on} delay={k * 120} duration={900} style={{ fontFamily: f.bold, fontSize: 30, letterSpacing: -1.4 }} />
                <Text style={s.small}>{e.label}</Text>
              </Rise>
            ))}
          </View>
          <Text style={st.caps}>MIX DE CONTEÚDO</Text>
          <View style={{ gap: 12 }}>
            {g.mix.map((m, k) => (
              <View key={m.label} style={{ gap: 6 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                  <Text style={[s.body, { color: c.ink, flex: 1 }]}>{m.label}</Text>
                  <NumText value={`${m.n} vídeos`} on={on} delay={300 + k * 150} duration={900} style={{ fontFamily: f.bold, fontSize: 14 }} />
                </View>
                <View style={st.track}>
                  <Grow on={on} delay={350 + k * 150} style={{ width: `${(m.n / max) * 100}%`, height: "100%" }}>
                    <LinearGradient colors={[c.blue, c.orange]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                  </Grow>
                </View>
              </View>
            ))}
          </View>
          <Text style={s.small}>{goals.footnote}</Text>
        </Rise>
      </Grid>
    </View>
  );
}

/* ---------- 8. DEVOLUÇÃO DA SOBRA ---------- */
export function Refund() {
  const { wide } = useLayout();
  const [ref, on] = useInView<View>();
  return (
    <Section>
      <View style={[st.refund, wide && { flexDirection: "row", alignItems: "center", padding: 50, gap: 40 }]}>
        <View style={[{ gap: 18, alignItems: "flex-start" }, wide && { flex: 1.1 }]}>
          <Text style={st.refundTag}>{refund.tag}</Text>
          <Text style={[s.h2, { textAlign: "left" }, wide && { fontSize: 44, lineHeight: 48, letterSpacing: -2.2 }]}>{refund.title}</Text>
          <Text style={[s.lead, { opacity: 0.8 }]}>{refund.text}</Text>
        </View>
        {/* cena: teto → fechou em (barra enchendo) → devolvido (com destaque e brilho) */}
        <View ref={ref} style={[st.refundCard, wide && { flex: 1 }]}>
          {refund.example.slice(0, 2).map((e, i) => (
            <Rise key={e.label} on={on} i={i * 3} style={st.refundRow}>
              <Text style={[s.body, { flex: 1 }]}>{e.label}</Text>
              <NumText value={e.value} on={on} delay={200 + i * 500} duration={1000} style={st.refundValue} />
            </Rise>
          ))}
          <Rise on={on} i={4} style={{ height: 10, borderRadius: 10, backgroundColor: "#bfe9cf", overflow: "hidden" }}>
            <Grow on={on} delay={900} style={{ width: "35.6%", height: "100%", backgroundColor: c.ink, borderRadius: 10 }} />
          </Rise>
          <Rise on={on} i={11} kind="pop" style={[st.refundRow, { backgroundColor: green, overflow: "hidden" }]}>
            <Text style={[s.body, { flex: 1, color: "#fff" }]}>{refund.example[2].label}</Text>
            <NumText value={refund.example[2].value} on={on} delay={1700} duration={1100} style={[st.refundValue, { color: "#fff", fontSize: 30 }]} />
            {on && <Shine every={3500} delay={2400} />}
          </Rise>
          <Rise on={on} i={16}><Text style={s.small}>{refund.note}</Text></Rise>
        </View>
      </View>
    </Section>
  );
}

/* ---------- 9. PLANOS (+ agências) ---------- */
const SOON = " (em breve)";
export function Plans({ go, mark }: { go: Go; mark: Mark }) {
  const { wide } = useLayout();
  const [annual, setAnnual] = useState(false);
  const top = useRef(0); // posição da seção, para o link "Para agências" cair no card certo
  const pill = useSlidingPill(annual ? 1 : 0);
  const [ref, on] = useInView<View>();
  return (
    <Section onLayout={(y) => { top.current = y; mark("planos")(y); }} style={{ paddingTop: 0 }}>
      <Heading tag={plans.tag} title={plans.title} text={plans.text} />
      <View style={st.billing}>
        <Animated.View style={[st.slidePill, { top: 4, bottom: 4, left: pill.x, width: pill.w }]} />
        {[false, true].map((a, k) => (
          <Pressable key={String(a)} onLayout={pill.onItemLayout(k)} onPress={() => setAnnual(a)} style={st.billingBtn}>
            <Text style={[st.tabText, annual === a && { color: "#fff" }]}>{a ? plans.billing.annual : plans.billing.monthly}</Text>
            {a && <Text style={st.hint}>{plans.billing.annualHint}</Text>}
          </Pressable>
        ))}
      </View>

      <View style={[st.trial, { overflow: "hidden" }, wide && { flexDirection: "row", alignItems: "center" }]}>
        <Shine />
        <View style={[{ gap: 6 }, wide && { flex: 1 }]}>
          <Text style={[s.h4, { fontFamily: f.bold, color: "#fff" }]}>{plans.trial.title}</Text>
          <Text style={[s.body, { color: "#fff", opacity: 0.9 }]}>{plans.trial.text}</Text>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Button label={plans.trial.cta.label} tone="white" onPress={() => go("contato")} />
        </View>
      </View>

      <View ref={ref}>
      <Grid cols={wide ? 3 : 1}>
        {plans.items.map((p, n) => {
          const dark = p.popular;
          const fg = dark ? { color: "#fff" } : null;
          const card = (
            <View style={[st.plan, dark && { backgroundColor: c.ink, borderColor: c.ink, borderRadius: 28 }, { flex: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <Text style={[s.h4, { fontFamily: f.bold }, fg]}>{p.name}</Text>
                {dark && <Text style={st.badge}>Mais popular</Text>}
              </View>
              <Text style={[s.body, dark && { color: "#fff", opacity: 0.75 }]}>{p.for}</Text>
              <View>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <NumText value={annual ? p.annual : p.monthly} on={on} delay={200 + n * 120} style={[st.price, fg]} />
                  <Text style={[s.body, { letterSpacing: 0 }, fg]}> /mês</Text>
                </View>
                <Text style={[s.small, dark && { color: "#a0a4b0" }]}>{annual ? `cobrado anualmente · no mensal ${p.monthly}` : `ou ${p.annual}/mês no anual`}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {p.limits.map((l) => (
                  <View key={l.label} style={[st.limit, dark && { backgroundColor: "#1a1b20" }]}>
                    <NumText value={l.value} on={on} delay={400 + n * 120} style={[{ fontFamily: f.bold, fontSize: 22, letterSpacing: -0.8 }, fg]} />
                    <Text style={[s.small, dark && { color: "#a0a4b0" }]}>{l.label}</Text>
                  </View>
                ))}
              </View>
              <Button label={p.cta} tone={dark ? "orange" : "black"} full onPress={() => go("contato")} />
              <View style={[st.planList, dark && { borderColor: "#2a2b31" }, wide && { flex: 1 }]}>
                {p.features.map((it, k) => {
                  const soon = it.endsWith(SOON);
                  return (
                    <Rise key={it} on={on} i={k + 2} style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                      <Check color={dark ? "#fff" : c.blue} size={18} />
                      <Text style={[s.body, { flex: 1 }, fg]}>{soon ? it.slice(0, -SOON.length) : it}</Text>
                      {soon && <Text style={st.soon}>em breve</Text>}
                    </Rise>
                  );
                })}
              </View>
              <Text style={[s.small, dark && { color: "#a0a4b0" }]}>{p.budget}</Text>
            </View>
          );
          return (
            <Rise key={p.name} on={on} i={n} style={[{ flex: wide ? 1 : undefined }]}>
              {dark ? <SpinBorder>{card}</SpinBorder> : card}
            </Rise>
          );
        })}
      </Grid>
      </View>

      <View style={{ gap: 12, alignItems: "center" }}>
        <Text style={s.small}>{plans.includedTitle}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {plans.included.map((item, k) => (
            <Rise key={item} on={on} i={k} kind="pop">
              <Pill small icon={<Check color={c.blue} size={15} />}>{item}</Pill>
            </Rise>
          ))}
        </View>
      </View>

      <View onLayout={(e) => mark("agencias")(top.current + e.nativeEvent.layout.y)} style={[st.managed, { padding: 26 }, wide && { flexDirection: "row", alignItems: "center", padding: 40, gap: 30 }]}>
        <View style={[{ gap: 14, alignItems: "flex-start" }, wide && { flex: 1.4 }]}>
          <Text style={st.managedTag}>{agency.tag}</Text>
          <Text style={[st.h3, { color: "#fff" }]}>{agency.title}</Text>
          <Text style={[s.body, { color: "#fff", opacity: 0.75 }]}>{agency.text}</Text>
        </View>
        <View style={[st.agencyPrice, wide && { flex: 1 }]}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <NumText value={annual ? agency.annual : agency.monthly} on={on} delay={300} style={[st.price, { color: "#fff" }]} />
            <Text style={[s.body, { color: "#fff", letterSpacing: 0 }]}> /mês</Text>
          </View>
          <Text style={[s.small, { color: "#a0a4b0" }]}>{annual ? `cobrado anualmente · no mensal ${agency.monthly}` : `ou ${agency.annual}/mês no anual`}</Text>
          <View style={{ alignSelf: "flex-start" }}>
            <Button label={agency.cta.label} tone="white" onPress={() => go("contato")} />
          </View>
        </View>
      </View>
    </Section>
  );
}

// Borda colorida girando em volta do plano mais popular.
function SpinBorder({ children }: { children: ReactNode }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <View style={{ flex: 1, borderRadius: 31, padding: 3, overflow: "hidden", backgroundColor: c.ink }}>
      <Animated.View style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", transform: [{ rotate: v.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }] }}>
        <LinearGradient colors={[c.ink, c.ink, c.orange, c.blue, c.ink]} locations={[0, 0.45, 0.55, 0.62, 0.7]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
      </Animated.View>
      {children}
    </View>
  );
}

/* ---------- 9. COMPARAÇÃO ---------- */
export function Compare() {
  return (
    <Section white>
      <Heading tag={compare.tag} title={compare.title} />
      <Grid cols={useLayout().wide ? 3 : 1}>
        {compare.columns.map((col) => (
          <View key={col.title} style={{ gap: 10 }}>
            <View style={[st.compareHead, col.good && { backgroundColor: c.ink, borderColor: c.ink }]}>
              {col.good && <Image source={images.fogueteBranco} style={{ width: 24, height: 24 }} />}
              <Text style={[s.h4, col.good && { color: "#fff" }]}>{col.title}</Text>
            </View>
            <View style={st.compareList}>
              {col.items.map((it) => (
                <View key={it} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  {col.good ? <Check color={c.blue} /> : <Cross />}
                  <Text style={[s.lead, { flex: 1 }]}>{it}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Grid>
    </Section>
  );
}

/* ---------- 10. GERENCIADO ---------- */
export function Managed({ go, mark }: { go: Go; mark: Mark }) {
  const { wide } = useLayout();
  return (
    <Section white onLayout={mark("gerenciado")} style={{ paddingTop: 0 }}>
      <View style={[st.managed, wide && { flexDirection: "row", alignItems: "center", padding: 50, gap: 40 }]}>
        <Image source={images.fogueteBranco} style={st.managedMark} />
        <View style={[{ gap: 20, alignItems: "flex-start" }, wide && { flex: 1.2 }]}>
          <Text style={st.managedTag}>{managed.tag}</Text>
          <Text style={[s.h2, { color: "#fff", textAlign: "left" }, wide && { fontSize: 48, lineHeight: 52, letterSpacing: -2.4 }]}>{managed.title}</Text>
          <Text style={[s.lead, { color: "#fff", opacity: 0.75 }]}>{managed.text}</Text>
          <Button label={managed.cta.label} tone="white" onPress={() => go("contato")} />
        </View>
        <View style={[{ gap: 10 }, wide && { flex: 1 }]}>
          {managed.bullets.map((b) => (
            <View key={b} style={st.managedItem}>
              <Check color={c.orange} />
              <Text style={[s.lead, { color: "#fff", flex: 1 }]}>{b}</Text>
            </View>
          ))}
          <Text style={[s.small, { color: "#a0a4b0" }]}>{managed.price}</Text>
        </View>
      </View>
    </Section>
  );
}

/* ---------- 11. COMO COMEÇAR ---------- */
export function Start({ go }: { go: Go }) {
  const { wide, desktop } = useLayout();
  return (
    <Section>
      <Heading tag={start.tag} title={start.title} />
      <Grid cols={desktop ? 4 : wide ? 2 : 1}>
        {start.steps.map((it, i) => (
          <View key={it.title} style={[s.card, { gap: 12, padding: 24 }, wide && { flex: 1 }]}>
            <View style={[st.tlDot, i === 0 && { backgroundColor: c.orange }]}>
              <Text style={{ color: "#fff", fontFamily: f.bold }}>{i + 1}</Text>
            </View>
            <Text style={[st.caps, { color: c.orange }]}>{it.when.toUpperCase()}</Text>
            <Text style={s.h4}>{it.title}</Text>
            <Text style={s.body}>{it.text}</Text>
          </View>
        ))}
      </Grid>
      <View style={{ alignSelf: "center" }}>
        <Button label={start.cta.label} onPress={() => go("contato")} />
      </View>
    </Section>
  );
}

/* ---------- 12. FAQ ---------- */
export function Faq({ mark }: { mark: Mark }) {
  const [open, setOpen] = useState(0);
  return (
    <Section white onLayout={mark("faq")}>
      <Heading tag={faq.tag} title={faq.title} />
      <View style={st.faq}>
        {faq.items.map((it, n) => {
          const isOpen = open === n;
          return (
            <View key={it.q} style={st.faqItem}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                style={st.faqQ}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setOpen(isOpen ? -1 : n);
                }}
              >
                <Text style={[s.lead, { flex: 1, fontSize: 17 }]}>{it.q}</Text>
                <View style={[st.faqIcon, isOpen && { backgroundColor: c.orange, transform: [{ rotate: "45deg" }] }]}>
                  <Plus size={20} />
                </View>
              </Pressable>
              {isOpen && <Text style={[s.body, { paddingHorizontal: 18, paddingBottom: 18 }]}>{it.a}</Text>}
            </View>
          );
        })}
      </View>
    </Section>
  );
}

/* ---------- 13. CTA FINAL + FORMULÁRIO ---------- */
// O envio ainda não vai para lugar nenhum: ligue `enviar` a uma API, CRM ou serviço de e-mail antes de publicar.
export function Contact({ mark }: { mark: Mark }) {
  const [perfil, setPerfil] = useState(contact.profiles[0]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const ok = nome.trim() && /\S+@\S+\.\S+/.test(email) && msg.trim();
  const { wide } = useLayout();

  return (
    <Section white onLayout={mark("contato")} style={[{ paddingTop: 0 }, wide && { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }]}>
      <View style={wide ? { alignItems: "flex-start", gap: 15, maxWidth: 440 } : { alignItems: "center", gap: 15 }}>
        <View style={wide ? { alignSelf: "flex-start" } : undefined}>
          <Tag>{finalCta.tag}</Tag>
        </View>
        <Text style={[s.h2, wide && { textAlign: "left", fontSize: 52, lineHeight: 57, letterSpacing: -2.6 }]}>{finalCta.title}</Text>
        <Text style={[s.lead, { textAlign: wide ? "left" : "center", opacity: 0.8 }]}>{finalCta.text}</Text>
      </View>
      <View style={[st.form, wide && { flex: 1, maxWidth: 560, padding: 30 }]}>
        {sent ? (
          <View style={{ gap: 12, paddingVertical: 10 }}>
            <Text style={[s.h4, { color: "#fff" }]}>Recebido! 🚀</Text>
            <Text style={[s.body, { color: "#fff", opacity: 0.7 }]}>A gente responde em breve.</Text>
            <View style={{ alignSelf: "flex-start" }}>
              <Button label="Enviar outra mensagem" tone="white" onPress={() => setSent(false)} />
            </View>
          </View>
        ) : (
          <>
            <Text style={st.label}>Você é</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {contact.profiles.map((p) => (
                <Pressable key={p} onPress={() => setPerfil(p)} style={[st.chip, p === perfil && { backgroundColor: c.orange, borderColor: c.orange }]}>
                  <Text style={{ color: "#fff", fontFamily: f.medium, fontSize: 14 }}>{p}</Text>
                </Pressable>
              ))}
            </View>
            <Field label="Nome" value={nome} onChange={setNome} placeholder="Seu nome" />
            <Field label="E-mail" value={email} onChange={setEmail} placeholder="voce@empresa.com" keyboard="email-address" />
            <Field label="WhatsApp" value={tel} onChange={setTel} placeholder="(11) 90000-0000" keyboard="phone-pad" />
            <Field label="Mensagem" value={msg} onChange={setMsg} placeholder="Conte o que você precisa" multiline />
            <View style={{ opacity: ok ? 1 : 0.5 }}>
              <Button label="Enviar" tone="white" full onPress={() => ok && setSent(true)} />
            </View>
          </>
        )}
      </View>
    </Section>
  );
}

function Field({ label, value, onChange, placeholder, multiline, keyboard }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; multiline?: boolean;
  keyboard?: "email-address" | "phone-pad";
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={st.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="rgba(230,230,230,0.45)"
        multiline={multiline}
        keyboardType={keyboard}
        autoCapitalize={keyboard ? "none" : "sentences"}
        style={[st.input, multiline && { minHeight: 110, textAlignVertical: "top" }]}
      />
    </View>
  );
}

/* ---------- RODAPÉ (com o "para creators") ---------- */
// Foguete balançando dentro da faixa laranja.
function Rocket() {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [v]);
  const wave = v.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 0] });
  return (
    <Animated.Image
      source={images.fogueteBranco}
      style={{ width: 34, height: 34, transform: [{ translateY: wave.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }, { rotate: wave.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "8deg"] }) }] }}
    />
  );
}
export function Footer({ go, mark, openSite }: { go: Go; mark: Mark; openSite: (url: string) => void }) {
  const { wide } = useLayout();
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Section white style={{ gap: 50 }} onLayout={mark("creators")}>
        <View style={[st.creators, wide && { flexDirection: "row", alignItems: "center" }]}>
          <ImageBackground source={images.hopeCapa} style={st.creatorsCover} imageStyle={{ borderRadius: 18 }} />
          <View style={[{ gap: 8 }, wide && { flex: 1 }]}>
            <Text style={[st.h3, { color: "#fff" }, wide && { fontSize: 30, lineHeight: 34 }]}>{creators.title}</Text>
            <Text style={[s.body, { color: "#fff", opacity: 0.85 }]}>{creators.text}</Text>
          </View>
          <View style={{ alignSelf: wide ? "center" : "flex-start" }}>
            <Button label={creators.cta.label} tone="white" onPress={() => openSite(creators.cta.href)} />
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 30 }}>
          {footer.columns.map((col) => (
            <View key={col.title} style={{ width: wide ? "33.33%" : "50%", gap: 14 }}>
              <Text style={[s.h4, { fontSize: 18 }]}>{col.title}</Text>
              {col.links.map((l) => (
                <Pressable key={l.label} onPress={() => (l.href.startsWith("#") ? go(l.href.slice(1)) : openSite(l.href))}>
                  <Text style={s.body}>{l.label}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </Section>
      {/* duas faixas cruzadas rolando em sentidos opostos */}
      <View style={[st.stripes, { height: wide ? 320 : 210 }]}>
        <View style={[st.band, { backgroundColor: c.ink, paddingVertical: wide ? 20 : 12, transform: [{ translateY: wide ? 44 : 28 }, { rotate: wide ? "3deg" : "4deg" }] }]}>
          <Ticker
            speed={32}
            reverse
            gap={0}
            items={[0, 1].map((k) => (
              <View key={k} style={{ flexDirection: "row", alignItems: "center" }}>
                {["Creators", "Marcas", "Campanhas", "Resultados"].map((w) => (
                  <Text key={w} style={[st.stripe, { fontSize: wide ? 32 : 20 }]}>
                    {w}  <Text style={{ color: c.orange, fontSize: wide ? 22 : 15 }}>✦</Text>{"   "}
                  </Text>
                ))}
              </View>
            ))}
          />
        </View>
        <View style={[st.band, { backgroundColor: c.orange, paddingVertical: wide ? 34 : 20, zIndex: 2, transform: [{ translateY: wide ? -30 : -20 }, { rotate: wide ? "-3deg" : "-4deg" }] }]}>
          <Ticker
            speed={22}
            gap={0}
            items={[0, 1].map((k) => (
              <View key={k} style={{ flexDirection: "row", alignItems: "center", gap: 20, paddingRight: 20 }}>
                <Text style={[st.stripe, !wide && { fontSize: 30 }]}>{brand.name}</Text>
                <Rocket />
                <Text style={[st.stripe, !wide && { fontSize: 30 }]}>{brand.slogan}</Text>
                <Rocket />
              </View>
            ))}
          />
        </View>
      </View>
      <View style={{ padding: 20, paddingBottom: 48, gap: 6, width: "100%", maxWidth: 1090, alignSelf: "center" }}>
        <Text style={s.small}>© {new Date().getFullYear()} Howhow. Todos os direitos reservados.</Text>
        <Text style={s.small}>{brand.site} · {brand.instagram} · {brand.contactEmail}</Text>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  float: { position: "absolute", zIndex: 5 },
  balloon: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12, paddingLeft: 12, paddingRight: 20, borderRadius: 22, backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 22, shadowOffset: { width: 0, height: 14 }, elevation: 6, zIndex: 1 },
  tail: { position: "absolute", bottom: -8, width: 16, height: 16, backgroundColor: "#fff", borderRightWidth: 1, borderBottomWidth: 1, borderColor: c.lineStrong, borderBottomRightRadius: 4, transform: [{ rotate: "45deg" }], zIndex: 2 },
  testiCard: { backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 30, padding: 22, gap: 30, overflow: "hidden" },
  testiMark: { position: "absolute", right: 24, top: -10 },
  testiRing: { position: "absolute", top: -7, left: -7, right: -7, bottom: -7, borderWidth: 2, borderColor: c.orange, opacity: 0.25, transform: [{ rotate: "-4deg" }] },
  testiCompany: { position: "absolute", bottom: -12, alignSelf: "center", fontFamily: f.bold, fontSize: 12, color: "#fff", backgroundColor: c.ink, borderRadius: 30, paddingHorizontal: 12, paddingVertical: 6, overflow: "hidden" },
  testiTab: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 18, padding: 12, overflow: "hidden", opacity: 0.6 },
  testiTrack: { position: "absolute", left: 0, right: 0, bottom: 0, height: 3, backgroundColor: c.line, overflow: "hidden" },
  testiBar: { width: "100%", height: 3, backgroundColor: c.orange, transformOrigin: "left" },
  faceOk: { position: "absolute", right: -3, bottom: -3, width: 14, height: 14, borderRadius: 7, backgroundColor: green, borderWidth: 2, borderColor: "#fff", alignItems: "center", justifyContent: "center" },
  stripes: { width: "100%", overflow: "hidden", justifyContent: "center", backgroundColor: "#fff" },
  band: { position: "absolute", left: "-6%", width: "112%" },
  slidePill: { position: "absolute", top: 0, bottom: 0, borderRadius: 40, backgroundColor: c.ink },
  ghost: { fontFamily: f.bold, fontSize: 12, color: c.ink, borderWidth: 1, borderColor: c.lineStrong, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, overflow: "hidden" },
  flowDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: c.lineStrong, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  flowLabel: { fontFamily: f.semibold, fontSize: 9, color: c.muted, textAlign: "center" },
  refund: { backgroundColor: "#fff", borderRadius: 30, padding: 22, gap: 24 },
  refundTag: { fontFamily: f.semibold, fontSize: 13, color: "#1a7a42", backgroundColor: "#dcf5e6", borderRadius: 30, paddingHorizontal: 14, paddingVertical: 6, overflow: "hidden" },
  refundCard: { backgroundColor: c.bg, borderRadius: 20, padding: 18, gap: 10 },
  refundRow: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12 },
  refundValue: { fontFamily: f.bold, fontSize: 24, letterSpacing: -1, color: c.ink },
  billing: { flexDirection: "row", alignSelf: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 40, padding: 4, gap: 4 },
  billingBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 40 },
  hint: { fontFamily: f.bold, fontSize: 11, color: green, backgroundColor: "#dcf5e6", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, overflow: "hidden" },
  trial: { backgroundColor: c.blue, borderRadius: 30, padding: 22, gap: 16 },
  limit: { flex: 1, backgroundColor: c.bg, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10 },
  soon: { fontFamily: f.bold, fontSize: 10, color: c.orange, backgroundColor: c.orangeSoft, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, overflow: "hidden" },
  agencyPrice: { backgroundColor: c.dark2, borderWidth: 1, borderColor: c.darkLine, borderRadius: 20, padding: 20, gap: 12 },
  liveDot: { position: "absolute", top: 0, left: 0, width: 8, height: 8, borderRadius: 4 },
  client: { fontFamily: f.bold, fontSize: 20, letterSpacing: -0.6, color: "#9a9a9a", paddingHorizontal: 18 },
  h3: { fontFamily: f.semibold, fontSize: 26, lineHeight: 30, letterSpacing: -1, color: c.ink },
  caps: { fontFamily: f.bold, fontSize: 11, letterSpacing: 1.6, color: c.muted },
  stat: { backgroundColor: "#fff", borderRadius: 30, padding: 26, gap: 8 },
  statValue: { fontFamily: f.bold, fontSize: 54, lineHeight: 58, letterSpacing: -3 },
  howCard: { backgroundColor: c.bg, borderWidth: 1, borderColor: "#ededed", borderRadius: 30, padding: 16, gap: 16 },
  stepNum: { fontFamily: f.bold, fontSize: 12, color: "#fff", backgroundColor: c.orange, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 3, overflow: "hidden" },
  art: { aspectRatio: 1.3, borderWidth: 1, borderColor: c.lineStrong, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  artCard: { width: "84%", backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: c.line, padding: 14, gap: 7, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: 12 }, elevation: 3 },
  artCaps: { fontFamily: f.bold, fontSize: 10, letterSpacing: 1.4, color: c.muted },
  artLabel: { fontFamily: f.medium, fontSize: 11, color: c.muted },
  artField: { fontFamily: f.semibold, fontSize: 13, backgroundColor: c.bg, borderRadius: 8, padding: 7, overflow: "hidden" },
  seg: { flexDirection: "row", backgroundColor: c.bg, borderRadius: 9, padding: 3, gap: 3 },
  segItem: { flex: 1, textAlign: "center", fontFamily: f.medium, fontSize: 11, paddingVertical: 6, borderRadius: 7, color: c.muted, overflow: "hidden" },
  segOn: { backgroundColor: c.blue, color: "#fff" },
  artCta: { backgroundColor: c.orange, color: "#fff", fontFamily: f.bold, fontSize: 12, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: c.line, borderRadius: 14, padding: 9 },
  av: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  approve: { fontFamily: f.bold, fontSize: 11, color: c.blue, borderWidth: 1, borderColor: c.blue, backgroundColor: c.blueSoft, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5, overflow: "hidden" },
  kpi: { flex: 1, backgroundColor: c.bg, borderRadius: 10, padding: 8 },
  publi: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: c.ink, borderRadius: 14, padding: 12 },
  publiTag: { fontFamily: f.medium, fontSize: 12, color: "#fff", borderWidth: 1, borderColor: c.darkLine, backgroundColor: "#1f2026", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, overflow: "hidden" },
  paid: { fontFamily: f.bold, fontSize: 11, color: green, backgroundColor: "#dcf5e6", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, overflow: "hidden" },
  number: { flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 14 },
  numberValue: { fontFamily: f.bold, fontSize: 26, lineHeight: 30, color: c.orange, letterSpacing: -1 },
  review: { backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 20, padding: 22, gap: 20 },
  quote: { fontFamily: f.semibold, fontSize: 19, lineHeight: 25, letterSpacing: -0.5, color: c.ink },
  tab: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 40, borderWidth: 1, borderColor: c.lineStrong, backgroundColor: "#fff" },
  tabText: { fontFamily: f.semibold, fontSize: 14, color: c.ink2 },
  goalBox: { backgroundColor: c.bg, borderWidth: 1, borderColor: "#ededed", borderRadius: 30, padding: 22, gap: 16 },
  track: { height: 10, borderRadius: 10, backgroundColor: "#fff", overflow: "hidden" },
  plan: { backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 30, padding: 26, gap: 16 },
  badge: { fontFamily: f.semibold, fontSize: 12, color: "#fff", backgroundColor: c.orange, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, overflow: "hidden" },
  price: { fontFamily: f.bold, fontSize: 34, letterSpacing: -1.6, color: c.ink },
  planList: { borderTopWidth: 1, borderColor: c.line, paddingTop: 16, gap: 10 },
  compareHead: { minHeight: 56, borderWidth: 1, borderColor: c.lineStrong, backgroundColor: c.bg, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  compareList: { borderWidth: 1, borderColor: c.line, backgroundColor: c.bg, borderRadius: 15, padding: 18, gap: 14 },
  managed: { backgroundColor: c.dark, borderRadius: 30, padding: 26, gap: 28, overflow: "hidden" },
  managedMark: { position: "absolute", right: -60, bottom: -80, width: 320, height: 320, opacity: 0.06 },
  managedTag: { fontFamily: f.medium, fontSize: 13, color: "#fff", borderWidth: 1, borderColor: c.darkLine, borderRadius: 30, paddingHorizontal: 14, paddingVertical: 6, overflow: "hidden" },
  managedItem: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: c.dark2, borderWidth: 1, borderColor: c.darkLine, borderRadius: 16, padding: 16 },
  tlDot: { width: 40, height: 40, borderRadius: 20, backgroundColor: c.ink, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  faq: { backgroundColor: c.bg, borderWidth: 1, borderColor: c.lineStrong, borderRadius: 30, padding: 12, gap: 10 },
  faqItem: { backgroundColor: "#fff", borderWidth: 1, borderColor: c.lineStrong, borderRadius: 20 },
  faqQ: { flexDirection: "row", alignItems: "center", gap: 14, padding: 18 },
  faqIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.ink, alignItems: "center", justifyContent: "center" },
  form: { backgroundColor: c.ink, borderRadius: 30, padding: 20, gap: 16 },
  label: { fontFamily: f.medium, fontSize: 14, color: "rgba(255,255,255,0.6)" },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 30, borderWidth: 1, borderColor: c.ink2, backgroundColor: "#171717" },
  input: { fontFamily: f.medium, fontSize: 16, color: "#fff", backgroundColor: "#171717", borderWidth: 1, borderColor: c.ink2, borderRadius: 10, padding: 12 },
  creators: { backgroundColor: c.blue, borderRadius: 30, padding: 20, gap: 20 },
  creatorsCover: { width: 110, height: 110 },
  stripe: { fontFamily: f.logo, fontSize: 40, color: "#fff" },
});
