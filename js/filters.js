export const filterTransactions = (transactions, searchTerm, currentFilter) =>
  transactions
    .filter((transaction) => {
      if (currentFilter === "all") {
        return true;
      }
      return transaction.type === currentFilter;
    })
    .filter((transaction) => transaction.description.toLowerCase().includes(searchTerm));




    