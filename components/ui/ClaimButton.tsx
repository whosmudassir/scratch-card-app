import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface ClaimButtonProps {
  onPress: () => void;
  isLoading: boolean;
  error?: boolean;
}

export default function ClaimButton({
  onPress,
  isLoading,
  error,
}: ClaimButtonProps) {
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
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Claim Reward</Text>
        )}
      </Pressable>
      {error && (
        <Text style={styles.errorText}>Failed to claim, try again</Text>
      )}
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
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
  disabledButton: {
    backgroundColor: "#aaa", // Gray out when disabled
    opacity: 0.6,
  },
});
