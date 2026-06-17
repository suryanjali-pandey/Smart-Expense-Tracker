export const calculateIncome = (transactions) =>
  transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

export const calculateExpense = (transactions) =>
  transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

export const calculateBalance = (transactions) =>
  calculateIncome(transactions) - calculateExpense(transactions);



