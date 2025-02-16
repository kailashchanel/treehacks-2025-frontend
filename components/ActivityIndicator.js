import React from "react";
import { ActivityIndicator as Loading, View, StyleSheet } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Loading
        style={{ flex: 1, alignItems: "center" }}
        color="#000000"
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.8,
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
