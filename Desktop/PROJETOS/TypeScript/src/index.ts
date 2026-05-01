interface Usuario {
    nome: string;
    idade: number;
    ehEstudante: boolean;
}

function saudarUsuario(pessoa: Usuario): string {
    const status = pessoa.ehEstudante ? "estudante de programação" : "visitante";
    
    return `Olá ${pessoa.nome}! Você tem ${pessoa.idade} anos e é um ${status}.`;
}

// Criando um objeto que segue a interface
const novaDesenvolvedora: Usuario = {
    nome: "Jessica",
    idade: 27,
    ehEstudante: true
};

console.log(saudarUsuario(novaDesenvolvedora));


// 1. Função de multiplicação
// Ela recebe dois parâmetros do tipo 'number' e retorna um 'number'
function multiplicar(a: number, b: number): number {
    return a * b;
}

// 2. Função de saudação
// Ela recebe um parâmetro do tipo 'string' e retorna uma 'string'
function saudacao(nome: string): string {
    return "Olá " + nome;
}

// 3. Testando as funções no console
const resultadoMultiplicacao = multiplicar(5, 10);
const mensagemSaudacao = saudacao("Jessica");

console.log(resultadoMultiplicacao); // Deve exibir: 50
console.log(mensagemSaudacao);       // Deve exibir: Olá Jessica


// 1. O Contrato (Interface)
interface Produto {
    nome: string;
    preco: number;
    categoria: string;
}

// 2. A Função que usa o contrato
// Recebe um objeto do tipo 'Produto' e um desconto que é 'number'
function aplicarDesconto(produto: Produto, porcentagem: number): number {
    const desconto = produto.preco * (porcentagem / 100);
    return produto.preco - desconto;
}

// 3. Criando um produto real seguindo as regras
const meuNotebook: Produto = {
    nome: "Notebook Gamer",
    preco: 5000,
    categoria: "Eletrônicos"
};

// 4. Calculando e exibindo o resultado
const precoFinal = aplicarDesconto(meuNotebook, 10); // 10% de desconto

console.log(`O produto ${meuNotebook.nome} com desconto custa: R$ ${precoFinal}`);
interface Produto {
    nome: string;
    preco: number;
    categoria: string;
    descricao?: string; // O '?' indica que este campo não é obrigatório
}

const teclado: Produto = {
    nome: "Teclado Mecânico",
    preco: 250,
    categoria: "Periféricos"
    // Não deu erro, mesmo sem a 'descricao'!
};

const mouse: Produto = {
    nome: "Mouse Óptico",
    preco: 100,
    categoria: "Periféricos",
    descricao: "Mouse com 3200 DPI" // Aqui eu decidi colocar
};

interface Produto {
    nome: string;
    preco: number;
    categoria: string;
}

// Uma lista de produtos (Array de objetos que seguem a interface)
const carrinho: Produto[] = [
    { nome: "Teclado", preco: 150, categoria: "Periféricos" },
    { nome: "Mouse", preco: 80, categoria: "Periféricos" },
    { nome: "Monitor", preco: 900, categoria: "Hardware" }
];

// Função que calcula o total
function calcularTotal(itens: Produto[]): number {
    // Usando o método reduce para somar os preços
    return itens.reduce((soma, item) => soma + item.preco, 0);
}

console.log("Total do Carrinho: R$", calcularTotal(carrinho));

// O preço agora pode ser um número OU uma string
interface ProdutoV2 {
    nome: string;
    preco: number | "Grátis"; 
}

function exibirPreco(item: ProdutoV2) {
    if (item.preco === "Grátis") {
        console.log(`${item.nome} não tem custo de envio.`);
    } else {
        console.log(`${item.nome} custa R$ ${item.preco.toFixed(2)}`);
    }
}

const p1: ProdutoV2 = { nome: "E-book", preco: "Grátis" };
const p2: ProdutoV2 = { nome: "Livro Físico", preco: 50 };

exibirPreco(p1);
exibirPreco(p2);

interface Notificacao {
    id: number;
    mensagem: string;
    prioridade: "baixa" | "media" | "alta"; // Union de literais
}

// 1. Definição da Interface
interface Notificacao {
    id: number;
    mensagem: string;
    prioridade: "baixa" | "media" | "alta";
}

// 2. Função com Union Type e Narrowing
// A entrada pode ser uma string OU um objeto Notificacao
function enviarNotificacao(entrada: string | Notificacao): void {
    
    if (typeof entrada === "string") {
        // O TypeScript agora sabe que 'entrada' é uma string aqui dentro
        console.log(`Notificação simples: ${entrada}`);
    } else {
        // O TypeScript agora sabe que 'entrada' é o objeto Notificacao
        console.log(`[${entrada.prioridade.toUpperCase()}] ID #${entrada.id}: ${entrada.mensagem}`);
    }
}

