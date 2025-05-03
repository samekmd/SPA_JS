const produtos = [
    { id: 1, nome: "Dark Side of the Moon - Pink Floyd", preco: 80 },
    { id: 2, nome: "Thriller - Michael Jackson", preco: 100 },
    { id: 3, nome: "Abbey Road - The Beatles", preco: 90 },
  ];
  
  let carrinho = [];
  
  function navegar(rota) {
    window.history.pushState({}, "", rota);
    renderizarApp();
  }
  
  window.addEventListener("popstate", () => {
    renderizarApp();
  });
  
  function renderizarApp() {
    const root = document.getElementById("root");
    root.innerHTML = `
      <nav>
        <button onclick="navegar('/')">Início</button>
        <button onclick="navegar('/loja')">Loja</button>
        <button onclick="navegar('/carrinho')">Carrinho</button>
      </nav>
      <main id="app"></main>
    `;
  
    renderizarRota(window.location.pathname);
  }
  
  function renderizarRota(rota) {
    const app = document.getElementById("app");

  
    if (rota === "/") {
      app.innerHTML = `
        <h1>Bem-vindo à Loja de Discos</h1>
        <p>Explore nossa coleção de vinis clássicos e eternos!</p>
      `;
    }
  
    else if (rota === "/loja") {
        app.innerHTML = "<h1>Catálogo de Discos</h1>" +
    produtos.map(produto => {
      const parcelas = 3;
      const valorParcela = (produto.preco / parcelas).toFixed(2);

      return `
        <div class="produto">
          <div>
            <h3>${produto.nome}</h3>
            <p>
              R$ ${produto.preco.toFixed(2)}<br>
              ou ${parcelas}x de R$ ${valorParcela}
            </p>
          </div>
          <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
        </div>
      `;
    }).join("");
    }
  
    else if (rota === "/carrinho") {
      if (carrinho.length === 0) {
        app.innerHTML = "<h1>Carrinho</h1><p>Seu carrinho está vazio.</p>";
        return;
      }
  
      let total = 0;
      const itens = carrinho.map(id => {
        const p = produtos.find(prod => prod.id === id);
        total += p.preco;
        return `<li>${p.nome} - R$ ${p.preco.toFixed(2)}</li>`;
      }).join("");
  
      let parcelaSelecionada = 1;

        app.innerHTML = `
        <h1>Carrinho</h1>
        <ul>${itens}</ul>

        <label for="parcelas"><strong>Parcelar em:</strong></label>
        <select id="parcelas" onchange="atualizarParcelamento()">
            ${[...Array(6)].map((_, i) => `<option value="${i + 1}">${i + 1}x</option>`).join("")}
        </select>

        <p id="total"><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
        <p id="parcela">Ou ${parcelaSelecionada}x de R$ ${total.toFixed(2)} sem juros</p>

        <button onclick="limparCarrinho()">Limpar Carrinho</button>
        `;

    }
  
    else {
      app.innerHTML = "<h1>404 - Página não encontrada</h1>";
    }
  }


  function atualizarParcelamento() {
    const select = document.getElementById("parcelas");
    const parcelas = parseInt(select.value);
    const total = carrinho.reduce((acc, id) => {
      const p = produtos.find(prod => prod.id === id);
      return acc + p.preco;
    }, 0);
  
    const valorParcela = (total / parcelas).toFixed(2);
    document.getElementById("parcela").textContent = `Ou ${parcelas}x de R$ ${valorParcela} sem juros`;
  }
  
  function adicionarAoCarrinho(id) {
    carrinho.push(id);
    alert("Produto adicionado ao carrinho!");
  }
  
  function limparCarrinho() {
    carrinho = [];
    renderizarApp();
  }
  
  // Inicializa
  renderizarApp();
  