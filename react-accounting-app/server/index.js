/**
 * index.js - Modernized from main.cob (MainProgram)
 *
 * Express REST API replacing the COBOL CLI menu interface.
 * The original main.cob provided a text menu (options 1-4) for
 * View Balance, Credit, Debit, and Exit. This server exposes
 * equivalent functionality as HTTP endpoints.
 */

const express = require("express");
const cors = require("cors");
const operations = require("./operations");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory transaction history (extends beyond original COBOL functionality)
const transactions = [];

/**
 * GET /api/balance
 * Equivalent to COBOL menu option 1: View Balance
 * Original: CALL 'Operations' USING 'TOTAL '
 */
app.get("/api/balance", (req, res) => {
  const balance = operations.getBalance();
  res.json({ balance });
});

/**
 * POST /api/credit
 * Equivalent to COBOL menu option 2: Credit Account
 * Original: CALL 'Operations' USING 'CREDIT'
 * Body: { "amount": number }
 */
app.post("/api/credit", (req, res) => {
  const { amount } = req.body;

  if (amount === undefined || amount === null) {
    return res.status(400).json({ success: false, error: "Amount is required." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return res.status(400).json({ success: false, error: "Invalid credit amount." });
  }

  const result = operations.credit(parsedAmount);

  if (result.success) {
    transactions.push({
      id: transactions.length + 1,
      type: "CREDIT",
      amount: result.amount,
      previousBalance: result.previousBalance,
      newBalance: result.newBalance,
      timestamp: new Date().toISOString(),
    });
  }

  res.json(result);
});

/**
 * POST /api/debit
 * Equivalent to COBOL menu option 3: Debit Account
 * Original: CALL 'Operations' USING 'DEBIT '
 * Body: { "amount": number }
 */
app.post("/api/debit", (req, res) => {
  const { amount } = req.body;

  if (amount === undefined || amount === null) {
    return res.status(400).json({ success: false, error: "Amount is required." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return res.status(400).json({ success: false, error: "Invalid debit amount." });
  }

  const result = operations.debit(parsedAmount);

  if (result.success) {
    transactions.push({
      id: transactions.length + 1,
      type: "DEBIT",
      amount: result.amount,
      previousBalance: result.previousBalance,
      newBalance: result.newBalance,
      timestamp: new Date().toISOString(),
    });
  }

  res.json(result);
});

/**
 * GET /api/transactions
 * New feature beyond original COBOL: Transaction history
 */
app.get("/api/transactions", (req, res) => {
  res.json({ transactions: [...transactions].reverse() });
});

app.listen(PORT, () => {
  console.log(`Account Management System server running on port ${PORT}`);
});
