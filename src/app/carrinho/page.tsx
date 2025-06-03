'use client'
import { useState, useEffect} from 'react';
import Header from "../componentes/header";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";
import Button from "../componentes/Button";
import { ItemCarrinho } from '../type/ItemCarrinho';
import ItensCarrinho from '../componentes/carrinho/ItensCarrinho';
import DadosEntrega from '../componentes/carrinho/DadosEntrega';
import { DadosEntregas } from '../type/DadosEntrega';
import { z } from "zod";
import { loadMercadoPago } from '@mercadopago/sdk-js';
import PagamentoCartao from '../componentes/carrinho/PagamentoCartao';
// Interface para o evento personalizado
interface CarrinhoAtualizadoEvent extends Event {
  detail: { carrinho: ItemCarrinho[] };
}
declare global {
  interface Window {
    MercadoPago: any;
  }
}


// Interface para dados de entrega


// Métodos de pagamento
const METODOS_PAGAMENTO = [
  { id: 'dinheiro', nome: 'Dinheiro' },
  { id: 'cartao', nome: 'Cartão crédito/Débito' },
  { id: 'pix', nome: 'PIX' }
];

export default function Carrinho() {
  const [mp, setMp] = useState<any>(null);
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [etapaAtual, setEtapaAtual] = useState<number>(1);
  const [scrollAplicado, setScrollAplicado] = useState<boolean>(false);
  const [metodoPagamento, setMetodoPagamento] = useState<string>('pix');
  const [codigoPix, setCodigoPix] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [errosEntrega, setErrosEntrega] = useState<{ [key: string]: string }>({});
  const [dadosEntrega, setDadosEntrega] = useState<DadosEntregas>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    nomeCartao: '',
  numeroCartao: '',
  validade: '',
  cvv: '',
    
  });




const  dataPayAndEntrega = {
 "cliente": {
  "nome": dadosEntrega.nome,
    "email": dadosEntrega.email,
    "cpf": dadosEntrega.cpf,
    "telefone": dadosEntrega.telefone,
    "endereco": dadosEntrega.endereco,
    "numero": dadosEntrega.numero,
    "complemento": dadosEntrega.complemento,
    "bairro": dadosEntrega.bairro,
    "cidade": dadosEntrega.cidade
 }, 
 "pagamento": {
  "metodo": metodoPagamento, 
  "total":  total, 
  "cartao": {
    "token": ""
  }
 }, 
 "itens": itens.map(item =>({
  id: item.id, 
  quantidade: item.quantidade, 
  tamanho: item.tamanho
 }))
}

// Inicializar o SDK do Mercado Pago
 useEffect(() => {
    async function init() {
      await loadMercadoPago();
      const mercadoPago = new window.MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, {
        locale: 'pt-BR',
      });
      setMp(mercadoPago);
    }

    init();
  }, []);

useEffect(() => {
  if (mp) {
    console.log('MercadoPago carregado:', mp);
  } else {
    console.log('MercadoPago ainda não carregado');
  }
}, [mp]);



const schema = z.object({
  nomeCartao: z.string().min(1, "Nome é obrigatório"),
  numeroCartao: z
    .string()
    .regex(/^\d{16}$/, "Número do cartão deve ter 16 dígitos"),
 cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos"),
});


