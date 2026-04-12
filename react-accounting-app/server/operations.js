/**
 * operations.js - Modernized from operations.cob (Operations)
 *
 * Handles business logic for credit, debit, and balance viewing.
 * Mirrors the COBOL Operations subprogram which processed
 * TOTAL, CREDIT, and DEBIT operations using PIC 9(6)V99 precision.
 */

const data = require("./data");

function getBalance() {
  return data.read();
}

function credit(amount) {
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return { success: false, error: "Invalid credit amount." };
  }

  const currentBalance = data.read();
  const newBalance = currentBalance + amount;
  data.write(newBalance);

  return {
    success: true,
    previousBalance: currentBalance,
    amount: parseFloat(amount.toFixed(2)),
    newBalance: data.read(),
  };
}

function debit(amount) {
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return { success: false, error: "Invalid debit amount." };
  }

  const currentBalance = data.read();

  if (currentBalance < amount) {
    return {
      success: false,
      error: "Insufficient funds for this debit.",
      currentBalance,
    };
  }

  const newBalance = currentBalance - amount;
  data.write(newBalance);

  return {
    success: true,
    previousBalance: currentBalance,
    amount: parseFloat(amount.toFixed(2)),
    newBalance: data.read(),
  };
}

module.exports = { getBalance, credit, debit };
