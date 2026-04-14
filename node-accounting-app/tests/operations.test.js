const { viewBalance, credit, debit } = require('../operations');
const { resetBalance } = require('../data');

beforeEach(() => {
  resetBalance(); // Reset to 1000.00 before each test
});

// TC-1.1: View Current Balance
test('TC-1.1: viewBalance returns initial balance of 1000.00', () => {
  expect(viewBalance()).toBe(1000.00);
});

// TC-2.1: Credit Account with Valid Amount
test('TC-2.1: credit(100) on 1000.00 balance returns 1100.00', () => {
  const result = credit(100.00);
  expect(result).toBe(1100.00);
  expect(viewBalance()).toBe(1100.00);
});

// TC-2.2: Credit Account with Zero Amount
test('TC-2.2: credit(0) leaves balance unchanged at 1000.00', () => {
  const result = credit(0);
  expect(result).toBe(1000.00);
  expect(viewBalance()).toBe(1000.00);
});

// TC-3.1: Debit Account with Valid Amount
test('TC-3.1: debit(50) on 1000.00 balance succeeds with 950.00', () => {
  const result = debit(50.00);
  expect(result).toEqual({ success: true, balance: 950.00 });
  expect(viewBalance()).toBe(950.00);
});

// TC-3.2: Debit Account with Amount Greater Than Balance
test('TC-3.2: debit(2000) on 1000.00 balance fails with insufficient funds', () => {
  const result = debit(2000.00);
  expect(result).toEqual({ success: false, message: 'Insufficient funds for this debit.' });
  expect(viewBalance()).toBe(1000.00); // balance unchanged
});

// TC-3.3: Debit Account with Zero Amount
test('TC-3.3: debit(0) leaves balance unchanged at 1000.00', () => {
  const result = debit(0);
  expect(result).toEqual({ success: true, balance: 1000.00 });
  expect(viewBalance()).toBe(1000.00);
});
