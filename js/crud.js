import { state } from "./state.js";
import { saveTransactions } from "./storage.js";

const createId = () => Date.now();

export const addTransaction = (transactionData) => {
  const transaction = {
    id: createId(),
    ...transactionData,
  };

  state.transactions = [transaction, ...state.transactions];
  saveTransactions(state.transactions);
  return transaction;
};

export const updateTransaction = (id, transactionData) => {
  let transactionExists = false;
  for (let i = 0; i < state.transactions.length; i++) {
    if (state.transactions[i].id === id) {
      transactionExists = true;
      break;
    }
  }

  if (!transactionExists) {
    throw new Error("Invalid transaction selected for update.");
  }

  state.transactions = state.transactions.map((transaction) =>
    transaction.id === id ? { ...transaction, ...transactionData } : transaction,
  );

  saveTransactions(state.transactions);
};

export const deleteTransaction = (id) => {
  const startingCount = state.transactions.length;
  state.transactions = state.transactions.filter((transaction) => transaction.id !== id);

  if (state.transactions.length === startingCount) {
    throw new Error("Invalid transaction selected for deletion.");
  }

  saveTransactions(state.transactions);
};

// meee-----------------------------

