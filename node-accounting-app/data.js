let balance = 1000.00;

function getBalance() {
  return balance;
}

function setBalance(newBalance) {
  balance = newBalance;
}

function resetBalance() {
  balance = 1000.00;
}

module.exports = { getBalance, setBalance, resetBalance };
