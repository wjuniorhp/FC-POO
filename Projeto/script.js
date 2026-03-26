const nomePrato = document.querySelector("#nome");
const precoPrato = document.querySelector("#preco");
const imagemPrato = document.querySelector("#imagem");
const descricaoPrato = document.querySelector("#descricao");
const botaoCadastrar = document.querySelector("#botao-cadastrar");
const cardapio = document.querySelector("#cardapio");
const imagem = document.querySelector("#imagem");

//*CLASSE
//*=============================================
class Prato {
    constructor(nome, preco, imagem, descricao) {
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
        this.descricao = descricao;
        this.validarPrato();

        // Salvar o objeto dentro de um array no local storage
        const pratos = JSON.parse(localStorage.getItem("cardapio")) || [];
        pratos.push(this);
        localStorage.setItem("cardapio", JSON.stringify(pratos));
    }

    validarPrato() {
        if (!this.nome || !this.preco || !this.imagem || !this.descricao) {
            throw new Error();
        }
        return true;
    }
    //*=============================================

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

//*RENDERIZAR CARDÁPIO
//*=============================================
function renderizarCardapio() {
    ul.innerHTML = "";
    ul.classList.add("cardapio-ul");
    const pratos = JSON.parse(localStorage.getItem("cardapio")) || [];
    pratos.forEach((prato, index) => {
        const li = document.createElement("li");
        li.classList.add("prato");
        li.innerHTML = `
            <h2>${prato.nome}</h2>
            <h3>R\$ ${Number(prato.preco).toFixed(2)}</h3>
            <p>${prato.descricao}</p>
            <img src="${prato.imagem}" alt="${prato.nome}">
            
            
        `;

        //Criando o botao de remover
        const btn = document.createElement("button");
        btn.classList.add("botao-remover");
        btn.innerHTML = "Remover Prato";

        btn.addEventListener("click", () => {
            ul.remove(li);
        });

        ul.appendChild(li);
        li.appendChild(btn);
    });
}

//*=============================================

//*CADASTRANDO O PRATO
//*=============================================
botaoCadastrar.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        const prato = new Prato(
            nomePrato.value,
            precoPrato.value,
            imagemPrato.value,
            descricaoPrato.value,
        );
    } catch (error) {
        alert("Por favor, preencha todos os campos para cadastrar o prato.");
        console.log(error);
        return;
    }
    renderizarCardapio();

    nomePrato.value = "";
    precoPrato.value = "";
    imagemPrato.value = "";
    descricaoPrato.value = "";
});
//*=============================================

// Criar ul dentro da div cardapio
const ul = document.createElement("ul");
console.log(ul);

cardapio.appendChild(ul);

// Renderizar o cardápio ao carregar a pagina
renderizarCardapio();

// Remover prato - uso do botão Remover

botaoRemover.addEventListener("click", (e) => {
    e.preventDefault();
    cardapio.remove();
});
