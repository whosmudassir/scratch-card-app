import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, StyleSheet } from "react-native";

export default function ClaimButton({ onPress }) {
  const translateY = useRef(new Animated.Value(50)).current; // Start offscreen
  const opacity = useRef(new Animated.Value(0)).current; // Start invisible

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0, // Move into view
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, // Fade in
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.buttonContainer, { opacity, transform: [{ translateY }] }]}
    >
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Claim Reward</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
