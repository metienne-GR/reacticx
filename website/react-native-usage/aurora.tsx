import Aurora from "@/components/molecules/aurora";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App(): React.ReactNode &
  React.JSX.Element &
  React.ReactElement {
  return (
    <View style={stylez.container}>
      <Aurora />
    </View>
  );
}

const stylez = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 50,
  },
  text: {
    fontSize: 34,
  },
});
