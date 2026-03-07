import React from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dock, type IDockItem } from "@/components/organisms/mobile-dock";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

function LogoIcon({ url }: { url: string }) {
  return (
    <View style={styles.iconContainer}>
      <Image source={{ uri: url }} style={styles.iconImage} />
    </View>
  );
}

const LOGOS = [
  {
    appName: "X",
    url: "https://cdn.brandfetch.io/idS5WhqBbM/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768324401335",
  },
  {
    appName: "Github",
    url: "https://img.icons8.com/?size=1000&id=efFfwotdkiU5&format=png&color=000000",
  },
  {
    appName: "Reddit",
    url: "https://cdn.brandfetch.io/idkKwm0IT0/w/1000/h/1000/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768324678544",
  },
  {
    appName: "Discord",
    url: "https://static.vecteezy.com/system/resources/previews/006/892/625/non_2x/discord-logo-icon-editorial-free-vector.jpg",
  },
  {
    appName: "Pinterest",
    url: "https://www.citypng.com/public/uploads/preview/apple-pinterest-app-icon-logo-flat-701751695135779qsb0o42acw.png?v=2025091511",
  },
  {
    appName: "Airbnb",
    url: "https://framerusercontent.com/images/7bkn2MV652JLUJYl05zd0gF13g.png?width=460&height=460",
  },
  {
    appName: "Apple Music",
    url: "https://cdn.brandfetch.io/id_yBTuraI/w/800/h/800/theme/light/symbol.png?c=1bxid64Mup7aczewSAYMX&t=1715866792263",
  },
];

const items: IDockItem[] = LOGOS.map((logo) => ({
  icon: <LogoIcon url={logo.url} />,
  label: logo.appName,
  onPress: () => Alert.alert(`${logo.appName} pressed`),
}));

export default function DockDemoScreen() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
              },
            ]}
          >
            Love Reacticx?
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                fontFamily: fontLoaded ? "SfProRounded" : undefined,
              },
            ]}
          >
            Explore the magic of Reacticx with this interactive mobile dock
            demo.
          </Text>
        </View>

        <View style={styles.dockArea}>
          <Dock
            items={items}
            mass={0.9}
            damping={25}
            stiffness={250}
            size={40}
            height={60}
            dockColor={"#1a1a1a"}
            paddingBottom={8}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#121212",
  },

  safe: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#86868b",
    textAlign: "center",
    lineHeight: 22,
  },

  dockArea: {
    paddingBottom: 24,
    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  iconImage: {
    width: "100%",
    height: "100%",
  },
});
