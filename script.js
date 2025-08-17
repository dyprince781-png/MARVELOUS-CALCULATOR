const calculationDisplay = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".key");

let calculation = "";
let lastResult = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const insert = button.dataset.insert;
    const action = button.dataset.action;

    if (insert) {
      calculation += insert;
      calculationDisplay.textContent = calculation;
    }

    if (action) {
      if (action === "clear") {
        calculation = "";
        resultDisplay.textContent = "";
        calculationDisplay.textContent = "";
      } else if (action === "del") {
        calculation = calculation.slice(0, -1);
        calculationDisplay.textContent = calculation;
      } else if (action === "equals") {
        try {
          let expr = calculation
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/π/g, "Math.PI")
            .replace(/\be\b/g, "Math.E")
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/(\d+)!/g, (m, n) => {
              let f = 1;
              for (let i = 1; i <= parseInt(n); i++) f *= i;
              return f;
            });

          let result = eval(expr);
          resultDisplay.textContent = result;
          lastResult = result;
        } catch (err) {
          resultDisplay.textContent = "Error";
        }
      }
    }
  });
});
