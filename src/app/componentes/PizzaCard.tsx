import Image from 'next/image';
import { Pizza } from '../data/produtopizza';

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <div className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-4">
      <div className="relative h-48 mb-4">
       
         <img
            src={pizza.imagem}
            alt={pizza.nome}
            className="object-contain w-full h-full rounded-md"
          />
      </div>
      <h3 className="text-lg font-semibold">{pizza.nome}</h3>
      <p className="text-gray-600 text-sm mb-2">{pizza.descricao}</p>
      <div className="flex justify-between items-center">
        <span className="text-[#F97316] font-bold">R$ {pizza.preco.toFixed(2)}</span>
        <button className="bg-[#F97316] text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors">
          Editar
        </button>
      </div>
    </div>
  );
}
