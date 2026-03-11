import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import { SymbolView } from "expo-symbols";
import { SquircleView } from "@/components/base/squircle-view";
import { SeekBar } from "@/components/molecules/seek-bar/SeekBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AnimatedView = Animated.createAnimatedComponent(View);

const ICONS = [
  { name: "wifi", color: "#007AFF" },
  { name: "bolt.fill", color: "#34C759" },
  { name: "bell.fill", color: "#FF3B30" },
  { name: "moon.fill", color: "#5856D6" },
];

export default function IconExample(): React.JSX.Element {
  const progress = useSharedValue<number>(0);

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(progress.value, [0, 1], [0, 30]),
    };
  });

  const cornerRadius = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 30]),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.compareRow}>
          <View style={styles.column}>
            <Text style={styles.label}>NORMAL VIEW</Text>

            <View style={styles.iconRow}>
              {ICONS.map((item, i) => (
                <AnimatedView
                  key={i}
                  style={[
                    styles.box,
                    { backgroundColor: item.color },
                    animatedViewStyle,
                  ]}
                >
                  <SymbolView
                    name={item.name as any}
                    size={28}
                    tintColor="white"
                    type="hierarchical"
                  />
                </AnimatedView>
              ))}
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>SQUIRCLE VIEW</Text>

            <View style={styles.iconRow}>
              {ICONS.map((item, i) => (
                <SquircleView
                  key={i}
                  width={94}
                  height={94}
                  backgroundColor={item.color}
                  style={styles.box}
                  cornerRadius={cornerRadius}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SymbolView
                      name={item.name as any}
                      size={28}
                      tintColor="white"
                      type="hierarchical"
                    />
                  </View>
                </SquircleView>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.slider}>
          <SeekBar
            value={0}
            onValueChange={(v) => {
              progress.value = v;
            }}
            showThumb={true}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },

  compareRow: {
    flexDirection: "row",
    gap: 40,
  },

  column: {
    alignItems: "center",
    gap: 16,
  },

  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    letterSpacing: 1,
  },

  iconRow: {
    gap: 16,
  },

  box: {
    width: 94,
    height: 94,
    alignItems: "center",
    justifyContent: "center",
  },

  slider: {
    top: 50,
  },
});
