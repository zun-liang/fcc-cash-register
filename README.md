# freeCodeCamp - Build a Cash Register

This is a solution to the [Build a Cash Register Project on freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-cash-register-project/build-a-cash-register).

## What I learned

- This is not the first time that I ran into this bug:
  "The issue you're facing is that you are trying to get the value of userInput immediately when the script runs. At that moment, the input field is likely empty or doesn't have a valid number, resulting in NaN (Not a Number) when you try to parse it."

- To fix floating point error in JavaScript, we can use [parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) and [toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed). But please note that, parseFloat() parses a string and returns a floating point number and toFixed() accepts a number and returns a string.

  ```
  parseFloat(num.toFixed(2));
  ```
