// app/fakeDB.ts

type Usuario = {
  id: number;
  nome: string;
  tipo: "cliente" | "vendedor";
};

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  lojaId: number;
};

// app/fakeDB.ts
export type Loja = {
  id: number;
  nome: string;
  categoria: string;
  vendedorId: number;
  imagem: string;
  avaliacao: number;
};


// "Banco de dados" em memória
let usuarios: Usuario[] = [
  { id: 1, nome: "João Artesão", tipo: "vendedor" },
  { id: 2, nome: "Maria Cliente", tipo: "cliente" },
];

const produtos: Produto[] = [
  { id: 1, nome: "Escultura", preco: 120, imagem: "/assets/escultura.jpg", lojaId: 1 },
  { id: 2, nome: "Pintura", preco: 80, imagem: "/assets/pintura.jpg", lojaId: 1 },
];

let lojas: Loja[] = [
  {
    id: 1,
    nome: "Artes da Bahia",
    categoria: "Escultura",
    vendedorId: 1,
    imagem: "/assets/artes da bahia.jpg",
    avaliacao: 4.7,
  },
  {
    id: 2,
    nome: "Bordados da Lúcia",
    categoria: "Bordado",
    vendedorId: 2,
    imagem: "/assets/bordados da lucia.jpg",
    avaliacao: 4.9,
  },
  {
    id: 3,
    nome: "Loja da Ana",
    categoria: "Escultura",
    vendedorId: 3,
    imagem: "/assets/Loja da ana.jpg",
    avaliacao: 4.5,
  },
  {
    id: 4,
    nome: "Artesanato da Clara",
    categoria: "Artesanato",
    vendedorId: 1,
    imagem: "/assets/artesanato.jpg",
    avaliacao: 4.8,
  },
  {
    id: 5,
    nome: "Bijuterias da Ana",
    categoria: "Bijuteria",
    vendedorId: 2,
    imagem: "/assets/Bijuteria.jpg",
    avaliacao: 4.6,
  },
  {
    id: 6,
    nome: "Artesanato da Joana",
    categoria: "Artesanato",
    vendedorId: 3,
    imagem: "/assets/artesanato da joana.jpg",
    avaliacao: 4.9,
  },
];

// Funções para simular ações
export function getUsuarioPorNome(nome: string): Usuario | undefined {
  return usuarios.find((u) => u.nome === nome);
}

export function listarLojas(): Loja[] {
  return lojas;
}

export function listarProdutosDoVendedor(lojaId: number): Produto[] {
  return produtos.filter((p) => p.lojaId === lojaId);
}

export function adicionarProduto(produto: Produto) {
  produtos.push(produto);
}