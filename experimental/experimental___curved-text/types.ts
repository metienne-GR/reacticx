import type { StyleProp, ViewStyle } from "react-native";

type Direction = "left" | "right";

interface ICurvedMarquee {
  readonly text?: string;
  readonly speed?: number;
  readonly curve?: number;
  readonly direction?: Direction;
  readonly textColor?: string;
  readonly fontSize?: number;
  readonly copies?: number;
  readonly style?: StyleProp<Required<ViewStyle>>;
}

export type { ICurvedMarquee, Direction };
