const nomePrato = document.querySelector('#nome');
const precoPrato = document.querySelector('#preco');
const imagemPrato = document.querySelector('#imagem');
const descricaoPrato = document.querySelector('#descricao');
const botaoCadastrar = document.querySelector('#botao-cadastrar');
const cardapio = document.querySelector('#cardapio');

let pratos = [];

class Prato {
    constructor(nome, preco, imagem, descricao) {
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
        this.descricao = descricao;
        this.validarPrato()
        

        // Salvar o objeto dentro de um array no local storage
        pratos.push(this);
        localStorage.setItem('cardapio', JSON.stringify(pratos));
    }

    validarPrato() {
        if (!this.nome || !this.preco || !this.imagem || !this.descricao) {
            alert('Por favor, preencha todos os campos para cadastrar o prato.');
            throw new Error('Todos os campos são obrigatórios');
        }
        return true;
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
    ul.classList.add('cardapio-ul');
    pratos.forEach(prato => {
        const li = document.createElement('li');
        li.classList.add('prato');
        li.innerHTML = `
            <h2>${prato.nome}</h2>
            <h3>R\$ ${Number(prato.preco).toFixed(2)}</h3>
            <p>${prato.descricao}</p>
            <img src="${prato.imagem}" alt="${prato.nome}">
        `;
        ul.appendChild(li);
    });
}

function cargaInicial() {
    pratos = JSON.parse(localStorage.getItem('cardapio')) || [];
    if (pratos.length === 0) {
        const prato1 = new Prato('Pizza Margherita', '29.90', 'https://guiadacozinha.com.br/wp-content/uploads/2007/01/Pizza-marguerita-caseira.webp', 'Deliciosa pizza com molho de tomate, mussarela e manjericão.');
        const prato2 = new Prato('Hambúrguer Clássico', '19.90', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIGxMt4Xff6uG34lQW_ne2w4G0Xwu4AX8cg&s', 'Hambúrguer suculento com queijo, alface, tomate e maionese.');
        const prato3 = new Prato('Sushi Variado', '39.90', 'https://www.diadepeixe.com.br/extranet/thumbnail/crop/1200x630/Receita/shutterstock_2105735288_1746448515362.jpg', 'Seleção de sushi fresco com salmão, atum e camarão.');
    }
}

botaoCadastrar.addEventListener('click', () => {
    try {
        const prato = new Prato(nomePrato.value, precoPrato.value, imagemPrato.value, descricaoPrato.value);
    } catch (error) {
        console.error(error);
        return;
    }
    renderizarCardapio();
});

// Criar ul dentro da div cardapio
const ul = document.createElement('ul');
cardapio.appendChild(ul);

// Renderizar o cardápio ao carregar a pagina
cargaInicial();
renderizarCardapio();