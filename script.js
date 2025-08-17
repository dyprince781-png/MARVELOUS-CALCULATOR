const display = document.getElementById("display");
let shift = false;
let ans = 0;
let deg = true; // default is DEG mode

function insert(value) {
  if (value === "Ans") {
    display.value += ans;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // Handle DEG → RAD for trig
    if (deg) {
      expression = expression.replace(/Math\.sin\(([^)]+)\)/g, (_, angle) => `Math.sin((${angle})*Math.PI/180)`);
      expression = expression.replace(/Math\.cos\(([^)]+)\)/g, (_, angle) => `Math.cos((${angle})*Math.PI/180)`);
      expression = expression.replace(/Math\.tan\(([^)]+)\)/g, (_, angle) => `Math.tan((${angle})*Math.PI/180)`);
    }

    ans = eval(expression);
    display.value = ans;
  } catch {
    display.value = "Error";
  }
}

function shiftMode() {
  shift = !shift;
  alert("SHIFT mode (demo): in real version, buttons will change functions.");
}

function toggleDegRad() {
  deg = !deg;
  document.getElementById("degRad").innerText = deg ? "DEG" : "RAD";
  }
