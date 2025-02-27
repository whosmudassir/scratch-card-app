import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTransactionDetails } from "../../api/mockAPI";
import { styles } from "../../styles/paymentStyles";
import { TransactionDetails } from "@/types/transaction";

const PaymentScreen = () => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchTransaction = async () => {
      const details = await getTransactionDetails("txn_12345");
      setTransaction(details);
    };

    fetchTransaction();
  }, []);

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Amount to be Paid</Text>
        <Text style={styles.merchant}>
          Merchant: {transaction.merchantName}
        </Text>
        <Text style={styles.amount}>Amount: ₹{transaction.amount}</Text>
        <Text style={styles.timestamp}>Date: {transaction.timestamp}</Text>
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
