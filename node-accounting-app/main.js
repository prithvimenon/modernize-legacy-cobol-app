const readline = require('readline');
const { viewBalance, credit, debit } = require('./operations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  let running = true;

  while (running) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice.trim()) {
      case '1':
        console.log(`Current balance: ${viewBalance().toFixed(2)}`);
        break;
      case '2': {
        const creditAmt = parseFloat(await prompt('Enter credit amount: '));
        if (isNaN(creditAmt) || creditAmt < 0) {
          console.log('Invalid amount.');
        } else {
          const newBal = credit(creditAmt);
          console.log(`Amount credited. New balance: ${newBal.toFixed(2)}`);
        }
        break;
      }
      case '3': {
        const debitAmt = parseFloat(await prompt('Enter debit amount: '));
        if (isNaN(debitAmt) || debitAmt < 0) {
          console.log('Invalid amount.');
        } else {
          const result = debit(debitAmt);
          if (result.success) {
            console.log(`Amount debited. New balance: ${result.balance.toFixed(2)}`);
          } else {
            console.log(result.message);
          }
        }
        break;
      }
      case '4':
        running = false;
        console.log('Exiting the program. Goodbye!');
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  rl.close();
}

main();
