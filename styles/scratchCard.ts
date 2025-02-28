import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "50%",
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  canvas: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  alreadyClaimedContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    // backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 10, // Ensures it's above the Canvas
    // elevation: 5, // Adds shadow on Android
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 10, // Ensures it's above the Canvas
    // elevation: 5, // Adds shadow on Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  alreadyClaimedText: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
  },
  lottie: {
    // position: "absolute",
    // top: "5%",
    // left: "2%",
    // width: 400,
    // height: 700,
    // zIndex: 11,
    ...StyleSheet.absoluteFillObject, // Covers entire screen
    // zIndex: 10, // Ensures it appears above everything
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
});
