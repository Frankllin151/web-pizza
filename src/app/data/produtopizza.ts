export interface Pizza {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

const pizzas = [
  {
    id: 1,
    nome: "Pizza Margherita",
    preco: 45.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, manjericão fresco e azeite de oliva",
  },
  {
    id: 2,
    nome: "Pizza Portuguesa",
    preco: 52.9,
    imagem: "/pizza/pizza.png",
    descricao:
      "Molho de tomate, presunto, ovos, cebola, azeitonas, ervilha e queijo mussarela",
  },
  {
    id: 3,
    nome: "Pizza Calabresa",
    preco: 47.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, linguiça calabresa, cebola e queijo mussarela",
  },
  {
    id: 4,
    nome: "Pizza Quatro Queijos",
    preco: 54.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
  },
  {
    id: 5,
    nome: "Pizza Frango com Catupiry",
    preco: 49.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, frango desfiado, catupiry e queijo mussarela",
  },
  {
    id: 6,
    nome: "Pizza Vegetariana",
    preco: 46.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, abobrinha, berinjela, pimentão e queijo mussarela",
  },
  {
    id: 7,
    nome: "Pizza Pepperoni",
    preco: 50.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, pepperoni e queijo mussarela",
  },
  {
    id: 8,
    nome: "Pizza Napolitana",
    preco: 48.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, parmesão e orégano",
  },
  {
    id: 9,
    nome: "Pizza Mexicana",
    preco: 55.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, carne moída, pimenta jalapeño e queijo cheddar",
  },
  {
    id: 10,
    nome: "Pizza Bacon",
    preco: 53.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, bacon crocante e queijo mussarela",
  },
  {
    id: 11,
    nome: "Pizza Carbonara",
    preco: 56.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho branco, bacon, parmesão e ovo",
  },
  {
    id: 12,
    nome: "Pizza Alho e Óleo",
    preco: 44.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, alho frito, azeite e queijo mussarela",
  },
  {
    id: 13,
    nome: "Pizza Palmito",
    preco: 51.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, palmito, azeitonas e queijo mussarela",
  },
  {
    id: 14,
    nome: "Pizza Marguerita Especial",
    preco: 57.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela de búfala, manjericão fresco e azeite",
  },
  {
    id: 15,
    nome: "Pizza Camarão",
    preco: 65.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, camarão, catupiry e queijo mussarela",
  },
  {
    id: 16,
    nome: "Pizza Chocolate",
    preco: 42.9,
    imagem: "/pizza/pizza.png",
    descricao: "Chocolate ao leite derretido e granulado",
  },
  {
    id: 17,
    nome: "Pizza Banana com Canela",
    preco: 43.9,
    imagem: "/pizza/pizza.png",
    descricao: "Banana fatiada, açúcar, canela e leite condensado",
  },
  {
    id: 18,
    nome: "Pizza Romeu e Julieta",
    preco: 45.9,
    imagem: "/pizza/pizza.png",
    descricao: "Goiabada e queijo cremoso",
  },
  {
    id: 19,
    nome: "Pizza Abacaxi",
    preco: 46.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, abacaxi e queijo mussarela",
  },
  {
    id: 20,
    nome: "Pizza Especial da Casa",
    preco: 60.9,
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, ingredientes secretos e queijo especial",
  },
];

export default pizzas;