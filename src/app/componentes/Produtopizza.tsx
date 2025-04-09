'use client'
import { useState } from 'react';

// Definir interfaces para as props e outros tipos
interface TamanhoProps {
  id: string;
  label: string;
  multiplicador: number;
}

interface ProdutoPizzaProps {
  id: number;
  nome: string;
  preco: number;
  imagem?: string; // Opcional
  descricao: string;
}

// Interface para os itens do carrinho
export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  tamanho: string;
  quantidade: number;
  imagem?: string;
}

export default function ProdutoPizza({ id, nome, preco, imagem, descricao }: ProdutoPizzaProps) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('M');
  const [quantidadeExibida, setQuantidadeExibida] = useState<number>(1);
  
  const tamanhos: TamanhoProps[] = [
    { id: 'P', label: 'P', multiplicador: 0.8 },
    { id: 'M', label: 'M', multiplicador: 1 },
    { id: 'G', label: 'G', multiplicador: 1.3 },
    { id: 'GG', label: 'GG', multiplicador: 1.5 }
  ];

  const getTamanhoMultiplicador = (): number => {
    return tamanhos.find(t => t.id === tamanhoSelecionado)?.multiplicador || 1;
  };

  const precoFinal = (preco * getTamanhoMultiplicador()).toFixed(2);

  const adicionarAoCarrinho = (): void => {
    // Buscar o carrinho atual do localStorage
    const carrinhoAtual: ItemCarrinho[] = JSON.parse(localStorage.getItem('carrinho') || '[]');
    
    // Verificar se este produto já existe no carrinho com o mesmo tamanho
    const itemExistente = carrinhoAtual.findIndex(
      item => item.id === id && item.tamanho === tamanhoSelecionado
    );
    
    if (itemExistente >= 0) {
      // Se existe, incrementar quantidade
      carrinhoAtual[itemExistente].quantidade += quantidadeExibida;
    } else {
      // Se não existe, adicionar novo item
      carrinhoAtual.push({
        id,
        nome,
        preco: parseFloat(precoFinal),
        tamanho: tamanhoSelecionado,
        quantidade: quantidadeExibida,
        imagem
      });
    }
    
    // Salvar carrinho atualizado
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    
    // Disparar evento personalizado para notificar outros componentes da atualização
    const event = new CustomEvent('carrinhoAtualizado', { 
      detail: { carrinho: carrinhoAtual } 
    });
    window.dispatchEvent(event);
    
    // Feedback visual opcional
    alert(`${nome} (${tamanhoSelecionado}) adicionado ao carrinho!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        {imagem ? (
          <img
            src={imagem}
            alt={nome}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold">
          R$ {precoFinal}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{nome}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{descricao}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {tamanhos.map((tamanho) => (
              <button
                key={tamanho.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${
                  tamanhoSelecionado === tamanho.id
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => setTamanhoSelecionado(tamanho.id)}
              >
                {tamanho.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <button 
              className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center"
              onClick={() => setQuantidadeExibida(Math.max(1, quantidadeExibida - 1))}
            >
              <span className="text-gray-700 font-bold">-</span>
            </button>
            <span className="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-800">
              {quantidadeExibida}
            </span>
            <button 
              className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center"
              onClick={() => setQuantidadeExibida(quantidadeExibida + 1)}
            >
              <span className="text-gray-700 font-bold">+</span>
            </button>
          </div>
        </div>
        
        <button
          onClick={adicionarAoCarrinho}
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center font-medium transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}