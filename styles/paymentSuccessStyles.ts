import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  claimedBox: {
    width: 120,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  claimedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  unclaimedBox: {
    width: 120,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  unclaimedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  rewardScrollContainer: {
    marginTop: 10,
  },
  rewardItem: {
    marginRight: 10,
    alignItems: "center",
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 26,
    borderRadius: 10,

    width: "90%",
    alignSelf: "center",
    marginTop: 80,
  },

  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 40,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  lottieWrapper: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  content: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    // backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginTop: 20,
  },
  rewardContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  scratchCardImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
