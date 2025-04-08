
import Button from "./componentes/Button";
import InputLabel from "./componentes/InputLabel";
import ProdutoPizza from "./componentes/Produtopizza";
import TextInput from "./componentes/TextInput";
import Header from "./componentes/header";
import Carrinho from "./componentes/Carrinho";
export default function Home() {
  const pizzas = [
    {
      id: 1,
      nome: "Pizza Margherita",
      preco: 45.90,
      imagem: "/pizzas/margherita.jpg", // Substitua pelos caminhos reais das imagens
      descricao: "Molho de tomate, mussarela, manjericão fresco e azeite de oliva"
    },
    {
      id: 2,
      nome: "Pizza Portuguesa",
      preco: 52.90,
      imagem: "/pizzas/portuguesa.jpg",
      descricao: "Molho de tomate, presunto, ovos, cebola, azeitonas, ervilha e queijo mussarela"
    },
    {
      id: 3,
      nome: "Pizza Calabresa",
      preco: 47.90,
      imagem: "/pizzas/calabresa.jpg",
      descricao: "Molho de tomate, linguiça calabresa, cebola e queijo mussarela"
    },
    {
      id: 4,
      nome: "Pizza Quatro Queijos",
      preco: 54.90,
      imagem: "/pizzas/quatro-queijos.jpg",
      descricao: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão"
    }
  ];




  return (
<>
<Header/>

<main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossas Pizzas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pizzas.map(pizza => (
            <ProdutoPizza
              key={pizza.id}
              id={pizza.id}
              nome={pizza.nome}
              preco={pizza.preco}
              imagem={pizza.imagem}
              descricao={pizza.descricao}
            />
          ))}
        </div>
      </main>
      <Carrinho />
</>
 
  );
}
