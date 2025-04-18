"use client"
import { useState } from 'react';
import  pizzas  from '../data/produtopizza';
import { Pedido} from '../data/Pedidos';
export default function SalesReport({ pedidos }: { pedidos: Pedido[] }) {
  const [periodoFiltro, setPeriodoFiltro] = useState('hoje');

  // Filtrar pedidos baseado no período selecionado
  const filtrarPorPeriodo = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const semanaPassada = new Date(hoje);
    semanaPassada.setDate(hoje.getDate() - 7);
    
    const mesPassado = new Date(hoje);
    mesPassado.setMonth(hoje.getMonth() - 1);
    
    switch (periodoFiltro) {
      case 'hoje':
        return pedidos.filter(p => p.data >= hoje);
      case 'semana':
        return pedidos.filter(p => p.data >= semanaPassada);
      case 'mes':
        return pedidos.filter(p => p.data >= mesPassado);
      default:
        return pedidos;
    }
  };

  const pedidosFiltrados = filtrarPorPeriodo();
  
  // Calcular total de vendas
  const totalVendas = pedidosFiltrados.reduce((total, pedido) => {
    const pizza = pizzas.find(pizza => pizza.id === pedido.pizzaId);
    // Usando o tamanho médio ('m') como padrão
    
    
    return total + (pizza ? pizza.tamanhos.m * pedido.quantidade : 0);
  }, 0);



  
  
  

  
  // Contar pedidos por status
  const pedidosPorStatus = {
    recebido: pedidosFiltrados.filter(p => p.status === 'recebido').length,
    emPreparo: pedidosFiltrados.filter(p => p.status === 'em preparo').length,
    pronto: pedidosFiltrados.filter(p => p.status === 'pronto').length,
    entregue: pedidosFiltrados.filter(p => p.status === 'entregue').length
  };

  return (
    <div className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Relatório de Vendas</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setPeriodoFiltro('hoje')}
            className={`px-3 py-1 rounded-md ${periodoFiltro === 'hoje' ? 'bg-[#F97316] text-white' : 'bg-gray-100'}`}
          >
            Hoje
          </button>
          <button 
            onClick={() => setPeriodoFiltro('semana')}
            className={`px-3 py-1 rounded-md ${periodoFiltro === 'semana' ? 'bg-[#F97316] text-white' : 'bg-gray-100'}`}
          >
            Semana
          </button>
          <button 
            onClick={() => setPeriodoFiltro('mes')}
            className={`px-3 py-1 rounded-md ${periodoFiltro === 'mes' ? 'bg-[#F97316] text-white' : 'bg-gray-100'}`}
          >
            Mês
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total de Vendas" value={`R$ ${totalVendas.toFixed(2)}`} bgColor="bg-blue-50" />
        <StatCard title="Pedidos" value={pedidosFiltrados.length} bgColor="bg-green-50" />
        <StatCard title="Ticket Médio" value={`R$ ${pedidosFiltrados.length ? (totalVendas / pedidosFiltrados.length).toFixed(2) : '0.00'}`} bgColor="bg-purple-50" />
        <StatCard title="Entregues" value={pedidosPorStatus.entregue} bgColor="bg-orange-50" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Status dos Pedidos</h3>
          <div className="space-y-3">
            <StatusBar label="Recebidos" value={pedidosPorStatus.recebido} total={pedidosFiltrados.length} color="bg-blue-400" />
            <StatusBar label="Em Preparo" value={pedidosPorStatus.emPreparo} total={pedidosFiltrados.length} color="bg-yellow-400" />
            <StatusBar label="Prontos" value={pedidosPorStatus.pronto} total={pedidosFiltrados.length} color="bg-green-400" />
            <StatusBar label="Entregues" value={pedidosPorStatus.entregue} total={pedidosFiltrados.length} color="bg-gray-400" />
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Pizzas Mais Vendidas</h3>
          <div className="space-y-2">
            {topPizzasVendidas(pedidosFiltrados).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.nome}</span>
                <span className="font-semibold">{item.quantidade} unidades</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para calcular as pizzas mais vendidas
function topPizzasVendidas(pedidos: Pedido[]) {
  const contador: Record<number, number> = {};
  
  // Contar quantidade vendida de cada pizza
  pedidos.forEach(pedido => {
    contador[pedido.pizzaId] = (contador[pedido.pizzaId] || 0) + pedido.quantidade;
  });
  
  // Transformar em array para ordenar
  const pizzasVendidas = Object.entries(contador).map(([pizzaId, quantidade]) => {
    const pizza = pizzas.find(p => p.id === parseInt(pizzaId));
    return {
      pizzaId: parseInt(pizzaId),
      nome: pizza ? pizza.nome : 'Pizza não encontrada',
      quantidade
    };
  });
  
  // Ordenar pelo maior número de vendas
  return pizzasVendidas.sort((a, b) => b.quantidade - a.quantidade).slice(0, 5);
}

function StatCard({ title, value, bgColor }: { title: string, value: string | number, bgColor: string }) {
  return (
    <div className={`${bgColor} p-4 rounded-md`}>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBar({ label, value, total, color }: { label: string, value: number, total: number, color: string }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{value} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}