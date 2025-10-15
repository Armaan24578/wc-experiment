
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}


function isNumeric(value) {
  return !isNaN(value) && value.trim() !== '';
}

async function main() {
  console.log("Simple CLI Calculator");
  console.log("Supported operations: +, -, *, /");


  let op;
  while (true) {
    op = await ask("Enter operation (+, -, *, /): ");
    op = op.trim();
    if (['+', '-', '*', '/'].includes(op)) {
      break;
    }
    console.log("Invalid operation. Please enter one of +, -, *, /");
  }


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


main().catch((err) => {
  console.error("Error:", err);
  rl.close();
});
