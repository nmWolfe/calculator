import "./style.scss";

const display = document.querySelector<HTMLInputElement>(".display");
const output = document.querySelector<HTMLInputElement>(".output");
const allClear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const addition = document.querySelector("#add");
const percentage = document.querySelector("#percentage");
const brackets = document.querySelector("#brackets");
const keypadArr = document.querySelectorAll(".keypad__value");

if (
  !display ||
  !output ||
  !allClear ||
  !backspace ||
  !multiply ||
  !subtract ||
  !divide ||
  !addition ||
  !keypadArr ||
  !percentage ||
  !brackets
) {
  throw new Error("Variable null error");
}

// Searches for nums + .
const reSearchError = /[^0-9.]/g;
// Searches for operators
const reSearchOperators = /[-\*\+\/\(\)]/;
// Checking for double arithmetic inputs
// take an input, check new input against previous input - if input is non character - don't allow?
const reDoubleSearch = /[-\*\+\/\(](?=[-\*\+\/\(\)?])/;

// Clear the display
const clearDisplay = () => {
  display.value = "0";
  output.value = "";
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
  display.value += buttonVal.innerHTML;
};
// Check for repeat operator inputs
const handleRepeatInputs = () => {
  if (reDoubleSearch.test(display.value)) {
    display.value = display.value.slice(0, -1);
  }
};

keypadArr.forEach((button) => {
  button.addEventListener("click", handleRepeatInputs);
  button.addEventListener("click", updateDisplay);
});

// Convert to a percentage when percentage button is clicked
const returnPercentage = () => {
  // Will return as boolean if RegEx search matches
  if (reSearchError.test(display.value)) {
    output.value = "ERROR";
    // Acts like delay - wipe input display
    setTimeout(function () {
      clearDisplay();
    }, 2000);
    return;
  }
  const numToConvert = Number(display.value);
  display.value = String(numToConvert / 100);
};
percentage.addEventListener("click", returnPercentage);

// Add brackets to value if bracket button is clicked
const surroundBrackets = () => {
  display.value = `(${display.value})`;
};
brackets.addEventListener("click", surroundBrackets);