// Função chamada ao clicar no botão "Continuar"
const handleValidarCampos = () => {
  if(metodoPagamento === "cartao"){
const resultado = schema.safeParse({
    nomeCartao: dadosEntrega.nomeCartao,
    numeroCartao: dadosEntrega.numeroCartao,
    valiade: dadosEntrega.validade,
    cvv: dadosEntrega.cvv,
    
  });

  if (!resultado.success) {
    // Cast para evitar erro do TypeScript
    const errosFormatados = resultado.error.format() as unknown as Record<string, { _errors: string[] }>;


    // Cria objeto simples com os erros por campo
    const errosTratados: { [key: string]: string } = {};
    for (const campo in errosFormatados) {
      if (campo !== "_errors" && errosFormatados[campo]._errors.length > 0) {
        errosTratados[campo] = errosFormatados[campo]._errors[0];
      }
    }

    setErrosEntrega(errosTratados);
    return;
  }
   finalizarPedido();
  }
  
if(metodoPagamento === "pix"){
   finalizarPedido();
}
if(metodoPagamento === "dinheiro"){
   finalizaPaYPedidoDinheiro()
}
  // Nenhum erro: limpa e avança
 
};



 
  useEffect(() => {
    if (etapaAtual === 3 && !scrollAplicado) {
      // Delay pequeno para garantir que a página esteja pronta pra scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollAplicado(true);
      }, 100);
    }
  }, [etapaAtual, scrollAplicado]);

 
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
  const finalizarPedido = async () => {
    if(metodoPagamento === "pix"){

    // Aqui você conectaria com sua API para processar o pedido
   
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
   try{
 const response =  await fetch(`${apiUrl}/api/dado/pay-all`, {
  method: "POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(dataPayAndEntrega)
 })
 if(!response.ok){
    throw new Error(`Erro na requisição: ${response.status}`);
 }
  const dataPay = await response.json();
  console.log(dataPay);
  
    if (dataPay.dados) {
  setCodigoPix(dataPay.dados.codigo_pix);
  setQrCodeBase64(dataPay.dados.qr_code_base64);
}
   } catch(error){
  console.error('Erro ao finalizar pedido:', error);
   }
    
    }

  
  
    
  // Limpar carrinho após finalização
   // setItens([]);
    //localStorage.setItem('carrinho', JSON.stringify([]));
    
    // Resetar para a primeira etapa
   // setEtapaAtual(1);  
    
  };

const finalizaPaYPedidoDinheiro = async () => {

    // Aqui você conectaria com sua API para processar o pedido
   
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
   try{
 const response =  await fetch(`${apiUrl}/api/dado/pay-all`, {
  method: "POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(dataPayAndEntrega)
 })
 if(!response.ok){
    throw new Error(`Erro na requisição: ${response}`);
 }
  const dataPay = await response.json();
  console.log(dataPay);
   } catch(error){
  console.error('Erro ao finalizar pedido dinheiro:', error);
   }
}

  
  
  

  // Verificar se existem itens no carrinho
  const carrinhoVazio = itens.length === 0;


  const verificarUsuario = async () => {
    if (!dadosEntrega.email) {
      console.log("Email não informado");
      return;
    }
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/dado/user-entrega-pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: dadosEntrega.email }),
      });
  
      const result = await response.json();
  
      if (result.success === false) {
        console.log("Usuário não encontrado, continue preenchendo");
        return;
      }
  
  
      // Atualiza os dados com o que foi retornado da API
      setDadosEntrega((prev) => ({
        ...prev,
        ...result, // usa os campos retornados
      }));
  
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    }
  };
  
  useEffect(() => {
    if (dadosEntrega.email) {
      verificarUsuario();
    }
  }, [dadosEntrega.email]);


 const handlePaymentSuccess = (data:any) => {
    console.log('Pagamento aprovado!', data);
    // Redirecionar para página de sucesso
    // Salvar pedido no banco, etc.
  };

  const handlePaymentError = (error:any) => {
    console.error('Erro no pagamento:', error);
    // Mostrar mensagem de erro para o usuário
    alert('Erro no pagamento: ' + error.message);
  };
  
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
    <PagamentoCartao 
    total={total}
      metodoPagamento={metodoPagamento}
      itens={itens.map(item => ({
    id: item.id,
    quantidade: item.quantidade,
    tamanho: item.tamanho
  }))}
        dadosEntrega={dadosEntrega}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
    />
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

                  {metodoPagamento === "dinheiro" && 
                  <div className='bg-[#2D2D30] p-4 rounded-md mb-6'>
                    <p className='text-white text-sm'>
                      Efetuar o pagamento na entrega
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
                      <div className='pixs '>
                        {qrCodeBase64 && (
  <img 
    src={`data:image/png;base64,${qrCodeBase64}`} 
    alt="QR Code Pix" 
    style={{ width: '200px', height: '200px' }} 
  />
  
)}
{codigoPix && (

<Button
 color="bg-[#F97316]" 
  className="w-full py-3 font-bold mt-3"
onClick={() => {
    navigator.clipboard.writeText(codigoPix)
      .then(() => alert('Código Pix copiado!'))
      .catch(() => alert('Erro ao copiar o código Pix.'));
  }}
>
Copia codigo
</Button>
)}

                      </div>
                      <div className="mt-3">
  {!codigoPix && metodoPagamento !== 'cartao' ? (
    <Button
      color="bg-[#F97316]"
      className="w-full py-3 font-bold"
      onClick={handleValidarCampos}
    >
      Finalizar Pedido
    </Button>
  ) : null}
</div>
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