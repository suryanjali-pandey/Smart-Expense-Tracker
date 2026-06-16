import { addTransaction, deleteTransaction, updateTransaction } from "./crud.js";
import { filterTransactions } from "./filters.js";
import { setCurrentFilter, setSearchTerm, setTransactions, state } from "./state.js";
import { loadTransactions } from "./storage.js";
import { validateTransaction } from "./validation.js";
import {
  clearError,
  fillFormForEdit,
  renderDashboard,
  renderTransactions,
  resetForm,
  showError,
} from "./ui.js";

const form = document.querySelector("#transactionForm");
const searchInput = document.querySelector("#searchInput");
const filterSelect = document.querySelector("#filterSelect");
const transactionList = document.querySelector("#transactionList");
const cancelEditButton = document.querySelector("#cancelEditButton");

const getFormData = () => ({
  type: document.querySelector("#type").value,
  category: document.querySelector("#category").value,
  amount: Number(document.querySelector("#amount").value),
  date: document.querySelector("#date").value,
  description: document.querySelector("#description").value.trim(),
});

const refreshUI = () => {
  const visibleTransactions = filterTransactions(
    state.transactions,
    state.searchTerm,
    state.currentFilter,
  );

  renderDashboard();
  renderTransactions(visibleTransactions);
};

const handleSubmit = (event) => {
  event.preventDefault();
  clearError();

  const formData = getFormData();
  const errorMessage = validateTransaction(formData);

  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  try {
    if (state.currentEditId) {
      updateTransaction(state.currentEditId, formData);
    } else {
      addTransaction(formData);
    }

    resetForm();
    refreshUI();
  } catch (error) {
    showError(error.message || "Something went wrong while saving this transaction.");
  }
};

const handleTransactionClick = (event) => {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (editButton) {
    const id = Number(editButton.dataset.edit);
    const transaction = state.transactions.find((item) => item.id === id);

    if (!transaction) {
      showError("Invalid transaction selected for editing.");
      return;
    }

    clearError();
    fillFormForEdit(transaction);
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (deleteButton) {
    const id = Number(deleteButton.dataset.delete);

    try {
      deleteTransaction(id);
      if (state.currentEditId === id) {
        resetForm();
      }
      refreshUI();
    } catch (error) {
      showError(error.message || "Something went wrong while deleting this transaction.");
    }
  }
};

const initializeApp = () => {
  setTransactions(loadTransactions());
  refreshUI();

  form.addEventListener("submit", handleSubmit);
  transactionList.addEventListener("click", handleTransactionClick);

  searchInput.addEventListener("input", (event) => {
    setSearchTerm(event.target.value);
    refreshUI();
  });

  filterSelect.addEventListener("change", (event) => {
    setCurrentFilter(event.target.value);
    refreshUI();
  });

  cancelEditButton.addEventListener("click", () => {
    clearError();
    resetForm();
  });
};

initializeApp();
