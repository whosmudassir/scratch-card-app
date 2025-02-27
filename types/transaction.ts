export interface TransactionDetails {
  transactionId: string;
  amount: number;
  merchantName: string;
  timestamp: string;
  status: string;
}

export interface Reward {
  rewardId: string;
  amount: number;
  type: string;
  expiryDate: string;
}

export interface ScratchCardProps {
  onScratchComplete: () => void;
  onClaimComplete: () => void;
  selectedReward: Reward;
  claimedRewards: number[];
  scratchedRewards: number[];
}
