import { state, setCurrentEditId } from "./state.js";
import { calculateBalance, calculateExpense, calculateIncome } from "./calculations.js";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const dashboard = document.querySelector("#dashboard");
const transactionList = document.querySelector("#transactionList");
const form = document.querySelector("#transactionForm");
const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const errorContainer = document.querySelector("#errorContainer");

export const formatCurrency = (amount) => currencyFormatter.format(amount);

const formatDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00`));

export const renderDashboard = () => {
  const income = calculateIncome(state.transactions);
  const expense = calculateExpense(state.transactions);
  const balance = calculateBalance(state.transactions);

  dashboard.innerHTML = `
    <article class="metric-card income">
      <span class="metric-icon"><i class="bi bi-arrow-down-left"></i></span>
      <p>Total Income</p>
      <strong>${formatCurrency(income)}</strong>
    </article>
    <article class="metric-card expense">
      <span class="metric-icon"><i class="bi bi-arrow-up-right"></i></span>
      <p>Total Expense</p>
      <strong>${formatCurrency(expense)}</strong>
    </article>
    <article class="metric-card balance">
      <span class="metric-icon"><i class="bi bi-wallet2"></i></span>
      <p>Balance</p>
      <strong>${formatCurrency(balance)}</strong>
    </article>
  `;
};

export const renderTransactions = (transactions) => {
  if (transactions.length === 0) {
    transactionList.innerHTML = `
      <div class="empty-state">
        <strong>No transactions found.</strong>
        <div>Add a transaction or adjust your search and filter.</div>
      </div>
    `;
    return;
  }

  transactionList.innerHTML = transactions
    .map((transaction) => {
      const sign = transaction.type === "income" ? "+" : "-";
      const indicator = transaction.type === "income" ? "C" : "D";
      const description = escapeHtml(transaction.description);
      const category = escapeHtml(transaction.category);

      return `
        <article class="transaction-row" data-id="${transaction.id}">
          <div class="transaction-date">${formatDate(transaction.date)}</div>
          <div class="transaction-description">
            <strong title="${description}">${description}</strong>
            <small>${category}</small>
          </div>
          <div class="transaction-amount ${transaction.type}">
            ${sign}${formatCurrency(transaction.amount)}
          </div>
          <div class="row-actions">
            <button class="icon-button" type="button" data-edit="${transaction.id}" title="Edit transaction" aria-label="Edit transaction">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="icon-button delete" type="button" data-delete="${transaction.id}" title="Delete transaction" aria-label="Delete transaction">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
          <span class="type-strip ${transaction.type}" aria-label="${transaction.type}">
            ${indicator}
          </span>
        </article>
      `;
    })
    .join("");
};

export const resetForm = () => {
  form.reset();
  setCurrentEditId(null);
  formTitle.textContent = "Add Transaction";
  submitButton.innerHTML = '<i class="bi bi-plus-circle"></i><span>Add Transaction</span>';
  cancelEditButton.classList.add("d-none");
};

export const fillFormForEdit = (transaction) => {
  document.querySelector("#type").value = transaction.type;
  document.querySelector("#category").value = transaction.category;
  document.querySelector("#amount").value = transaction.amount;
  document.querySelector("#date").value = transaction.date;
  document.querySelector("#description").value = transaction.description;

  setCurrentEditId(transaction.id);
  formTitle.textContent = "Update Transaction";
  submitButton.innerHTML = '<i class="bi bi-check-circle"></i><span>Update Transaction</span>';
  cancelEditButton.classList.remove("d-none");
};

export const showError = (message) => {
  errorContainer.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${escapeHtml(message)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
};

export const clearError = () => {
  errorContainer.innerHTML = "";
};


// kiran as per as choice -----------------------------