// 3. Testando as duas formas
const alertaObjeto: Notificacao = {
    id: 101,
    mensagem: "O servidor atingiu 90% de uso de CPU!",
    prioridade: "alta"
};

enviarNotificacao("Sistema iniciado com sucesso."); // Chamada com string
enviarNotificacao(alertaObjeto);                      // Chamada com objeto

// O <T> é o espaço reservado para o tipo que você decidir usar
function retornarValor<T>(valor: T): T {
    return valor;
}

// O TypeScript "adivinha" o tipo baseado no que você passa:
const numero = retornarValor(10);      // Aqui T vira 'number'
const texto = retornarValor("Oi");      // Aqui T vira 'string'

// Você também pode ser explícito:
const booleano = retornarValor<boolean>(true);

// Usando com sua lista de produtos que já existe:
const primeiroProduto = retornarValor(carrinho[0]); 
// O TS sabe que 'primeiroProduto' é do tipo 'Produto'!

// Usando com uma lista de números simples:
const primeiroNumero = retornarValor([1, 2, 3][0]); 
// O TS sabe que 'primeiroNumero' é um 'number'!

// Adicionamos '| undefined' para lidar com listas vazias
function pegarPrimeiro<T>(lista: T[]): T | undefined {
    return lista[0];
}

const nomes = ["Jessica", "Silva"];
const primeiro = pegarPrimeiro(nomes);

// Como pode ser undefined, usamos um 'if' para garantir a segurança
if (primeiro) {
    console.log(primeiro.toUpperCase());
} else {
    console.log("A lista está vazia!");
}

class Desenvolvedor {
    // Propriedades (o que ele tem)
    public nome: string;
    private linguagem: string;

    // Construtor (como ele nasce)
    constructor(nome: string, linguagem: string) {
        this.nome = nome;
        this.linguagem = linguagem;
    }

    // Método (o que ele faz)
    saudar(): string {
        return `Olá, meu nome é ${this.nome} e eu programo em ${this.linguagem}.`;
    }
}

// Instanciando o objeto
const dev = new Desenvolvedor("Jessica", "TypeScript");
console.log(dev.saudar());

// Classe Filha que herda de Desenvolvedor
class Estudante extends Desenvolvedor {
    public moduloAtual: number;

    constructor(nome: string, linguagem: string, moduloAtual: number) {
        // O 'super' chama o construtor da classe pai (Desenvolvedor)
        super(nome, linguagem);
        this.moduloAtual = moduloAtual;
    }

    // Podemos criar um novo método específico para o estudante
    progresso(): string {
        return `Estou no módulo ${this.moduloAtual} de 21. Quase lá!`;
    }
}

// Criando a instância do seu perfil
const jessica = new Estudante("Jessica", "Java/TypeScript", 10);

console.log(jessica.saudar());    // Método que veio da classe pai
console.log(jessica.progresso()); // Método exclusivo da classe filha

// O Contrato
interface IAutomacao {
    nomeProcesso: string;
    executar(): void;
}

// A Classe que "assina" o contrato
class BotLMS implements IAutomacao {
    nomeProcesso: string = "Raspagem de Dados LMS";

    executar(): void {
        console.log(`Iniciando ${this.nomeProcesso}...`);
        // Lógica de scraping aqui
    }
}

const meuBot = new BotLMS();
meuBot.executar();

// Simulando uma função que demora para responder (como um Scraping)
async function buscarDadosDoLMS(id: number): Promise<string> {
    console.log(`Buscando dados do aluno #${id}...`);
    
    // Simula um atraso de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return "Dados capturados com sucesso!";
}

// Função principal para rodar a automação
async function executarAutomacao() {
    console.log("Iniciando sistema...");
    
    const resultado = await buscarDadosDoLMS(14); // O 'await' faz o código esperar aqui
    console.log(resultado);
    
    console.log("Sistema finalizado.");
}

executarAutomacao();

async function buscarDadosComErro(id: number): Promise<string> {
    // Simulando uma falha aleatória (50% de chance)
    const sucesso = Math.random() > 0.5;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sucesso) {
                resolve("Dados capturados com sucesso!");
            } else {
                reject(new Error("Falha ao conectar com o servidor do LMS."));
            }
        }, 1500);
    });
}

async function executarRobo() {
    try {
        console.log("Tentando realizar a raspagem...");
        const resultado = await buscarDadosComErro(14);
        console.log(resultado);
    } catch (error) {
        // O TS sabe que 'error' pode ser qualquer coisa, então tratamos como Error
        if (error instanceof Error) {
            console.error("Erro detectado:", error.message);
        }
    } finally {
        // Este bloco sempre executa, independente de dar erro ou não
        console.log("Limpando cache e fechando navegador...");
    }
}

executarRobo();

