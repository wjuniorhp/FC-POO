import { Prato } from "./Prato";

export class Lanche extends Prato {
  constructor(
    id: string,
    nome: string,
    preco: number,
    imagem: string,
    descricao: string,
  ) {
    super(id, nome, preco, imagem, descricao, "Lanches");
  }
  override calcularPrecoFinal(): number {
    return this.preco;
  }
}
