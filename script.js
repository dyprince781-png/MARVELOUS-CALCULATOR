// Get display elements
const calculationDisplay = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");

// Track input expression (what user sees) and eval expression (for JS)
let displayExpression = "";
let evalExpression = "";

// Handle button clicks
document.querySelectorAll(".key").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      // Append value to both display and eval expressions
      displayExpression += value;
      
      // Replace with correct JavaScript functions for eval
      let jsValue = value
        .replace("÷", "/")
        .replace("×", "*")
        .replace("√", "Math.sqrt")
        .replace("%", "/100")
        .replace("^", "**")
        .replace("sin", "Math.sin")
        .replace("cos", "Math.cos")
        .replace("tan", "Math.tan");

      evalExpression += jsValue;

      calculationDisplay.textContent = displayExpression;
    } 
    else if (action === "clear") {
      // Reset everything
      displayExpression = "";
      evalExpression = "";
      calculationDisplay.textContent = "";
      resultDisplay.textContent = "";
    } 
    else if (action === "backspace") {
      // Remove last character from both expressions
      displayExpression = displayExpression.slice(0, -1);
      evalExpression = evalExpression.slice(0, -1);
      calculationDisplay.textContent = displayExpression;
    } 
    else if (action === "equals") {
      try {
        // Evaluate the hidden JS expression
        let result = eval(evalExpression);
        resultDisplay.textContent = result;
      } catch {
        resultDisplay.textContent = "Error";
      }
    }
  });
});
