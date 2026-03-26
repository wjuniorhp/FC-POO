import type { IPratos } from "./models/interfacePratos";
import { Cardapio } from "./models/Cardapio";
import { Lanche } from "./models/Lanche";
import { Bebida } from "./models/Bebida.ts";
import { Venda } from "./models/Venda.ts";

const nomePrato = document.querySelector("#nome") as HTMLInputElement;
const precoPrato = document.querySelector("#preco") as HTMLInputElement;
const imagemPrato = document.querySelector("#imagem") as HTMLInputElement;
const descricaoPrato = document.querySelector("#descricao") as HTMLTextAreaElement;
const botaoCadastrar = document.querySelector("#botao-cadastrar") as HTMLButtonElement;
const cardapioElemento = document.querySelector("#cardapio") as HTMLElement;
const categoria = document.querySelector("#categoria") as HTMLSelectElement;

const cardapio: Cardapio = new Cardapio();
const venda = new Venda();

//*Tratando o input do preço:
precoPrato.addEventListener("input", () => {
  let valor = precoPrato.value;
  valor = valor.replace(/\D/g, ""); // Remove tudo que não é número
  valor = (Number(valor) / 100).toFixed(2);
  valor = valor.replace(".", ",");
  precoPrato.value = `R$ ${valor}`;
});

//*Renderizar o prato na tela
function RenderizarPrato() {
  cardapioElemento.innerHTML = "";

  const ul = document.createElement("ul");
  ul.classList.add("cardapio-ul");
  cardapioElemento.appendChild(ul);

  cardapio.listarPratos().forEach((prato) => {
    const li = document.createElement("li");
    li.classList.add("prato");

    li.innerHTML = prato.gerarHTML();
    ul.appendChild(li);

    // Criando a div para os botões
    const divBotoes = document.createElement("div");
    divBotoes.classList.add("div-botoes");
    li.appendChild(divBotoes);

    //Criando o botao de remover
    const btnRemover = document.createElement("button");
    btnRemover.classList.add("botao-remover");
    btnRemover.innerHTML = "Remover Prato";

    divBotoes.appendChild(btnRemover);

    //Criando o botao de vender
    const btnVender = document.createElement("button");
    btnVender.innerHTML = "Registrar Venda <br> (1 un)";
    btnVender.classList.add("botao-remover");

    divBotoes.appendChild(btnVender);

    //* Evento do botão remover prato:

    btnRemover.addEventListener("click", () => {
      cardapio.removerPrato(prato.id);
      alert("Prato removido com sucesso!");
      window.location.reload();
    });

    //* Evento do botão registrar venda:
    btnVender.addEventListener("click", () => {
      venda.registrarVenda(prato);
      alert(`Venda registrada com sucesso! Valor da venda: ${venda.getValorVendaAtual()}
      Faturamento total: ${Venda.getFaturamentoTotal()}`);
      window.location.reload();
    });
  });
}

//*Comportamento do botão cadastrar:
botaoCadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    //tranformando a string em float no formato (0.00)
    const precoFormatado = Number(
      precoPrato.value.replace("R$", "").replace(/\./g, "").replace(",", "."),
    );

    let prato : IPratos;
    if (categoria.value === "Lanches") {
      prato = new Lanche (
        crypto.randomUUID(), //Id de criação automático , convertido para String
        nomePrato.value,
        precoFormatado, // A classe vai receber o preço formatado
        imagemPrato.value,
        descricaoPrato.value,
      );
    } else if (categoria.value === "Bebidas") {
      prato = new Bebida (
        crypto.randomUUID(), //Id de criação automático , convertido para String
        nomePrato.value,
        precoFormatado, // A classe vai receber o preço formatado
        imagemPrato.value,
        descricaoPrato.value,
      );
    } else {
      throw new Error("Categoria inválida selecionada.");
    }
    cardapio.adicionarPrato(prato);

  } catch (error) {
    alert("Por favor, preencha todos os campos para cadastrar o prato.");
    console.log(error);
    return;
  }
  alert("Prato cadastrado com sucesso!");

  nomePrato.value = "";
  precoPrato.value = "";
  imagemPrato.value = "";
  descricaoPrato.value = "";
  // categoria.value = "";

  RenderizarPrato();
});

// Verificando se o cardapio esta vazio e adicionando pratos iniciais para facilitar os testes
if (cardapio.listarPratos().length === 0) {
  cardapio.adicionarPrato(new Lanche(
    crypto.randomUUID(),
    "Sanduíche Sertanejo de Carne de Sol",
    32.0,
    "https://images.unsplash.com/photo-1550547660-d9450f859349",
    "Pão artesanal recheado com carne de sol desfiada, queijo coalho grelhado, cebola roxa caramelizada e maionese da casa.",
  ));
  cardapio.adicionarPrato(new Lanche(
    crypto.randomUUID(),
    "Pizza Margherita",
    45.0,
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Massa de longa fermentação, molho pelati, manjericão e mussarela.",
  ));

  cardapio.adicionarPrato(new Lanche(
    crypto.randomUUID(),
    "Wrap Rústico de Costela",
    35.0,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3F4N2oRzxrytbpkveqB_qB0Vq6rnmLQXQw&s",

    "Wrap de tortilla recheado com costela bovina desfiada, molho barbecue artesanal, mix de folhas e queijo muçarela derretido.",
  ));
}

//*Chamando a função de renderizar os pratos logo que a página seja carregada.
RenderizarPrato();
venda.renderizarVendas();
