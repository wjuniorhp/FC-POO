import type { IPratos } from "./interfacePratos";

export class Venda {
  //atributo pertence somente à classe Venda e não ao objeto.
  private static faturamentoTotal: number = 0;
  //atributos privados so podem ser usados dentro da classe.
  private itens: IPratos[] = [];
  private valorVendaAtual: number = 0;

  constructor() {
    Venda.faturamentoTotal = parseFloat(localStorage.getItem("faturamento_total") || "0");
  }

  registrarVenda(prato: IPratos): void {
    this.itens.push(prato);
    const precoItem = prato.calcularPrecoFinal(); // polimorfismo
    this.valorVendaAtual += precoItem;

    Venda.faturamentoTotal += precoItem; // polimorfismo

    // Salvar a venda no localStorage
    const vendas = JSON.parse(localStorage.getItem("vendas_db") || "[]");
    vendas.push({
      itens: this.itens,
      valorVenda: this.valorVendaAtual,
      // data na timezone local no formato ISO 8601
      data: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    });
    localStorage.setItem("vendas_db", JSON.stringify(vendas));

    localStorage.setItem("faturamento_total", Venda.faturamentoTotal.toString());

    this.renderizarVendas();
  }

  public renderizarVendas(): void {
    const vendas = JSON.parse(localStorage.getItem("vendas_db") || "[]");
    const tabelaVendas = document.getElementById("tabela-historico-tbody") as HTMLTableSectionElement;
    tabelaVendas.innerHTML = "";

    vendas.forEach((venda: { itens: IPratos[]; valorVenda: number; data: string }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${venda.itens.map((item) => item.nome).join(", ")}</td>
        <td style="color: green">R$ ${venda.valorVenda.toFixed(2).replace(".", ",")}</td>
        <td>${venda.data}</td>
      `;
      tabelaVendas.appendChild(tr);
    });

    const totalVendasElement = document.getElementById("total-vendas") as HTMLElement;
    console.log("Faturamento Total:", Venda.faturamentoTotal);
    totalVendasElement.innerHTML = Venda.getFaturamentoTotal();
  }

  public getValorVendaAtual(): string {
    return "R$ " + this.valorVendaAtual.toFixed(2).replace(".", ",");
  }

  public static getFaturamentoTotal(): string {
    return "R$ " + Venda.faturamentoTotal.toFixed(2).replace(".", ",");
  }
}
