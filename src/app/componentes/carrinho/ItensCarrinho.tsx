import Button from "../Button";
import { ItemCarrinho } from "../Produtopizza";

// Interface para as props do componente
interface ItensCarrinhoProps {
  carrinhoVazio: boolean;
  itens: ItemCarrinho[];
  setItens: React.Dispatch<React.SetStateAction<ItemCarrinho[]>>;
  calcularTotal: (itensCarrinho: ItemCarrinho[]) => void;
  total: number , 
  avancarEtapa: () => void;
}




export default function ItensCarrinho({
  carrinhoVazio,
  itens,
  setItens,
  calcularTotal,
  total  ,
  avancarEtapa

}: ItensCarrinhoProps) {
  
    const alterarQuantidade = (index: number, novaQuantidade: number): void => {
    if (novaQuantidade < 1) return;

    const novosItens = [...itens];
    novosItens[index].quantidade = novaQuantidade;
    setItens(novosItens);
    localStorage.setItem("carrinho", JSON.stringify(novosItens));
    calcularTotal(novosItens);
 


};
const removerItem = (index: number): void => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
    calcularTotal(novosItens);
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-white mb-6">Seu Carrinho</h1>
    
    {carrinhoVazio ? (
      <div className="bg-[#1A1A1D] text-white p-8 rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] flex flex-col items-center">
        <svg className="w-20 h-20 mb-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <p className="text-xl mb-6">Seu carrinho está vazio</p>
        <Button
          color="bg-[#F97316]"
          className="py-2 px-6"
          onClick={() => window.location.href = '/'}
        >
          Voltar para o Cardápio
        </Button>
      </div>
    ) : (
      <>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-4">
                <h2 className="text-xl font-semibold text-white mb-4">Itens do Pedido</h2>
                
                <div className="space-y-4">
                  {itens.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.tamanho}`} 
                      className="flex items-center justify-between bg-[#2D2D30] p-4 rounded-md"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                          {item.imagem ? (
                            <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              Sem img
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-white font-medium">{item.nome}</h3>
                          <p className="text-gray-400 text-sm">Tamanho: {item.tamanho}</p>
                          <p className="text-[#F97316] font-medium">R$ {item.preco.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-[#1A1A1D] rounded-md">
                          <button 
                            className="px-3 py-1 text-white hover:text-[#F97316]"
                            onClick={() => alterarQuantidade(index, item.quantidade - 1)}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-white">{item.quantidade}</span>
                          <button 
                            className="px-3 py-1 text-white hover:text-[#F97316]"
                            onClick={() => alterarQuantidade(index, item.quantidade + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removerItem(index)}
                          className="text-gray-400 hover:text-[#F97316]"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-4">
                <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Taxa de entrega:</span>
                    <span>Grátis</span>
                  </div>
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="flex justify-between text-white font-bold">
                    <span>Total:</span>
                    <span className="text-[#F97316]">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  color="bg-[#F97316]" 
                  className="w-full py-3 font-bold"
                  onClick={avancarEtapa}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
  );
}