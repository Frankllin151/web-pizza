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
    pizzaId: 20,
    quantidade: 2,
    tamanho: 'm', // Adicionado o tamanho
    status: "recebido",
    data: new Date("2025-04-09T14:30:00"),
  },
  {
    id: 2,
    cliente: "Maria Oliveira",
    pizzaId: 21,
    quantidade: 1,
    tamanho: 'g', // Adicionado o tamanho
    status: "em preparo",
    data: new Date("2025-04-09T14:45:00"),
  },
  {
    id: 3,
    cliente: "Carlos Santos",
    pizzaId: 22,
    quantidade: 3,
    tamanho: 'p', // Adicionado o tamanho
    status: "pronto",
    data: new Date("2025-04-09T13:20:00"),
  },
  {
    id: 4,
    cliente: "Ana Costa",
    pizzaId: 20,
    quantidade: 1,
    tamanho: 'gg', // Adicionado o tamanho
    status: "entregue",
    data: new Date("2025-04-09T12:15:00"),
  },
];