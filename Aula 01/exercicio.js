class Circulo {
    constructor(raio=1) {
        this.raio = raio;
    }
    calcularArea() {
        return Math.PI * Math.pow(this.raio, 2);
    }
}

class Retangulo {
    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return this.base * this.altura;
    }
}

class Triangulo {
    constructor(l1, l2, l3) {
        if (l1 + l2 <= l3 || l1 + l3 <= l2 || l2 + l3 <= l1) {
            throw new Error('Os lados não podem formar um triângulo');
        }
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
    }
    calcularArea() {
        const p = (this.l1 + this.l2 + this.l3) / 2;
        return Math.sqrt(p * (p - this.l1) * (p - this.l2) * (p - this.l3));
    }
}

const circulo = new Circulo();
console.log(circulo);

const retangulo = new Retangulo(10, 20);
console.log(retangulo);

const triangulo = new Triangulo(10, 20, 30);
console.log(triangulo);