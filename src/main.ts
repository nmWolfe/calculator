import "./style.scss";

const display = document.querySelector<HTMLInputElement>(".display");
const allClear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const addition = document.querySelector("#add");
const keypadArr = document.querySelectorAll(".keypad__value");

if (
  !display ||
  !allClear ||
  !backspace ||
  !multiply ||
  !subtract ||
  !divide ||
  !addition ||
  !keypadArr
) {
  throw new Error("Variable null error");
}

// Clear the display
const clearDisplay = () => {
  display.value = "";
};
allClear.addEventListener("click", clearDisplay);

// Delete last input
const deleteLastInput = () => {
  display.value = display.value.slice(0, -1);
};
backspace.addEventListener("click", deleteLastInput);

// Update display with keypad vals
const updateDisplay = (event: Event) => {
  const buttonVal = event.target as HTMLButtonElement;
  display.value += buttonVal.innerHTML;
};
keypadArr.forEach((button) => {
  button.addEventListener("click", updateDisplay);
});
