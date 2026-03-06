import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { SFSymbol, SymbolView } from "expo-symbols";
import { SpectralWave } from "@/components/organisms/spectral-wave";

const C = {
  bg: "#0f0f0f",
  surface: "#111",
  border: "#1c1c1c",
  text: "#fff",
  sub: "#666",
  dim: "#333",
};

export default function HomeScreen() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const font = fontLoaded ? "HelveticaNowDisplay" : undefined;
  const fontRound = fontLoaded ? "SfProRounded" : undefined;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.logo, { fontFamily: fontRound }]}>Studio</Text>
          <Pressable style={styles.profileBtn}>
            <SymbolView name="person.circle" size={24} tintColor="#fff" />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { fontFamily: font }]}>
            Create something{"\n"}beautiful today.
          </Text>
        </View>

        <View style={styles.ctaWrap}>
          <SpectralWave
            width={280}
            height={52}
            borderRadius={100}
            asChild
            timeScale={1.5}
            colors={["#000", "#c7d2fe", "#fbcfe8"]}
          >
            <View style={styles.ctaInner}>
              <SymbolView name="wand.and.stars" size={16} tintColor="#fff" />
              <Text style={[styles.ctaText, { fontFamily: fontRound }]}>
                Generate
              </Text>
            </View>
          </SpectralWave>
        </View>

        <View style={styles.quickRow}>
          <Pressable style={styles.quickItem}>
            <SymbolView name="photo" size={18} tintColor="#888" />
            <Text style={[styles.quickLabel, { fontFamily: fontRound }]}>
              Import
            </Text>
          </Pressable>
          <View style={styles.quickDivider} />
          <Pressable style={styles.quickItem}>
            <SymbolView name="paintbrush.pointed" size={18} tintColor="#888" />
            <Text style={[styles.quickLabel, { fontFamily: fontRound }]}>
              Edit
            </Text>
          </Pressable>
          <View style={styles.quickDivider} />
          <Pressable style={styles.quickItem}>
            <SymbolView name="crop" size={18} tintColor="#888" />
            <Text style={[styles.quickLabel, { fontFamily: fontRound }]}>
              Resize
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.section, { fontFamily: fontRound }]}>Recent</Text>

        {[
          { title: "Coastal morning", time: "2m ago", icon: "photo.fill" },
          { title: "Portrait study", time: "1h ago", icon: "person.fill" },
          { title: "Product mockup", time: "3h ago", icon: "cube.fill" },
        ].map((item, i) => (
          <Pressable key={i} style={styles.listItem}>
            <View style={styles.listIcon}>
              <SymbolView
                name={item.icon as SFSymbol}
                size={16}
                tintColor="#555"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.listTitle, { fontFamily: fontRound }]}>
                {item.title}
              </Text>
              <Text style={[styles.listSub, { fontFamily: fontRound }]}>
                {item.time}
              </Text>
            </View>
            <SymbolView name="chevron.right" size={11} tintColor="#333" />
          </Pressable>
        ))}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    fontSize: 18,
    color: C.text,
    letterSpacing: -0.3,
  },
  profileBtn: {
    opacity: 0.6,
  },

  hero: {
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 32,
    color: C.text,
    letterSpacing: -0.8,
    lineHeight: 38,
  },

  ctaWrap: {
    alignItems: "center",
    marginBottom: 40,
  },
  ctaInner: {
    width: 270,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },

  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 14,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: C.border,
  },
  quickItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    gap: 6,
  },
  quickLabel: {
    fontSize: 12,
    color: C.sub,
  },
  quickDivider: {
    width: 1,
    height: 28,
    backgroundColor: C.border,
  },

  section: {
    fontSize: 13,
    color: C.sub,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 14,
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 15,
    color: C.text,
  },
  listSub: {
    fontSize: 12,
    color: C.sub,
    marginTop: 1,
  },
});
