"use client";
import { useState, useEffect } from "react";

import Button from "./componentes/Button";
import InputLabel from "./componentes/InputLabel";
import ProdutoPizza from "./componentes/Produtopizza";
import TextInput from "./componentes/TextInput";
import Header from "./componentes/header";
import Carrinho from "./componentes/Carrinho";
import { Pizza } from "./data/produtopizza";
// import pizzas from "./data/produtopizza"; // <- NÃO precisa mais disso!

export default function Home() {
  const [filtro, setFiltro] = useState("");
  const [data, setData] = useState<Pizza[]>([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch(`${apiurl}/api/data-get/produto`);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao buscar as pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  const pizzasFiltradas = data.filter(pizza =>
    pizza.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <Header onFiltroChange={setFiltro} />

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossas Pizzas</h2>
        {data.length === 0  ?(
  <p>Carregando...</p>
         ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
         
         {pizzasFiltradas.map(pizza => (
            <ProdutoPizza
              key={pizza.id}
              id={pizza.id}
              nome={pizza.nome}
              tamanhos={pizza.tamanhos}
              imagem={pizza.imagem}
              descricao={pizza.descricao}
            />
          ))}
        </div>
         )}
       
      </main>
      <Carrinho />
    </>
  );
}
