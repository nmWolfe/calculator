# My Calculator

Checkout the [Calculator](https://nmwolfe.github.io/calculator/) here.

<img width="721" alt="desktop" src="https://github.com/nmWolfe/calculator/assets/125403716/a5632e69-d081-4884-8ba6-8b8d1890a3f3">

## The Brief

Tasked with building a calculator web-app, using HTML, SCSS and TypeScript, the brief here is to have a working calculator, that can accept inputs, calculate, then display the correct output.

The inputs will be generated via users clicking the corresponding buttons.

## The Requirements

1 - A deployed website (Gh-Pages)

2 - A public GitHub repo

- At least 15 commits

3 - Be responsive, and built mobile-first. It should work on different screen widths.

4 - Accept a minimum of 2 inputs, perform the op and show an output.

5 - Does NOT use the eval() method.

6 - Code is highly readable

## The CALCULATOR

At face value it is a simple calculator, which can perform simple tasks. With the `flick` of a button, it becomes a little more complex adding additional functionality, oftentimes seen in scientific calculators.

### Challenges

The biggest challenge I faced here was getting operations to execute separately. Initially I was attempting to keep all the values in a single display input, this caused me too many headaches, and although furthering my understanding of Regular Expressions, proved too difficult a task to parse the string. <br> My solution here was to separate the inputs into a initial display input, and a 'stored' input. This made it much easier to separate the two strings, convert to numbers and then perform the calculation.

### Extensions

I decided to add extra functionality with a scientific option, when a button is pressed. This provided the added difficulty of storing another value, for later use. The ANS value.
This issue was overcome again with a separate input. Allowing me to assign the inputs value to a variable, for storage, and subsequent later use.

### Layout!

This was a fun, and eye-opening task I created for myself.

- I wanted to have an option for landscape mode on handhelds like iPad, or iPhone <sub>(Apple, am i right..)</sub> or Android.

#### Portrait

<img width="388" alt="portrait-mobile" src="https://github.com/nmWolfe/calculator/assets/125403716/5bb855e3-f330-4962-91af-4d2954e3c5f6">

#### Landscape

<img width="840" alt="landscape-mobile" src="https://github.com/nmWolfe/calculator/assets/125403716/4390dcb5-ca04-427c-b190-d02280ea41d9">

## Further functionality

If and when I return to this project, I would like to add more scientific functionality. I would like users to be able to complete complex evaluations with the use of parenthesis, and multiple operands in one line.

## Running this locally

Clone the repo, and run it in your developer environment. Have fun with it, and if you've got any feedback, throw an issue my way!
