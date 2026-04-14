const { getBalance, setBalance } = require('./data');

function viewBalance() {
  return getBalance();
}

function credit(amount) {
  const current = getBalance();
  const newBalance = current + amount;
  setBalance(newBalance);
  return newBalance;
}

function debit(amount) {
  const current = getBalance();
  if (current >= amount) {
    const newBalance = current - amount;
    setBalance(newBalance);
    return { success: true, balance: newBalance };
  } else {
    return { success: false, message: 'Insufficient funds for this debit.' };
  }
}

module.exports = { viewBalance, credit, debit };
