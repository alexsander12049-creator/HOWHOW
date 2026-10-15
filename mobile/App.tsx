import { useCallback, useRef, useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import { brand, nav, navCta } from "./src/content";
import { images } from "./src/images";
import { c, f } from "./src/theme";
import { Button, LogoRocket, useLayout } from "./src/ui";
import {
  Clients, Compare, Contact, Faq, Footer, Goals, Hero, Managed, Plans, Refund, Scale, Showcase, Start, Steps, Stories,
} from "./src/sections";

export default function App() {
  const [fontsLoaded] = useFonts({ Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, RussoOne_400Regular });
  const scroll = useRef<ScrollView>(null);
  const positions = useRef<Record<string, number>>({});
  const [menu, setMenu] = useState(false);
  const [launch, setLaunch] = useState(0); // cada aumento faz o foguete do logo decolar
  const { wide } = useLayout();

  const mark = useCallback((id: string) => (y: number) => {
    positions.current[id] = y;
  }, []);
  const go = useCallback((id: string) => {
    setMenu(false);
    const y = positions.current[id];
    if (y !== undefined) scroll.current?.scrollTo({ y: Math.max(0, y - 10), animated: true });
  }, []);
  // links do site com caminho relativo ("/marcas", "/termos-de-uso") abrem no site publicado
  const openSite = useCallback((url: string) => {
    Linking.openURL(url.startsWith("/") ? `https://${brand.site}${url}` : url).catch(() => {});
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={[styles.root, { alignItems: "center", justifyContent: "center" }]}>
        <Image source={images.foguete} style={{ width: 64, height: 64 }} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={["top"]}>
        <StatusBar style="dark" />

        <View style={[styles.nav, wide && styles.navWide]}>
          <View style={styles.navRow}>
            <Pressable
              style={styles.logo}
              onHoverIn={() => setLaunch((n) => n + 1)}
              onPress={() => {
                setLaunch((n) => n + 1);
                scroll.current?.scrollTo({ y: 0, animated: true });
              }}
            >
              <LogoRocket trigger={launch} />
              <Text style={styles.logoText}>{brand.name}</Text>
            </Pressable>
            {wide && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 22 }}>
                {nav.map((l) => (
                  <Pressable key={l.href} onPress={() => go(l.href.slice(1))}>
                    <Text style={styles.navLink}>{l.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            {wide ? (
              <Button label={navCta.label} onPress={() => go(navCta.href.slice(1))} />
            ) : (
            <Pressable
              accessibilityLabel={menu ? "Fechar menu" : "Abrir menu"}
              style={styles.burger}
              onPress={() => setMenu((v) => !v)}
            >
              <View style={[styles.bar, menu ? { top: 19, transform: [{ rotate: "45deg" }] } : { top: 14 }]} />
              <View style={[styles.bar, menu ? { top: 19, transform: [{ rotate: "-45deg" }] } : { top: 24 }]} />
            </Pressable>
            )}
          </View>
          {menu && !wide && (
            <View style={styles.menu}>
              {nav.map((l) => (
                <Pressable key={l.href} onPress={() => go(l.href.slice(1))}>
                  <Text style={styles.menuItem}>{l.label}</Text>
                </Pressable>
              ))}
              <Button label={navCta.label} onPress={() => go(navCta.href.slice(1))} full />
            </View>
          )}
        </View>

        <ScrollView ref={scroll} contentContainerStyle={{ paddingTop: 90 }} keyboardShouldPersistTaps="handled">
          <Hero go={go} />
          <Clients />
          <Scale />
          <Steps go={go} mark={mark} />
          <Showcase />
          <Stories mark={mark} />
          <Goals go={go} mark={mark} />
          <Refund />
          <Plans go={go} mark={mark} />
          <Compare />
          <Managed go={go} mark={mark} />
          <Start go={go} />
          <Faq mark={mark} />
          <Contact mark={mark} />
          <Footer go={go} mark={mark} openSite={openSite} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  nav: {
    position: "absolute", zIndex: 10, top: 12, left: 16, right: 16, marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.94)", borderRadius: 20, borderWidth: 1, borderColor: "#fff",
    padding: 12, paddingLeft: 16, gap: 20,
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 6,
  },
  navWide: { left: "50%", right: undefined, width: 720, marginLeft: -360 },
  navLink: { fontFamily: f.medium, fontSize: 15, color: c.ink2 },
  navRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoText: { fontFamily: f.logo, fontSize: 22, color: c.ink },
  burger: { width: 40, height: 40, borderRadius: 10, backgroundColor: c.ink },
  bar: { position: "absolute", left: 10, width: 20, height: 2, borderRadius: 2, backgroundColor: "#fff" },
  menu: { gap: 18, paddingBottom: 4 },
  menuItem: { fontFamily: f.semibold, fontSize: 24, letterSpacing: -0.5, color: c.ink },
});
