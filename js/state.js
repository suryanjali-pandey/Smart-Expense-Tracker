export const state = {
  transactions: [],
  currentEditId: null,
  searchTerm: "",
  currentFilter: "all",
};

export const setTransactions = (transactions) => {
  if (Array.isArray(transactions)) {
    state.transactions = transactions;
  } else {
      state.transactions = [];
  }
};

export const setCurrentEditId = (id) => {
  state.currentEditId = id;
};

export const setSearchTerm = (term) => {
  state.searchTerm = term.trim().toLowerCase();
};

export const setCurrentFilter = (filter) => {
  state.currentFilter = filter;
};
