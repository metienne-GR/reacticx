/**
 *  NOTE:
 * All files inside the `experimental` folder are not intended to be used as part of Reacticx.
 * This also does not imply that they will be released into the main project.
 * These files exist purely for experimentation—to explore, test, and validate new ideas and concepts.
 */

import {
  Extrapolate,
  rect,
  rrect,
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Image,
  Paint,
  RoundedRect,
  SkImage,
} from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";

const AVATAR_SIZE = 150;
const BLUR_HEIGHT = 50;
const MAX_SCROLL_Y = 120;
const CANVAS_HEIGHT = 300;
const DYNAMIC_ISLAND_WIDTH = 28;
const DYNAMIC_ISLAND_HEIGHT = 28;

interface AnimationValues {
  avatarWidth: SharedValue<number>;
  avatarPositionX: SharedValue<number>;
  avatarPositionY: SharedValue<number>;
  currentScrollY: SharedValue<number>;
  blurRadius: SharedValue<number>;
  overlayTint: SharedValue<string>;
  avatarBounds: SharedValue<ReturnType<typeof rrect>>;
  colorTransform: SharedValue<number[]>;
  headerOpacity: SharedValue<number>;
}

interface AnimatedAvatarCanvasProps {
  scrollY: SharedValue<number>;
  screenWidth: number;
  avatarImage: SkImage | null;
}

function useAnimationValues(
  screenWidth: number,
  scrollY: SharedValue<number>,
): AnimationValues {
  const avatarWidth = useSharedValue(AVATAR_SIZE);
  const avatarPositionX = useSharedValue((screenWidth - AVATAR_SIZE) / 2);
  const avatarPositionY = useSharedValue(MAX_SCROLL_Y);
  const blurRadius = useSharedValue(0);
  const overlayTint = useSharedValue("transparent");
  const headerOpacity = useSharedValue(0);

  const avatarBounds = useDerivedValue(() =>
    rrect(
      rect(
        avatarPositionX.value,
        avatarPositionY.value,
        avatarWidth.value,
        avatarWidth.value,
      ),
      avatarWidth.value / 2,
      avatarWidth.value / 2,
    ),
  );

  const colorTransform = useDerivedValue(() => {
    return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 30, -15];
  });

  useDerivedValue(() => {
    avatarWidth.value = interpolate(
      scrollY.value,
      [0, MAX_SCROLL_Y * 0.25],
      [AVATAR_SIZE, DYNAMIC_ISLAND_WIDTH],
      { extrapolateRight: Extrapolate.CLAMP },
    );

    avatarPositionX.value = (screenWidth - avatarWidth.value) / 2;

    avatarPositionY.value = interpolate(
      scrollY.value,
      [0, MAX_SCROLL_Y * 0.3, MAX_SCROLL_Y],
      [MAX_SCROLL_Y, 18, 8],
      { extrapolateRight: Extrapolate.CLAMP },
    );

    blurRadius.value = interpolate(
      scrollY.value,
      [0, MAX_SCROLL_Y * 0.1, MAX_SCROLL_Y * 0.4],
      [0, 4, 12, 22],
      { extrapolateRight: Extrapolate.CLAMP },
    );

    overlayTint.value = interpolateColor(
      scrollY.value,
      [0, MAX_SCROLL_Y * 0.3],
      ["transparent", "#000"],
    );

    headerOpacity.value = interpolate(
      scrollY.value,
      [20, MAX_SCROLL_Y - 10],
      [0, 1],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
  });

  return {
    avatarWidth,
    avatarPositionX,
    avatarPositionY,
    currentScrollY: scrollY,
    blurRadius,
    overlayTint,
    avatarBounds,
    colorTransform,
    headerOpacity,
  };
}

function useAnimatedCanvasStyle(scrollY: SharedValue<number>) {
  return useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, MAX_SCROLL_Y], [CANVAS_HEIGHT, 0]),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, MAX_SCROLL_Y],
          [0, MAX_SCROLL_Y],
        ),
      },
    ],
  }));
}

export const AnimatedAvatarCanvas: React.FC<AnimatedAvatarCanvasProps> = ({
  scrollY,
  screenWidth,
  avatarImage,
}) => {
  const animationValues = useAnimationValues(screenWidth, scrollY);
  const canvasStyle = useAnimatedCanvasStyle(scrollY);

  const {
    avatarWidth,
    avatarPositionX,
    avatarPositionY,
    blurRadius,
    overlayTint,
    avatarBounds,
    colorTransform,
  } = animationValues;

  return (
    <Animated.View style={canvasStyle}>
      <Canvas style={styles.canvas}>
        <Group
          layer={
            <Paint>
              <Blur blur={blurRadius} />
              <ColorMatrix matrix={colorTransform.value} />
            </Paint>
          }
        >
          <Group clip={avatarBounds}>
            <Image
              image={avatarImage}
              height={avatarWidth}
              width={avatarWidth}
              fit="cover"
              x={avatarPositionX}
              y={avatarPositionY}
            />
            <Circle
              r={avatarWidth}
              cx={avatarPositionX.value + avatarWidth.value / 2}
              cy={avatarPositionY.value + avatarWidth.value / 2}
              color={overlayTint}
            />
          </Group>
          <RoundedRect
            r={50}
            width={DYNAMIC_ISLAND_WIDTH}
            height={DYNAMIC_ISLAND_HEIGHT}
            x={(screenWidth - DYNAMIC_ISLAND_WIDTH) / 2}
            y={18}
          />
        </Group>
      </Canvas>
    </Animated.View>
  );
};

export function useAvatarAnimationHeaderOpacity(
  screenWidth: number,
  scrollY: SharedValue<number>,
) {
  return useAnimationValues(screenWidth, scrollY).headerOpacity;
}

export {
  AVATAR_SIZE,
  BLUR_HEIGHT,
  MAX_SCROLL_Y,
  CANVAS_HEIGHT,
  DYNAMIC_ISLAND_WIDTH,
  DYNAMIC_ISLAND_HEIGHT,
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});
