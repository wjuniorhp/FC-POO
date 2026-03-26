import { Prato } from "./Prato";

export class Bebida extends Prato {
  constructor(
    id: string,
    nome: string,
    precoBase: number,
    imagem: string,
    descricao: string,
  ) {
    super(id, nome, precoBase, imagem, descricao, "Bebidas");
  }
  override calcularPrecoFinal() {
    return this.preco*1.1; // Exemplo de cálculo de preço final com um acréscimo de 10%
  }

  override gerarHTML(): string {
    const diferencaPreco = this.calcularPrecoFinal() - this.preco;
    return `
    <h2>${this.nome}</h2>
    <h3>R$ ${this.calcularPrecoFinal().toFixed(2).replace(".", ",")} <span style="color: grey"> = R$ ${this.preco.toFixed(2).replace(".", ",")} + R$ ${diferencaPreco.toFixed(2).replace(".", ",")} </span></h3>
    <img src="${this.imagem}" alt="${this.nome}">
    <p>${this.descricao}</p>
    <p>Categoria: ${this.categoria}</p>
    `;
  }
}