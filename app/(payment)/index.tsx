import { useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransaction } from "../../context/TransactionContext"; // Adjust path
import { styles } from "../../styles/paymentStyles";

const PaymentScreen = () => {
  const {
    transaction,
    isTransactionLoading,
    isTransactionError,
    fetchTransaction,
  } = useTransaction();
  const router = useRouter();

  useEffect(() => {
    fetchTransaction("txn_12345");
  }, []);

  if (isTransactionLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  if (isTransactionError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to get transaction details.</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => fetchTransaction("txn_12345")}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Amount to be Paid</Text>
        <Text style={styles.merchant}>
          Merchant: {transaction?.merchantName}
        </Text>
        <Text style={styles.amount}>Amount: ₹{transaction?.amount}</Text>
        <Text style={styles.timestamp}>Date: {transaction?.timestamp}</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.buttonText}>Proceed with Payment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
