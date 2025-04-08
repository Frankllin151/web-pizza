'use client'
import { useState, useEffect } from 'react';
import { ItemCarrinho } from './Produtopizza';

// Interface para o evento personalizado
interface CarrinhoAtualizadoEvent extends Event {
  detail: { carrinho: ItemCarrinho[] };
}

export default function Carrinho() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Carregar itens do carrinho ao montar o componente
  useEffect(() => {
    // Carregar do localStorage
    const carregarCarrinho = () => {
      const carrinhoSalvo: ItemCarrinho[] = JSON.parse(localStorage.getItem('carrinho') || '[]');
      setItens(carrinhoSalvo);
      calcularTotal(carrinhoSalvo);
    };

    // Carregar inicialmente
    carregarCarrinho();

    // Adicionar listener para atualizações do carrinho
    const handleCarrinhoAtualizado = (e: Event) => {
      const customEvent = e as CarrinhoAtualizadoEvent;
      if (customEvent.detail && customEvent.detail.carrinho) {
        setItens(customEvent.detail.carrinho);
        calcularTotal(customEvent.detail.carrinho);
      }
    };

    window.addEventListener('carrinhoAtualizado', handleCarrinhoAtualizado);

    // Limpar listener
    return () => {
      window.removeEventListener('carrinhoAtualizado', handleCarrinhoAtualizado);
    };
  }, []);

  // Calcular o total do carrinho
  const calcularTotal = (itensCarrinho: ItemCarrinho[]): void => {
    const novoTotal = itensCarrinho.reduce((acc, item) => {
      return acc + (item.preco * item.quantidade);
    }, 0);
    setTotal(novoTotal);
  };

  // Remover item do carrinho
  const removerItem = (index: number): void => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
    calcularTotal(novosItens);
  };

  // Alterar quantidade de um item
  const alterarQuantidade = (index: number, novaQuantidade: number): void => {
    if (novaQuantidade < 1) return;
    
    const novosItens = [...itens];
    novosItens[index].quantidade = novaQuantidade;
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
    calcularTotal(novosItens);
  };

  // Finalizar pedido
  const finalizarPedido = (): void => {
    alert('Pedido finalizado! Total: R$ ' + total.toFixed(2));
    // Aqui você poderia integrar com uma API de pagamentos ou redirecionar para checkout
    // Por enquanto, apenas limpa o carrinho
    setItens([]);
    localStorage.setItem('carrinho', JSON.stringify([]));
    setTotal(0);
    setIsOpen(false);
  };

  return (
    <div className="fixed right-0 top-20 z-50">
      {/* Botão do carrinho (visível quando fechado) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-orange-500 text-white p-3 rounded-l-lg shadow-lg transition-transform hover:scale-105 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        {itens.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {itens.reduce((acc, item) => acc + item.quantidade, 0)}
          </span>
        )}
      </button>

      {/* Painel do carrinho (aparece quando aberto) */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg w-80 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cabeçalho */}
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <h2 className="font-bold text-xl">Seu Carrinho</h2>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Lista de itens */}
          <div className="flex-grow overflow-y-auto p-4">
            {itens.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p className="text-center">Seu carrinho está vazio</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {itens.map((item, index) => (
                  <li key={`${item.id}-${item.tamanho}`} className="bg-gray-50 rounded-lg p-3 relative">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden mr-3">
                        {item.imagem ? (
                          <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            Sem img
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800">{item.nome}</h4>
                        <p className="text-sm text-gray-600">Tamanho: {item.tamanho}</p>
                        <p className="text-sm font-medium text-gray-800">R$ {item.preco.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          className="px-2 py-1 text-gray-600"
                          onClick={() => alterarQuantidade(index, item.quantidade - 1)}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantidade}</span>
                        <button 
                          className="px-2 py-1 text-gray-600"
                          onClick={() => alterarQuantidade(index, item.quantidade + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removerItem(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Resumo e botão de finalizar */}
          {itens.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-gray-800">R$ {total.toFixed(2)}</span>
              </div>
              <button 
                onClick={finalizarPedido}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold"
              >
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}