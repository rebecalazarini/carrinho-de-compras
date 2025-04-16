const uri = './assets/dados.json';
var produtos = [];

// Carrega os dados do Mockup
fetch(uri)
    .then(resp => resp.json())
    .then(resp => { produtos = resp; })
    .then(() => mostrarCards());

function mostrarCards() {
    const main = document.querySelector('main');
    produtos.forEach((p, index) => {
        main.innerHTML += `
        <div class="card">
            <h3>${p.produto}</h3>
            <img src="${p.imagem}" alt="${p.produto}" id="imagem-${index}">
            <p>Preço: R$ ${parseFloat(p.preco).toFixed(2)}</p>
            <p>Descrição: ${p.descricao}</p>
            <p>Peso: ${p.peso}kg</p>
            <button id="detalhes-${index}">Detalhes</button>
            <button id="adicionar-${index}" class="adicionar">Adicionar ao Carrinho</button>
        </div>
        `;
    });

    // Adiciona evento aos botões "Detalhes"
    produtos.forEach((p, index) => {
        const botaoDetalhes = document.getElementById(`detalhes-${index}`);
        botaoDetalhes.addEventListener('click', () => exibirDetalhes(p, index));

        // Adiciona evento para "Adicionar ao Carrinho"
        const botaoAdicionar = document.getElementById(`adicionar-${index}`);
        botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(p, index));
    });
}

function adicionarAoCarrinho(produto, index) {
    // Recupera o carrinho do localStorage ou cria um novo
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Calcula o valor do frete (10% do peso)
    const frete = (produto.peso * 0.1).toFixed(2);

    // Adiciona o produto ao carrinho
    carrinho.push({
        produto: produto.produto,
        preco: parseFloat(produto.preco).toFixed(2),
        peso: produto.peso,
        frete: frete,
        quantidade: 1, // Inicialmente 1
    });

    // Salva o carrinho de volta no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${produto.produto} foi adicionado ao seu carrinho.`);
}
function exibirDetalhes(produto, index) {
    const conteudo = document.getElementById('conteudo');
    const frete = (produto.peso * 0.1).toFixed(2); // Cálculo do frete

    conteudo.innerHTML = `
        <p>${produto.descricao}</p>
        <p>Preço: R$ ${parseFloat(produto.preco).toFixed(2)}</p>
        <p>Peso: ${produto.peso}kg</p>
        <p>Frete: R$ ${frete}</p>
        <img src="${produto.imagem}">
    `;
    const detalhes = document.getElementById('detalhes');
    detalhes.classList.remove('oculto');
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const tbody = document.querySelector('tbody');

    carrinho.forEach((item, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.produto}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${new Date().toLocaleTimeString()}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco}</td>
            <td>R$ ${item.frete}</td>
        </tr>
        `;
    });
}

// Carrega o carrinho ao carregar a página
window.onload = carregarCarrinho;


function ampliarImagem(imagem,) {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <img src="${imagem}">
    `;
}

function reverterDetalhes() {
    const detalhes = document.getElementById('detalhes');
    detalhes.classList.add('oculto');
}


//Modal de pedidos
function abrirModalPedido(id) {
    const produto = produtos.find(produto => produto.id == id);
    const body = document.querySelector("body");
    const modal = document.createElement("section");
    modal.id = "novoPedido";
    modal.className = "modal";
    const janela = document.createElement("div");
    janela.className = "janela";
    janela.innerHTML = `
            <div>
                <h2>Novo Pedido</h2>
                <button onclick="window.location.reload()">X</button>
            </div>
            <form>
                <label for="cliente">Cliente</label>
                <select name="cliente" required>
                    ${clientes.map(cliente => `<option value="${cliente.id}">${cliente.nome}</option>`).join("")}
                </select>
                <label for="produto">Produto</label>
                <input type="text" name="produto" value="${produto.produto}" disabled>
                <label for="preco">Preço</label>
                <input type="text" name="preco" value="${produto.preco}" disabled>
                <label for="qtd">Quantidade</label>
                <input type="number" name="qtd" value="1" required>
                <button type="submit">Salvar</button>   
            </form>
    `;
    modal.appendChild(janela);
    body.appendChild(modal);
}