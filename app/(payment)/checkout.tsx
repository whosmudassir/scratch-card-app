import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { getTransactionDetails, getRewardDetails } from "../../api/mockAPI";
import ScratchCard from "@/components/ui/ScratchCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { styles } from "../../styles/paymentSuccessStyles";
import { TransactionDetails, Reward } from "../../types/transaction";

const PaymentSuccessScreen: React.FC = () => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [scratchedRewards, setScratchedRewards] = useState<Set<number>>(
    new Set()
  );
  const [claimedRewards, setClaimedRewards] = useState<Set<number>>(new Set());

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txnData = await getTransactionDetails("12345");
        const rewardData = await getRewardDetails(txnData.transactionId);
        setTransaction(txnData);
        setRewards(rewardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnimationFinish = useCallback(() => {
    Animated.sequence([
      Animated.timing(translateYAnim, {
        toValue: -180,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelectReward = useCallback((reward: Reward) => {
    setSelectedReward(reward);
    scaleAnim.setValue(0.8);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeScratchCard = useCallback(() => {
    setSelectedReward(null);
  }, []);

  const handleScratchComplete = useCallback((rewardId: number) => {
    setScratchedRewards((prev) => new Set(prev).add(rewardId));
  }, []);

  const handleClaimComplete = useCallback((rewardId: number) => {
    setClaimedRewards((prev) => new Set(prev).add(rewardId));
  }, []);

  const renderRewards = useMemo(
    () => (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.rewardScrollContainer}
      >
        {rewards.map((reward) => (
          <TouchableOpacity
            key={reward.rewardId}
            onPress={() => handleSelectReward(reward)}
            activeOpacity={0.8}
            style={styles.rewardItem}
          >
            {claimedRewards.has(reward.rewardId) ? (
              <View style={styles.claimedBox}>
                <Text style={styles.claimedText}>Claimed</Text>
              </View>
            ) : scratchedRewards.has(reward.rewardId) ? (
              <View style={styles.unclaimedBox}>
                <Text style={styles.unclaimedText}>Unclaimed</Text>
              </View>
            ) : (
              <Image
                source={require("../../assets/images/gift-pattern.jpg")}
                style={styles.scratchCardImage}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    [rewards, claimedRewards, scratchedRewards, handleSelectReward]
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.lottieWrapper,
          { transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <LottieView
          source={require("../../assets/images/payment-success.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={handleAnimationFinish}
        />
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeInAnim }]}>
        {transaction && (
          <View style={styles.transactionCard}>
            <View style={styles.transactionDetails}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>₹{transaction.amount}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.detailLabel}>Merchant</Text>
              <Text style={styles.detailValue}>{transaction.merchantName}</Text>
            </View>
            <View style={[styles.transactionDetails, { borderBottomWidth: 0 }]}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{transaction.timestamp}</Text>
            </View>
          </View>
        )}
        <Text style={styles.rewardText}>
          🎉 You have {rewards.length} rewards!
        </Text>
        {renderRewards}
      </Animated.View>

      <Modal visible={!!selectedReward} transparent animationType="fade">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Pressable style={styles.modalBackground} onPress={closeScratchCard}>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              {selectedReward && (
                <ScratchCard
                  onScratchComplete={() =>
                    handleScratchComplete(selectedReward.rewardId)
                  }
                  onClaimComplete={() =>
                    handleClaimComplete(selectedReward.rewardId)
                  }
                  selectedReward={selectedReward}
                  claimedRewards={Array.from(claimedRewards)}
                  scratchedRewards={Array.from(scratchedRewards)}
                />
              )}
            </Animated.View>
          </Pressable>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default PaymentSuccessScreen;
