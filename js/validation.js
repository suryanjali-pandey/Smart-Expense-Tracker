const validTypes = ["income", "expense"];

export const validateTransaction = ({ type, amount, description, date }) => {
  if (!validTypes.includes(type)) {
    return "Please choose a valid transaction type.";
  }

  if (!description || description.trim().length === 0) {
    return "Please enter a short description for this transaction.";
  }

  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return "Please enter a valid amount greater than zero.";
  }

  if (!date) {
    return "Please select a transaction date.";
  }

  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Please select a valid transaction date.";
  }

  return "";
};