import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StaggeredText } from "@/components/organisms/staggered-text";

const TEXTS: string[] = [
  "Do you love Reacticx!",
  "Isn't it amazing?",
  "Try it out now!",
];

export default function App(): React.ReactElement {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StaggeredText
        texts={TEXTS}
        activeIndex={index}
        fontSize={35}
        color="#ffffff"
        letterSpacing={0.5}
        staggerFrom="leading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0e",
    justifyContent: "center",
    alignItems: "center",
  },
});
