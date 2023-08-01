import "./style.scss";

const display = document.querySelector<HTMLInputElement>(".display");
const outputDisplay = document.querySelector<HTMLInputElement>(".output");
const operatorDisplay = document.querySelector<HTMLInputElement>(".operator");
const answerDisplay = document.querySelector<HTMLInputElement>(".answer");
const allClear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const equals = document.querySelector("#equals");
const keypadValueArr = document.querySelectorAll(".keypad__value");
const keypadOpArr =
  document.querySelectorAll<HTMLButtonElement>(".keypad__operator");
const sciOpArr = document.querySelectorAll<HTMLButtonElement>(
  ".extended__operator"
);
if (
  !display ||
  !outputDisplay ||
  !operatorDisplay ||
  !answerDisplay ||
  !allClear ||
  !backspace ||
  !equals ||
  !keypadValueArr ||
  !keypadOpArr ||
  !sciOpArr
) {
  throw new Error("Variable null error");
}
// Func to turn scientific mode on/off
const scienceSwitch =
  document.querySelector<HTMLButtonElement>("#scientific-switch");
if (!scienceSwitch) {
  throw new Error("Science Switch Var error");
}
const toggleScienceCalc = () => {
  const extended = document.querySelector<HTMLDivElement>(".extended");
  if (!extended) {
    throw new Error("toggleScience Func error");
  }
  extended.classList.toggle("show");
};

display.value = "0";
let resultDisplayed = false;

// Clear the display
const clearDisplay = () => {
  display.value = "0";
  outputDisplay.value = "";
  operatorDisplay.value = "";
};
// Delete last input
const deleteLastInput = () => {
  display.value = display.value.slice(0, -1);
};
// Update display with keypad values
const updateDisplay = (event: Event) => {
  const buttonVal = event.target as HTMLButtonElement;
  if (resultDisplayed) {
    display.value = "";
    resultDisplayed = false;
  }
  if (display.value === "0") {
    display.value = "";
  }
  display.value += buttonVal.innerHTML;
};
// Handle operator inputs
const handleOperator = (event: Event) => {
  if (resultDisplayed) {
    display.value = "";
    resultDisplayed = false;
  }
  const target = event.target as HTMLButtonElement;
  if (target.innerHTML === "-") {
    if (display.value === "" || display.value === "0") {
      display.value = target.innerHTML;
    }
  }
  if (display.value === "" || display.value === "-") {
    return;
  }
  operatorDisplay.value = target.innerHTML;
  keypadOpArr.forEach((button) => {
    button.disabled = true;
  });
  // I'm sorry for this.. I could not figure out an easier way.
  keypadOpArr[3].disabled = false;
  outputDisplay.value = display.value;
  display.value = "0";
};
// Evaluate
const evaluateEquation = () => {
  const firstNum = parseFloat(outputDisplay.value);
  const secondNum = parseFloat(display.value);
  let result;
  switch (operatorDisplay.value) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "/":
      if (secondNum === 0) {
        result = "Error";
        break;
      } else {
        result = firstNum / secondNum;
        break;
      }
    case "*":
      result = firstNum * secondNum;
      break;
    case "^":
      result = firstNum ** secondNum;
      break;
    default:
      result = "0";
  }
  display.value = String(result);
  // Store result value for ANS button
  sciOpArr[9].value = String(result);
  answerDisplay.value = `Ans = ${sciOpArr[9].value}`;
  outputDisplay.value = "";
  operatorDisplay.value = "";
  resultDisplayed = true;
  keypadOpArr.forEach((button) => {
    button.disabled = false;
  });
};

// ********** Scientific ops functions ************ //

// Add PI to display
const handlePi = () => {
  display.value = String(Math.PI.toFixed(5));
};
// Display Sin/Tan/Cos
const handleSin = () => {
  const number = Number(display.value);
  display.value = String(Math.sin(number).toFixed(5));
};
const handleCos = () => {
  const number = Number(display.value);
  display.value = String(Math.cos(number).toFixed(5));
};
const handleTan = () => {
  const number = Number(display.value);
  display.value = String(Math.tan(number).toFixed(5));
};
// Display Log
const handleLog = () => {
  if (display.value === "0" || display.value === "") {
    return;
  }
  const number = Number(display.value);
  display.value = String(Math.log(number).toFixed(5));
};
// Square a number
const handleSquare = () => {
  const num = Number(display.value);
  display.value = String(num ** 2);
  answerDisplay.value = `Ans = ${display.value}`;
  sciOpArr[9].value = display.value;
};
// Cube a number
const handleCubed = () => {
  const num = Number(display.value);
  display.value = String(num ** 3);
  answerDisplay.value = `Ans = ${display.value}`;
  sciOpArr[9].value = display.value;
};
// Return SQrt to display
const handleSqRt = () => {
  if (Number(display.value) < 0) {
    display.value = "0";
    return;
  }
  const num = Math.sqrt(Number(display.value));
  display.value = String(num);
};
// Display ANSWER value
const handleAns = () => {
  display.value = sciOpArr[9].value;
};
// Convert current display to percentage
const returnPercentage = () => {
  const numToConvert = Number(display.value);
  display.value = String(numToConvert / 100);
};

// Array of funcs for sci-ops, plus loop to tidy eventListeners
const opFunctions = [
  handlePi,
  handleSin,
  handleCos,
  handleTan,
  handleLog,
  handleSquare,
  handleCubed,
  handleOperator,
  handleSqRt,
  handleAns,
  returnPercentage,
];
for (let i: number = 0; i < opFunctions.length; i++) {
  sciOpArr[i].addEventListener("click", opFunctions[i]);
}

// Event listeners
scienceSwitch.addEventListener("click", toggleScienceCalc);
allClear.addEventListener("click", clearDisplay);
backspace.addEventListener("click", deleteLastInput);
keypadValueArr.forEach((button) => {
  button.addEventListener("click", updateDisplay);
});
keypadOpArr.forEach((button) => {
  button.addEventListener("click", handleOperator);
});
equals.addEventListener("click", evaluateEquation);
