import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurvedMarquee } from "@/components/organisms/curved-marquee";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <CurvedMarquee />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
