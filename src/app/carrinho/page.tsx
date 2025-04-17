'use client'
import { useState, useEffect } from 'react';
import Header from "../componentes/header";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";
import Button from "../componentes/Button";
import { ItemCarrinho } from '../componentes/Produtopizza';
import ItensCarrinho from '../componentes/carrinho/ItensCarrinho';
import DadosEntrega from '../componentes/carrinho/DadosEnrega';
// Interface para o evento personalizado
interface CarrinhoAtualizadoEvent extends Event {
  detail: { carrinho: ItemCarrinho[] };
}

// Interface para dados de entrega
interface DadosEntrega {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
}

// Métodos de pagamento
const METODOS_PAGAMENTO = [
  { id: 'dinheiro', nome: 'Dinheiro' },
  { id: 'cartao', nome: 'Cartão na entrega' },
  { id: 'pix', nome: 'PIX' }
];

export default function Carrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [etapaAtual, setEtapaAtual] = useState<number>(1);
  const [metodoPagamento, setMetodoPagamento] = useState<string>('dinheiro');
  const [dadosEntrega, setDadosEntrega] = useState<DadosEntrega>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: ''
  });

  // Carregar itens do carrinho ao montar o componente
  useEffect(() => {
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

  

  // Gerenciar mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosEntrega(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para avançar para próxima etapa
  const avancarEtapa = () => {
    setEtapaAtual(etapaAtual + 1);
  };

  // Função para voltar para etapa anterior
  const voltarEtapa = () => {
    setEtapaAtual(etapaAtual - 1);
  };

  // Função para finalizar pedido
  const finalizarPedido = () => {
    // Aqui você conectaria com sua API para processar o pedido
    alert(`Pedido finalizado com sucesso! Total: R$ ${total.toFixed(2)}`);
    
    // Limpar carrinho após finalização
    setItens([]);
    localStorage.setItem('carrinho', JSON.stringify([]));
    
    // Resetar para a primeira etapa
    setEtapaAtual(1);
  };

  // Verificar se existem itens no carrinho
  const carrinhoVazio = itens.length === 0;

  // Renderizar etapa atual
  const renderizarEtapa = () => {
    switch (etapaAtual) {
      case 1: // Itens do carrinho
        return (
          <ItensCarrinho
  carrinhoVazio={carrinhoVazio}
  itens={itens}
  setItens={setItens}
  calcularTotal={calcularTotal}
  total={total}
  avancarEtapa={avancarEtapa}
  
/>
        );
        
      case 2: // Dados para entrega
        return (
          <DadosEntrega
          handleInputChange={handleInputChange}
          dadosEntrega={dadosEntrega}
          total={total}
          voltarEtapa={voltarEtapa}
          avancarEtapa={avancarEtapa}
          itens={itens} // Passando a propriedade 'itens'
        />
        );
        
      case 3: // Pagamento e confirmação
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-6">Pagamento e Confirmação</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Forma de Pagamento</h2>
                  
                  <div className="space-y-3 mb-6">
                    {METODOS_PAGAMENTO.map(metodo => (
                      <div key={metodo.id} className="flex items-center">
                        <input
                          type="radio"
                          id={metodo.id}
                          name="metodo-pagamento"
                          value={metodo.id}
                          checked={metodoPagamento === metodo.id}
                          onChange={() => setMetodoPagamento(metodo.id)}
                          className="mr-2 accent-[#F97316]"
                        />
                        <label htmlFor={metodo.id} className="text-white cursor-pointer">
                          {metodo.nome}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {metodoPagamento === "cartao" && 
  <div className="bg-[#2D2D30] p-4 rounded-md mb-6">
    <p className="text-white text-sm mb-4">
      Insira os dados do cartão para processar o pagamento.
    </p>

    {/* Inputs para pagamento via cartão */}
    <div className="space-y-4">
      <div>
        <InputLabel htmlFor="nomeCartao">Nome no Cartão</InputLabel>
        <TextInput
          id="nomeCartao"
          name="nomeCartao"
          type="text"
          placeholder="Digite o nome como está no cartão"
          value=""
          onChange={handleInputChange}
          className="w-full mt-1 text-white"
        />
      </div>

      <div>
        <InputLabel htmlFor="numeroCartao">Número do Cartão</InputLabel>
        <TextInput
          id="numeroCartao"
          name="numeroCartao"
          type="text"
          placeholder="0000 0000 0000 0000"
         value=""
          onChange={handleInputChange}
          className="w-full mt-1 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputLabel htmlFor="validadeCartao">Validade</InputLabel>
          <TextInput
            id="validadeCartao"
            name="validadeCartao"
            type="text"
            placeholder="MM/AA"
            value=""
            onChange={handleInputChange}
            className="w-full mt-1 text-white"
          />
        </div>
        <div>
          <InputLabel htmlFor="cvv">CVV</InputLabel>
          <TextInput
            id="cvv"
            name="cvv"
            type="text"
            placeholder="123"
           value=""
            onChange={handleInputChange}
            className="w-full mt-1 text-white"
          />
        </div>
      </div>
    </div>
  </div>
}
                  
                  {metodoPagamento === 'pix' && (
                    <div className="bg-[#2D2D30] p-4 rounded-md mb-6">
                      <p className="text-white text-sm">
                        Após confirmar o pedido, você receberá as instruções de pagamento via PIX.
                      </p>
                    </div>
                  )}
                  {metodoPagamento === "cartao" && 
                  <div className='bg-[#2D2D30] p-4 rounded-md mb-6'>
                    <p className='text-white text-sm'>
                      Após cofirmar verificar no seu email
                    </p>
                  </div>
                  }
                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">Endereço de Entrega</h2>
                  
                  <div className="bg-[#2D2D30] p-4 rounded-md mb-6">
                    <p className="text-white">
                      {dadosEntrega.nome}
                    </p>
                    <p className="text-gray-300">
                      {dadosEntrega.endereco}, {dadosEntrega.numero}
                      {dadosEntrega.complemento && ` - ${dadosEntrega.complemento}`}
                    </p>
                    <p className="text-gray-300">
                      {dadosEntrega.bairro} - {dadosEntrega.cidade}
                    </p>
                    <p className="text-gray-300 mt-2">
                      Telefone: {dadosEntrega.telefone}
                    </p>
                    <p className="text-gray-300">
                      E-mail: {dadosEntrega.email}
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <div className="bg-[#2D2D30] p-4 rounded-md">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="termos"
                          className="mr-2 accent-[#F97316]"
                        />
                        <label htmlFor="termos" className="text-gray-300 text-sm">
                          Concordo com os termos e condições e políticas de privacidade
                        </label>
                      </div>
                      
                      <Button
                        color="bg-[#F97316]" 
                        className="w-full py-3 font-bold"
                        onClick={finalizarPedido}
                      >
                        Finalizar Pedido
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-4 sticky top-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
                  
                  <div className="space-y-2 mb-4">
                    {itens.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-300 text-sm">
                        <span>{item.quantidade}x {item.nome}</span>
                        <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-700 my-2"></div>
                    
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
                  
                  <div>
                    <Button
                      color="bg-[#1A1A1D]" 
                      className="w-full py-2 border border-gray-700 mb-2"
                      onClick={voltarEtapa}
                    >
                      Voltar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#2D2D30] pt-24 pb-16">
        {/* Indicador de progresso */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual >= 1 ? 'bg-[#F97316] text-white' : 'bg-gray-700 text-gray-400'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${etapaAtual >= 2 ? 'bg-[#F97316]' : 'bg-gray-700'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual >= 2 ? 'bg-[#F97316] text-white' : 'bg-gray-700 text-gray-400'}`}>
                2
              </div>
              <div className={`h-1 w-16 ${etapaAtual >= 3 ? 'bg-[#F97316]' : 'bg-gray-700'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual >= 3 ? 'bg-[#F97316] text-white' : 'bg-gray-700 text-gray-400'}`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={etapaAtual === 1 ? 'text-[#F97316] font-medium' : 'text-gray-400'}>Carrinho</span>
            <span className={etapaAtual === 2 ? 'text-[#F97316] font-medium' : 'text-gray-400'}>Endereço</span>
            <span className={etapaAtual === 3 ? 'text-[#F97316] font-medium' : 'text-gray-400'}>Pagamento</span>
          </div>
        </div>
        
        {/* Conteúdo da etapa atual */}
        {renderizarEtapa()}
      </main>
    </>
  );
}