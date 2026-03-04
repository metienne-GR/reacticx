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
    ({
      text: marqueeText = "React Native + Expo + SVG ❤️",
      speed = 500,
      curve = 250,
      direction = "left",
      textColor = "#ffffff",
      fontSize = 100,
      copies = 50,
      style,
    }: React.ComponentProps<typeof CurvedMarquee>) => {
      const offset = useSharedValue<number>(0);

      const text = useMemo(() => {
        const hasTrailing = /\s|\u00A0$/.test(marqueeText);
        return (
          (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) +
          "\u00A0"
        );
      }, [marqueeText]);

      const spacing = useMemo(() => {
        return text.length * (fontSize * 1.6);
      }, [text, fontSize]);

      const pathId = useMemo(
        () => `curved-path-${Math.random().toString(36).slice(2)}`,
        [],
      );

      /**
       * ✅ Loop path fully inside viewBox
       */
      const pathD = useMemo(
        () => `
          M 0 ${curve}
          Q 500 ${-curve} 1000 ${curve}
          Q 500 ${curve * 3} 0 ${curve}
        `,
        [curve],
      );

      const totalText = useMemo(() => {
        const numCopies = Math.max(copies, Math.ceil(1000 / spacing) + 2);
        return Array(numCopies).fill(text).join("");
      }, [text, spacing, copies]);

      useFrameCallback((frameInfo: FrameInfo) => {
        "worklet";
        if (!spacing) return;

        const deltaTime = frameInfo.timeSincePreviousFrame ?? 16;
        const distance = (speed * deltaTime) / 1000;

        offset.value += direction === "left" ? -distance : distance;

        if (offset.value <= -spacing) offset.value += spacing;
        if (offset.value >= 0) offset.value -= spacing;
      }, spacing > 0);

      const animatedProps = useAnimatedProps<
        Required<Partial<Pick<TextPathProps, "startOffset">>>
      >(() => ({
        startOffset: offset.value,
      }));

      if (!spacing) return <View style={styles.container} />;

      /**
       * 🔑 REAL SVG BOUNDS
       */
      const viewBoxHeight = curve * 4;

      return (
        <View
          style={[
            styles.container,
            style ?? {
              height: viewBoxHeight,
            },
          ]}
        >
          <SVG
            width="100%"
            height="100%"
            viewBox={`0 0 1000 ${viewBoxHeight}`}
            style={styles.svg}
          >
            <Defs>
              <Path id={pathId} d={pathD} fill="none" />
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
