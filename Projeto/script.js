const nomePrato = document.querySelector('#nome');
const precoPrato = document.querySelector('#preco');
const imagemPrato = document.querySelector('#imagem');
const botaoCadastrar = document.querySelector('#botao-cadastrar');
const cardapio = document.querySelector('#cardapio');

class Prato {
    constructor(nome, preco, imagem) {
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;

        // Salvar o objeto dentro de um array no local storage
        const pratos = JSON.parse(localStorage.getItem('cardapio')) || [];
        pratos.push(this);
        localStorage.setItem('cardapio', JSON.stringify(pratos));
    }

    // criarLi() {
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //         <h2>${this.nome}</h2>
    //         <p>${this.preco}</p>
    //         <img src="${this.imagem}" alt="${this.nome}">
    //     `;
    //     ul.appendChild(li);
    // }
}

function renderizarCardapio() {
    ul.innerHTML = '';
    const pratos = JSON.parse(localStorage.getItem('cardapio')) || [];
    pratos.forEach(prato => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${prato.nome}</h2>
            <p>${prato.preco}</p>
            <img src="${prato.imagem}" alt="${prato.nome}">
        `;
        ul.appendChild(li);
    });
}

botaoCadastrar.addEventListener('click', () => {
    const prato = new Prato(nomePrato.value, precoPrato.value, imagemPrato.value);
    renderizarCardapio();
});

// Criar ul dentro da div cardapio
const ul = document.createElement('ul');
cardapio.appendChild(ul);

// Renderizar o cardápio ao carregar a pagina
renderizarCardapio();