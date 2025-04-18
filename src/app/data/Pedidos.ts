export interface Pedido {
  id: number;
  cliente: string;
  pizzaId: number;
  quantidade: number;
  tamanho: 'p' | 'm' | 'g' | 'gg'; // Adicionado o tamanho
  status: 'recebido' | 'em preparo' | 'pronto' | 'entregue';
  data: Date;
}

export const pedidos: Pedido[] = [
  {
    id: 1,
    cliente: "João Silva",
    pizzaId: 1, // Corrigido para corresponder ao ID da Pizza Margherita
    quantidade: 2,
    tamanho: 'm',
    status: "recebido",
    data: new Date("2025-04-09T14:30:00"),
  },
  {
    id: 2,
    cliente: "Maria Oliveira",
    pizzaId: 2, // Corrigido para corresponder ao ID da Pizza Portuguesa
    quantidade: 1,
    tamanho: 'g',
    status: "em preparo",
    data: new Date("2025-04-09T14:45:00"),
  },
  {
    id: 3,
    cliente: "Carlos Santos",
    pizzaId: 3, // Corrigido para corresponder ao ID da Pizza Calabresa
    quantidade: 1,
    tamanho: 'p',
    status: "pronto",
    data: new Date(),
  },
  {
    id: 4,
    cliente: "Ana Costa",
    pizzaId: 4, // Corrigido para corresponder ao ID da Pizza Quatro Queijos
    quantidade: 1,
    tamanho: 'gg',
    status: "entregue",
    data: new Date("2025-04-09T12:15:00"),
  },
];