import type { IPratos } from "./interfacePratos";

export class Prato implements IPratos {
  constructor(
    public readonly id: string,
    public nome: string,
    public preco: number,
    public imagem: string,
    public descricao: string,
    public categoria: string,
  ) {}

  //  protected calcularPrecoFinal(): number {
  //   return this.preco;
  // }

  validarPrato() {
    if (
      !this.nome ||
      !this.preco ||
      !this.imagem ||
      !this.descricao ||
      this.categoria === "default"
    ) {
      throw new Error("Por favor, preencha todos os campos.");
    }
  }
  calcularPrecoFinal() {
    return this.preco;
  }

  gerarHTML(): string {
    return `
    <h2>${this.nome}</h2>
    <h3>R$ ${this.preco.toFixed(2).replace(".", ",")}</h3>
    <img src="${this.imagem}" alt="${this.nome}">
    <p>${this.descricao}</p>
    <p>Categoria: ${this.categoria}</p>
    `;
  }
}
