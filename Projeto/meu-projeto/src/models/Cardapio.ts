import type { IPratos } from "./interfacePratos";
import { Prato } from "./Prato";
import { Lanche } from "./Lanche";
import { Bebida } from "./Bebida";

export class Cardapio {
    private pratos: IPratos[] = [];
    public static totalPratos: number = 0;

    constructor() {
        this.carregarDados();
    }

    public listarPratos(): IPratos[]
    {
        return this.pratos;
    }

    adicionarPrato(prato: IPratos): void
    {
        try {
            prato.validarPrato();
            this.pratos.push(prato);
            this.salvarDados();
            Cardapio.totalPratos++;
        } catch (error) {
            console.error("Erro ao validar prato:", error);
            throw error;
        }
    }

    removerPrato(id: string): void
    {
        this.pratos = this.pratos.filter((prato) => prato.id !== id);
        this.salvarDados();
        Cardapio.totalPratos--;
    }

    salvarDados(): void
    {
        localStorage.setItem('cardapio_db', JSON.stringify(this.pratos));
    }

    private carregarDados() : void
    {
        const dados = localStorage.getItem('cardapio_db');
        if (!dados) return;
        
        const pratosBrutos = JSON.parse(dados);
    
        this.pratos = pratosBrutos.map((p: { id: string; nome: string; preco: number; imagem: string; descricao: string; categoria: string; }) => {
            if (p.categoria === "Bebidas") {
                return new Bebida(p.id, p.nome, p.preco, p.imagem, p.descricao);
            } else if (p.categoria === "Lanches") {
                return new Lanche(p.id, p.nome, p.preco, p.imagem, p.descricao);
            } else {
                return new Prato(p.id, p.nome, p.preco, p.imagem, p.descricao, p.categoria);
            }
        });

        Cardapio.totalPratos = this.pratos.length;
    }
}