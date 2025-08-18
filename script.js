const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const shiftBtn = document.getElementById("shift");
let shiftMode = false;

// Toggle SHIFT mode
shiftBtn.addEventListener("click", () => {
  shiftMode = !shiftMode;
  shiftBtn.classList.toggle("active");

  // Update button labels when SHIFT is active
  document.querySelectorAll(".func").forEach(btn => {
    if (shiftMode) {
      // Show shift text
      if (btn.dataset.shift.includes("sqrt")) {
        btn.textContent = "√x";
      } else if (btn.dataset.shift.includes("ln")) {
        btn.textContent = "ln";
      } else if (btn.dataset.shift.includes("10^")) {
        btn.textContent = "10^x";
      } else if (btn.dataset.shift.includes("asin")) {
        btn.textContent = "sin⁻¹";
      } else if (btn.dataset.shift.includes("acos")) {
        btn.textContent = "cos⁻¹";
      } else if (btn.dataset.shift.includes("atan")) {
        btn.textContent = "tan⁻¹";
      }
    } else {
      // Show normal text
      if (btn.dataset.normal === "^2") {
        btn.textContent = "x²";
      } else {
        btn.textContent = btn.dataset.normal.replace("(", "").replace(">", "");
      }
    }
  });
});

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;

    if (value === "C") {
      display.textContent = "";
    } else if (value === "DEL") {
      display.textContent = display.textContent.slice(0, -1);
    } else if (value === "=") {
      try {
        let expression = display.textContent
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/π/g, "Math.PI")
          // trig
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/asin\(/g, "Math.asin(")
          .replace(/acos\(/g, "Math.acos(")
          .replace(/atan\(/g, "Math.atan(")
          // logs
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(")
          // exp & powers
          .replace(/exp\(/g, "Math.exp(")
          .replace(/(\d+)x²/g, "Math.pow($1,2)")
          .replace(/x²/g, "**2")
          .replace(/sqrt\(/g, "Math.sqrt(")
          .replace(/10\^/g, "Math.pow(10,");

        display.textContent = eval(expression);
      } catch {
        display.textContent = "Error";
      }
    } else if (btn.classList.contains("func")) {
      display.textContent += shiftMode ? btn.dataset.shift : btn.dataset.normal;
    } else if (value !== "SHIFT") {
      display.textContent += value;
    }
  });
});
