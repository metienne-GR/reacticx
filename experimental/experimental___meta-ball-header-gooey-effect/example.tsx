import * as React from "react";
import {
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useImage } from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import Router, { Stack } from "expo-router";

import {
  AVATAR_SIZE,
  BLUR_HEIGHT,
  CANVAS_HEIGHT,
  DYNAMIC_ISLAND_HEIGHT,
  DYNAMIC_ISLAND_WIDTH,
  MAX_SCROLL_Y,
  AnimatedAvatarCanvas,
  useAvatarAnimationHeaderOpacity,
} from "../experimental/experimental___meta-ball-header-gooey-effect/index";

const AVATAR_IMAGE_URL = "https://i.pravatar.cc/300";
function AnimatedHeader({
  headerOpacity,
  headerTitle,
  headerSubtitle,
  onBackPress,
}: {
  headerOpacity: SharedValue<number>;
  headerTitle: string;
  headerSubtitle?: string;
  onBackPress?: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      headerOpacity.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View style={[styles.headerContainer, animatedStyle]}>
      {onBackPress && (
        <Pressable onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      )}
      <View style={styles.headerCenter}>
        <Text style={styles.headerText}>{headerTitle}</Text>
        {headerSubtitle ? (
          <Text style={styles.headerSubtext}>{headerSubtitle}</Text>
        ) : null}
      </View>
    </Animated.View>
  );
}

export default function UserSettings() {
  const avatarImage = useImage(AVATAR_IMAGE_URL);
  const { width: screenWidth } = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const headerOpacity = useAvatarAnimationHeaderOpacity(screenWidth, scrollY);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const scrollYOffSet = event.contentOffset.y;

      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.root}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "User Settings",
          freezeOnBlur: true,
          animationTypeForReplace: "pop",
        }}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AnimatedAvatarCanvas
          scrollY={scrollY}
          screenWidth={screenWidth}
          avatarImage={avatarImage}
        />
        <View style={styles.placeholder}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.placeholderRow}>
              <Text style={styles.placeholderText}>Setting item {i + 1}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 60,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 96,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 50,
  },
  backText: {
    fontSize: 24,
    color: "#007AFF",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  placeholder: {
    padding: 16,
  },
  placeholderRow: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: "#333",
  },
});
