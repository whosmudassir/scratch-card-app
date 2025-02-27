import { TransactionDetails } from "../types/transaction";

export const getTransactionDetails = async (
  transactionId: string
): Promise<TransactionDetails> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactionId,
        amount: 500,
        merchantName: "Amazon",
        timestamp: new Date().toLocaleDateString(),
        status: "SUCCESS",
      });
    }, 1000);
  });
};

export const getRewardDetails = async (transactionId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          rewardId: "1",
          amount: 50,
          type: "CASHBACK",
          expiryDate: "2025-12-31",
        },
        {
          rewardId: "2",
          amount: 100,
          type: "CASHBACK",
          expiryDate: "2025-12-31",
        },
        {
          rewardId: "3",
          amount: 560,
          type: "CASHBACK",
          expiryDate: "2025-12-31",
        },
        {
          rewardId: "4",
          amount: 750,
          type: "CASHBACK",
          expiryDate: "2025-12-31",
        },
      ]);
    }, 1000);
  });
};

export const claimReward = async (rewardId: string, transactionId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "SUCCESS",
        message: "Reward claimed successfully!",
        claimId: "claim-123",
      });
    }, 1000);
  });
};
