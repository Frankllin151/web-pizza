import { Pizza } from '../data/produtopizza';

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="relative h-48 mb-4">
        <img
          src={pizza.imagem}
          alt={pizza.nome}
          className="object-contain w-full h-full rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold">{pizza.nome}</h3>
      <p className="text-gray-600 text-sm mb-2">{pizza.descricao}</p>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Pequena (P):</span>
          <span className="text-[#F97316] font-bold">R$ {pizza.tamanhos.p.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Média (M):</span>
          <span className="text-[#F97316] font-bold">R$ {pizza.tamanhos.m.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Grande (G):</span>
          <span className="text-[#F97316] font-bold">R$ {pizza.tamanhos.g.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Gigante (GG):</span>
          <span className="text-[#F97316] font-bold">R$ {pizza.tamanhos.gg.toFixed(2)}</span>
        </div>
      </div>
      <button className="bg-[#F97316] text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors mt-4 w-full">
        Editar
      </button>
    </div>
  );
}