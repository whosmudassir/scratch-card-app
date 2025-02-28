import React, { createContext, useContext, useState } from "react";
import { getTransactionDetails } from "../api/mockAPI"; // Adjust path
import { TransactionDetails } from "../types/transaction";

interface TransactionContextType {
  transaction: TransactionDetails | null;
  isTransactionLoading: boolean;
  isTransactionError: boolean;
  fetchTransaction: (transactionId: string) => Promise<void>;
}

// Create Context
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Provider Component
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [isTransactionError, setIsTransactionError] = useState(false);

  const fetchTransaction = async (transactionId: string) => {
    setIsTransactionLoading(true);
    setIsTransactionError(false);
    try {
      const details = await getTransactionDetails(transactionId);
      if (details?.status === "SUCCESS") {
        setTransaction(details);
      } else {
        setIsTransactionError(true);
      }
    } catch (error) {
      setIsTransactionError(true);
    } finally {
      setIsTransactionLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transaction,
        isTransactionLoading,
        isTransactionError,
        fetchTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
