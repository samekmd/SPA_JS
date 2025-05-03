document.addEventListener("DOMContentLoaded", () => {
  showSection("padrao");
});

function showSection(section) {
  const app = document.getElementById("app");

  if (section === "padrao") {
    app.innerHTML = `
      <div class="calculator">
        <input type="text" id="display" disabled />
        <div class="buttons">
          ${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+", "√"].map(char => `
            <button onclick="press('${char}')">${char}</button>
          `).join("")}
          <button onclick="clearDisplay()" style="grid-column: span 4; background-color: #ff5c5c; color: white;">C</button>
        </div>
      </div>
    `;
    initPadrao();
  }

  if (section === "media") {
    app.innerHTML = `
      <div class="calculator">
        <h2>Média Aritmética</h2>
        <input type="text" id="numeros" placeholder="Ex: 5, 7.5, 8"/>
        <button onclick="calcularMedia()">Calcular</button>
        <div class="resultado" id="resultadoMedia"></div>
      </div>
    `;
  }

  if (section === "bhaskara") {
    app.innerHTML = `
      <div class="calculator">
        <h2>Bhaskara</h2>
        <input type="number" id="a" placeholder="a" />
        <input type="number" id="b" placeholder="b" />
        <input type="number" id="c" placeholder="c" />
        <button onclick="calcularBhaskara()">Calcular</button>
        <div class="resultado" id="resultadoBhaskara"></div>
      </div>
    `;
  }
}

// Calculadora padrão
function initPadrao() {
  window.press = function (char) {
    const display = document.getElementById("display");
    if (char === "=") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Erro";
      }
    } else if(char === "√"){
      try{
        display.value = Math.sqrt(display.value)
      }catch{
        display.value = "Erro";
      }
    }else {
      display.value += char;
    }
  };

  window.clearDisplay = function () {
    document.getElementById("display").value = "";
  };
}

// Média Aritmética
function calcularMedia() {
  const input = document.getElementById("numeros").value;
  const valores = input.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

  if (valores.length === 0) {
    document.getElementById("resultadoMedia").textContent = "Digite números válidos.";
    return;
  }

  const soma = valores.reduce((acc, n) => acc + n, 0);
  const media = soma / valores.length;
  document.getElementById("resultadoMedia").textContent = `Média: ${media.toFixed(2)}`;
}

// Bhaskara
function calcularBhaskara() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);

  const resultado = document.getElementById("resultadoBhaskara");

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    resultado.textContent = "Preencha todos os campos com números.";
    return;
  }

  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    resultado.textContent = "Delta negativo. Não existem raízes reais.";
    return;
  }

  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);

  resultado.textContent = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
}
