/**
 * data.js - Modernized from data.cob (DataProgram)
 *
 * Manages the persistence layer for account balance state.
 * In the original COBOL, DataProgram handled READ/WRITE operations
 * on STORAGE-BALANCE (PIC 9(6)V99, initial value 1000.00).
 */

let storageBalance = 1000.0;

function read() {
  return parseFloat(storageBalance.toFixed(2));
}

function write(balance) {
  storageBalance = parseFloat(balance.toFixed(2));
}

function reset() {
  storageBalance = 1000.0;
}

module.exports = { read, write, reset };
