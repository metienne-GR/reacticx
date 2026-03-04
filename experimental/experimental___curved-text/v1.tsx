import React, { useMemo, memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useFrameCallback,
  type FrameInfo,
} from "react-native-reanimated";
import SVG, {
  Defs,
  Path,
  Text,
  TextPath,
  type TextPathProps,
} from "react-native-svg";
import type { ICurvedMarquee } from "./types";

const AnimatedTextPath = Animated.createAnimatedComponent<
  Partial<TextPathProps> & React.ComponentProps<typeof TextPath>
>(TextPath);

export const CurvedMarquee: React.FC<Partial<ICurvedMarquee>> &
  React.FunctionComponent<Partial<ICurvedMarquee>> = memo<
  Partial<ICurvedMarquee>
>(
  memo<Partial<ICurvedMarquee>>(
    memo<Partial<ICurvedMarquee>>(
      ({
        text: marqueeText = "React Native + Expo + SVG ❤️",
        speed = 500,
        curve = 300,
        direction = "left",
        textColor = "#ffffff",
        fontSize = 100,
        copies = 50,
        style,
      }: React.ComponentProps<typeof CurvedMarquee>):
        | (React.ReactElement & React.JSX.Element & React.ReactNode)
        | null => {
        const offset = useSharedValue<number>(0);
        const text = useMemo<string>(() => {
          const hasTrailing = /\s|\u00A0$/.test(marqueeText);
          return (
            (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) +
            "\u00A0"
          );
        }, [marqueeText]);

        const spacing = useMemo<number>(() => {
          return text.length * 2 * (fontSize * 1.6);
        }, [text, fontSize]);

        const pathId = useMemo<string>(
          () => `curved-path-${Math.random().toString(36).slice(2)}`,
          [],
        );
        const pathD = useMemo<string>(
          () => `M-100,40 Q500,${40 + curve} 1000,40`,
          [curve],
        );
        const totalText = useMemo<string>(() => {
          const numCopies = Math.max(copies, Math.ceil(1000 / spacing) + 2);
          return Array(numCopies).fill(text).join("");
        }, [text, spacing, copies]);

        useFrameCallback((frameInfo: FrameInfo) => {
          "worklet";
          if (spacing === 0) return;

          const deltaTime = frameInfo.timeSincePreviousFrame ?? 16;
          const distance = (speed * deltaTime) / 1000;

          if (direction === "left") {
            offset.value -= distance;
            if (offset.value <= -spacing) {
              offset.value += spacing;
            }
          } else {
            offset.value += distance;
            if (offset.value >= 0) {
              offset.value -= spacing;
            }
          }
        }, spacing > 0);
        const animatedProps = useAnimatedProps<
          Required<Partial<Pick<TextPathProps, "startOffset">>>
        >(() => {
          "worklet";
          return {
            startOffset: offset.value,
          };
        });

        if (spacing === 0) {
          return <View style={styles.container} />;
        }

        return (
          <View
            style={[
              styles.container,
              style ?? {
                height: 400,
                overflow: "hidden",
              },
            ]}
          >
            <SVG
              width="100%"
              height="100%"
              viewBox={`0 0 1000 ${fontSize}`}
              style={styles.svg}
              key={curve}
            >
              <Defs>
                <Path id={pathId} d={pathD} fill="none" stroke="transparent" />
              </Defs>
              <Text fill={textColor} fontSize={fontSize}>
                <AnimatedTextPath
                  href={`#${pathId}`}
                  animatedProps={animatedProps}
                >
                  {totalText}
                </AnimatedTextPath>
              </Text>
            </SVG>
          </View>
        );
      },
    ),
  ),
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  svg: {
    overflow: "visible",
  },
});

export default memo<
  React.FC<ICurvedMarquee> & React.FunctionComponent<ICurvedMarquee>
>(CurvedMarquee);
