
import Button from "./componentes/Button";
import InputLabel from "./componentes/InputLabel";
import ProdutoPizza from "./componentes/Produtopizza";
import TextInput from "./componentes/TextInput";
import Header from "./componentes/header";
import Carrinho from "./componentes/Carrinho";
import pizzas from "./data/produtopizza";
export default function Home() {





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
              tamanhos={pizza.tamanhos}
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
