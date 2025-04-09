import  pizzas  from '../data/produtopizza';
import { Pedido } from '../data/Pedidos';
export default function DeliveryStatus({ pedidos }: { pedidos: Pedido[] }) {
  // Função para obter o nome da pizza pelo ID
  const getPizzaName = (pizzaId: number): string => {
    const pizza = pizzas.find(p => p.id === pizzaId);
    return pizza ? pizza.nome : 'Pizza não encontrada';
  };
  
  // Função para obter a cor do status
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'recebido': return 'bg-blue-100 text-blue-800';
      case 'em preparo': return 'bg-yellow-100 text-yellow-800';
      case 'pronto': return 'bg-green-100 text-green-800';
      case 'entregue': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-6">
      <h2 className="text-xl font-bold mb-4">Status de Entrega</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pizza</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pedido.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getPizzaName(pedido.pizzaId)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.quantidade}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pedido.status)}`}>
                    {pedido.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pedido.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-[#F97316] hover:text-orange-700">Atualizar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}