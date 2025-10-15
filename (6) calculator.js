// calculator.js

const readline = require('readline');

// Create interface for input / output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility: prompt user & return a Promise
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Validate that a string is a number (integer or float)
function isNumeric(value) {
  return !isNaN(value) && value.trim() !== '';
}

async function main() {
  console.log("Simple CLI Calculator");
  console.log("Supported operations: +, -, *, /");

  // 1. Ask operation
  let op;
  while (true) {
    op = await ask("Enter operation (+, -, *, /): ");
    op = op.trim();
    if (['+', '-', '*', '/'].includes(op)) {
      break;
    }
    console.log("Invalid operation. Please enter one of +, -, *, /");
  }

  // 2. Ask first number
  let num1;
  while (true) {
    let ans = await ask("Enter first number: ");
    if (isNumeric(ans)) {
      num1 = parseFloat(ans);
      break;
    }
    console.log("That is not a valid number. Try again.");
  }

  // 3. Ask second number
  let num2;
  while (true) {
    let ans = await ask("Enter second number: ");
    if (isNumeric(ans)) {
      num2 = parseFloat(ans);
      break;
    }
    console.log("That is not a valid number. Try again.");
  }

  // 4. Compute result
  let result;
  switch (op) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        console.log("Cannot divide by zero!");
        rl.close();
        return;
      }
      result = num1 / num2;
      break;
    default:
      console.log("Unexpected operation.");
      rl.close();
      return;
  }

  console.log(`Result: ${num1} ${op} ${num2} = ${result}`);

  rl.close();
}

// Run the calculator
main().catch((err) => {
  console.error("Error:", err);
  rl.close();
});

