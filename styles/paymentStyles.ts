import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingVertical: 50,
    borderRadius: 12,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  merchant: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
