export interface IPratos {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
  categoria: string;
  validarPrato(): void;
  calcularPrecoFinal(): number;
  gerarHTML(): string;
}