import "./style.scss";

const display = document.querySelector<HTMLInputElement>(".display");
const outputDisplay = document.querySelector<HTMLInputElement>(".output");
const operatorDisplay = document.querySelector<HTMLInputElement>(".operator");
const answerDisplay = document.querySelector<HTMLInputElement>(".answer");
const allClear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const equals = document.querySelector<HTMLButtonElement>("#equals");
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
  throw new Error("Var NULL error");
}
const toggleScienceCalc = () => {
  const extended = document.querySelector<HTMLDivElement>(".extended");
  if (!extended) {
    throw new Error("toggleScience Func error");
  }
  extended.classList.toggle("show");
};
scienceSwitch.addEventListener("click", toggleScienceCalc);
display.value = "0";
let resultDisplayed = false;

console.log(keypadOpArr);
console.log(sciOpArr);

// Clear the display
const clearDisplay = () => {
  display.value = "0";
  outputDisplay.value = "";
  operatorDisplay.value = "";
};
allClear.addEventListener("click", clearDisplay);

// Delete last input
const deleteLastInput = () => {
  display.value = display.value.slice(0, -1);
};
backspace.addEventListener("click", deleteLastInput);

// Update display with keypad values
const updateDisplay = (event: Event) => {
  const buttonVal = event.target as HTMLButtonElement;
  if (resultDisplayed) {
    display.value = "";
    resultDisplayed = false;
  }
  if (display.value == "0") {
    display.value = "";
  }
  display.value += buttonVal.innerHTML;
};

const handleOperator = (event: Event) => {
  if (resultDisplayed) {
    display.value = "";
    resultDisplayed = false;
  }
  if (display.value == "") {
    return;
  }
  const target = event.target as HTMLButtonElement;
  operatorDisplay.value = target.innerHTML;
  keypadOpArr.forEach((button) => {
    button.disabled = true;
  });
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
      result = firstNum / secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    default:
      result = "0";
  }
  display.value = String(result);
  // Store result value for ANS button
  sciOpArr[9].value = String(result);
  outputDisplay.value = "";
  operatorDisplay.value = "";
  resultDisplayed = true;
  keypadOpArr.forEach((button) => {
    button.disabled = false;
  });
};

keypadValueArr.forEach((button) => {
  button.addEventListener("click", updateDisplay);
});
keypadOpArr.forEach((button) => {
  button.addEventListener("click", handleOperator);
});
equals.addEventListener("click", evaluateEquation);

// Convert current display to percentage
const returnPercentage = () => {
  const numToConvert = Number(display.value);
  display.value = String(numToConvert / 100);
};
sciOpArr[8].addEventListener("click", returnPercentage);

// Return SQrt to display
const handleSqRt = () => {
  const squaredNum = Math.sqrt(Number(display.value));
  display.value = String(squaredNum);
};
sciOpArr[0].addEventListener("click", handleSqRt);

// Add PI to display as a number.
const handlePi = () => {
  const piNum = Math.PI;
  display.value = String(piNum);
};
sciOpArr[1].addEventListener("click", handlePi);

// Display ANSWER value
const handleAns = () => {
  display.value = sciOpArr[9].value;
  answerDisplay.value = `Ans = ${sciOpArr[9].value}`;
};
sciOpArr[9].addEventListener("click", handleAns);

// // Searches for nums + .
// const reSearchError = /[^0-9.]/g;
// // Searches for operators
// const reSearchOperators = /[-\*\+\/\(\)]/;
// // Checking for double arithmetic inputs
// // take an input, check new input against previous input - if input is non character - don't allow?
// const reDoubleSearch = /[-\*\+\/\(](?=[-\*\+\/\(\)])/;

// // Check for repeat operator inputs ========= Necessary later w/ scientific
// const handleRepeatInputs = () => {
//   if (reDoubleSearch.test(display.value)) {
//     display.value = display.value.slice(0, -1);
//   }
// };
