export interface Pizza {
  id: number;
  nome: string;
  tamanhos: {
    p: number;
    m: number;
    g: number;
    gg: number;
  };
  imagem: string;
  descricao: string;
}

const pizzas = [
  {
    id: 1,
    nome: "Pizza Margherita",
    tamanhos: {
      p: 25.9,
      m: 35.9,
      g: 45.9,
      gg: 55.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, manjericão fresco e azeite de oliva",
  },
  {
    id: 2,
    nome: "Pizza Portuguesa",
    tamanhos: {
      p: 30.9,
      m: 40.9,
      g: 52.9,
      gg: 62.9,
    },
    imagem: "/pizza/pizza.png",
    descricao:
      "Molho de tomate, presunto, ovos, cebola, azeitonas, ervilha e queijo mussarela",
  },
  {
    id: 3,
    nome: "Pizza Calabresa",
    tamanhos: {
      p: 28.9,
      m: 38.9,
      g: 47.9,
      gg: 57.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, linguiça calabresa, cebola e queijo mussarela",
  },
  {
    id: 4,
    nome: "Pizza Quatro Queijos",
    tamanhos: {
      p: 32.9,
      m: 42.9,
      g: 54.9,
      gg: 64.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
  },
  {
    id: 5,
    nome: "Pizza Frango com Catupiry",
    tamanhos: {
      p: 29.9,
      m: 39.9,
      g: 49.9,
      gg: 59.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, frango desfiado, catupiry e queijo mussarela",
  },
  {
    id: 6,
    nome: "Pizza Vegetariana",
    tamanhos: {
      p: 26.9,
      m: 36.9,
      g: 46.9,
      gg: 56.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, abobrinha, berinjela, pimentão e queijo mussarela",
  },
  {
    id: 7,
    nome: "Pizza Pepperoni",
    tamanhos: {
      p: 30.9,
      m: 40.9,
      g: 50.9,
      gg: 60.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, pepperoni e queijo mussarela",
  },
  {
    id: 8,
    nome: "Pizza Napolitana",
    tamanhos: {
      p: 28.9,
      m: 38.9,
      g: 48.9,
      gg: 58.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, mussarela, parmesão e orégano",
  },
  {
    id: 9,
    nome: "Pizza Mexicana",
    tamanhos: {
      p: 35.9,
      m: 45.9,
      g: 55.9,
      gg: 65.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, carne moída, pimenta jalapeño e queijo cheddar",
  },
  {
    id: 10,
    nome: "Pizza Bacon",
    tamanhos: {
      p: 33.9,
      m: 43.9,
      g: 53.9,
      gg: 63.9,
    },
    imagem: "/pizza/pizza.png",
    descricao: "Molho de tomate, bacon crocante e queijo mussarela",
  },
];

export default pizzas;