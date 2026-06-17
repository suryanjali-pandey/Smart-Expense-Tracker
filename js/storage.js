const STORAGE_KEY = "smartExpenseTrackerTransactions";

export const loadTransactions = () => {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    if (savedTransactions) {
    return JSON.parse(savedTransactions);
    }
    return [];
  } catch (error) {
    console.error("Unable to load transactions:", error);
    return [];
  }
};

export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return true;
  } catch (error) {
    console.error("Unable to save transactions:", error);
    return false;
  }
};

// meeeeee-----------------------------