import "./style.scss";

const display = document.querySelector<HTMLInputElement>(".display");
const outputDisplay = document.querySelector<HTMLInputElement>(".output");
const operatorDisplay = document.querySelector<HTMLButtonElement>(".operator");
const allClear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const percentage = document.querySelector("#percentage");
const equals = document.querySelector<HTMLButtonElement>(".result__operator");
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
  !allClear ||
  !backspace ||
  !equals ||
  !keypadValueArr ||
  !keypadOpArr ||
  !sciOpArr ||
  !percentage
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
  extended.classList.toggle("show");
};
scienceSwitch.addEventListener("click", toggleScienceCalc);
display.value = "0";
let resultDisplayed = false;

// Searches for nums + .
const reSearchError = /[^0-9.]/g;
// Searches for operators
const reSearchOperators = /[-\*\+\/\(\)]/;
// Checking for double arithmetic inputs
// take an input, check new input against previous input - if input is non character - don't allow?
const reDoubleSearch = /[-\*\+\/\(](?=[-\*\+\/\(\)])/;

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

// Check for repeat operator inputs ========= Necessary later w/ scientific
const handleRepeatInputs = () => {
  if (reDoubleSearch.test(display.value)) {
    display.value = display.value.slice(0, -1);
  }
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

// Convert to a percentage when percentage button is clicked
const returnPercentage = () => {
  const numToConvert = Number(display.value);
  display.value = String(numToConvert / 100);
};
percentage.addEventListener("click", returnPercentage);
