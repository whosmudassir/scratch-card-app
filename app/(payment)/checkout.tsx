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
import { getRewardDetails, claimReward } from "../../api/mockAPI";
import ScratchCard from "@/components/ui/ScratchCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { styles } from "../../styles/paymentSuccessStyles";
import { Reward } from "../../types/transaction";
import { useTransaction } from "../../context/TransactionContext";

const PaymentSuccessScreen: React.FC = () => {
  const { transaction, isTransactionLoading, isTransactionError } =
    useTransaction();

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingReward, setClaimingReward] = useState<boolean>(false);
  const [claimError, setClaimError] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [scratchedRewards, setScratchedRewards] = useState<Set<string>>(
    new Set()
  );
  const [claimedRewards, setClaimedRewards] = useState<Set<string>>(new Set());

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!transaction || isTransactionError) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const rewardData: Reward[] = await getRewardDetails(
          transaction.transactionId
        );
        setRewards(rewardData);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transaction, isTransactionError]);

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
    setClaimError(false);
  }, []);

  const handleScratchComplete = useCallback((rewardId: string) => {
    setScratchedRewards((prev) => new Set(prev).add(rewardId));
  }, []);

  const handleClaimComplete = useCallback(
    async (rewardId: string) => {
      if (!transaction) return;

      setClaimError(false);
      setClaimingReward(true);

      try {
        const response = await claimReward(
          rewardId.toString(),
          transaction.transactionId
        );

        if (response?.status === "SUCCESS") {
          setClaimedRewards((prev) => new Set([...prev, rewardId]));
        } else {
          setClaimError(true);
        }
      } catch (error) {
        console.error("Error claiming reward:", error);
        setClaimError(true);
      } finally {
        setClaimingReward(false);
      }
    },
    [transaction]
  );

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

  if (isTransactionLoading || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (isTransactionError || !transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading transaction details.</Text>
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
                  claimingReward={claimingReward}
                  claimError={claimError}
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
