import { useEffect, useState } from 'react';
import Script from 'next/script';
import Button from '../Button';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { PagamentoCartaoProps } from '@/app/type/carrinho/PagamentoCartao';
declare global {
  interface Window {
    MercadoPago: any;
  }
}
export default function PagamentoCartao({ total,
   dadosEntrega, 
   onPaymentSuccess,
   metodoPagamento,
  itens,
    onPaymentError }: PagamentoCartaoProps) {
  const [mp, setMp] = useState<any>(null);
  const [cardForm, setCardForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


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

  // Inicializar CardForm quando MP estiver pronto
  useEffect(() => {
    if (mp && !cardForm) {
      initializeCardForm();
    }
  }, [mp]);



  
  const initializeCardForm = () => {
    const form = mp.cardForm({
      amount: total.toString(),
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do Cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/AA",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "CVV",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Nome no Cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco Emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de Documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "CPF",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "Email",
        },
      },
      callbacks: {
        onFormMounted: (error: Error | undefined) => {
          if (error) {
            console.warn("Erro ao montar formulário: ", error);
            return;
          }
          console.log("Formulário montado com sucesso");
          
          // Pré-preencher campos se tiver dados
           if (dadosEntrega?.email) {
    const emailInput = document.getElementById('form-checkout__cardholderEmail') as HTMLInputElement | null;
    if (emailInput) emailInput.value = dadosEntrega.email;
  }

  if (dadosEntrega?.cpf) {
    const cpfInput = document.getElementById('form-checkout__identificationNumber') as HTMLInputElement | null;
    if (cpfInput) cpfInput.value = dadosEntrega.cpf.replace(/\D/g, '');
  }
        },
        onSubmit: async (event: React.FormEvent) => {
          event.preventDefault();
          setIsLoading(true);

          try {
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = form.getCardFormData();

            const itensFormatados = itens.map(item => ({
  id: item.id,
  quantidade: item.quantidade,
  tamanho: item.tamanho,
}));
console.log(token);

const dataPayAndEntrega = {
  cliente: {
    nome: dadosEntrega.nome,
    email: dadosEntrega.email,
    cpf: dadosEntrega.cpf,
    telefone: dadosEntrega.telefone,
    endereco: dadosEntrega.endereco,
    numero: dadosEntrega.numero,
    complemento: dadosEntrega.complemento,
    bairro: dadosEntrega.bairro,
    cidade: dadosEntrega.cidade
  },
  pagamento: {
    metodo: metodoPagamento,
    total: total,
    cartao: {
    token,
    issuer_id,
    payment_method_id,
    transaction_amount: Number(amount),
    installments: Number(installments),
    description: "Pedido Web-Pizza",
    payer: {
    email,
    identification: {
      type: identificationType,
      number: identificationNumber,
                  },
                },
    }
  },
  itens: itensFormatados
};

   const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

            // Enviar para o backend
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/dado/pay-all`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataPayAndEntrega),
            });
  clearTimeout(timeoutId);
            const data = await response.json();
          
           

          console.log(data);
          
          if(data.dados.status === "rejected"){
alert("Seu cartão foi rejeitado");
          } else if(data.dados.erro){
            alert("Error api do mercado pago")
          }
          } catch (error) {
           console.error("Erro no pagamento:", error);
            onPaymentError({ message: "Erro interno no pagamento" });
            
          } finally {
            setIsLoading(false);
          }
        },
        onFetching: (resource:any) => {
          console.log("Buscando recurso: ", resource);
          
          const progressBar = document.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.removeAttribute("value");
          }

          return () => {
            if (progressBar) {
              progressBar.setAttribute("value", "0");
            }
          };
        }
      },
    });

    setCardForm(form);
  };

  return (
    <div className="pagamento-cartao">
      <Script 
        src="https://sdk.mercadopago.com/js/v2" 
        onLoad={() => {
          if (window.MercadoPago) {
            const mercadoPago = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY);
            setMp(mercadoPago);
          }
        }}
      />
      
      <style jsx>{`
        #form-checkout {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          gap: 15px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .container {
          height: 40px;
          display: inline-block;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px 12px;
          background: white;
        }

        #form-checkout__cardholderName,
        #form-checkout__identificationNumber,
        #form-checkout__cardholderEmail {
          height: 40px;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 16px;
        }

        #form-checkout__issuer,
        #form-checkout__installments,
        #form-checkout__identificationType {
          height: 40px;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px 12px;
          background: white;
          font-size: 16px;
        }

        #form-checkout__submit {
          height: 48px;
          background: #009ee3;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        #form-checkout__submit:hover:not(:disabled) {
          background: #0080b3;
        }

        #form-checkout__submit:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          margin-top: 10px;
        }

        .total-info {
          background: white;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
        }
      `}</style>

      <div className="total-info">
        <h3>Total a pagar: R$ {total.toFixed(2)}</h3>
      </div>

      <form id="form-checkout">
        <div id="form-checkout__cardNumber" className="container"></div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input 
          type="text" 
          id="form-checkout__cardholderName" 
          placeholder="Nome completo do portador"
        />
        <select id="form-checkout__issuer">
          <option value="">Selecione o banco emissor</option>
        </select>
        <select id="form-checkout__installments">
          <option value="">Selecione as parcelas</option>
        </select>
        <select id="form-checkout__identificationType">
          <option value="">Tipo de documento</option>
        </select>
        <input 
          type="text" 
          id="form-checkout__identificationNumber" 
          placeholder="CPF (apenas números)"
        />
        <input 
          type="email" 
          id="form-checkout__cardholderEmail" 
          placeholder="Email do portador"
        />

       
    <Button
     color="bg-[#F97316]"
      className="w-full py-3 font-bold"
      type="submit" 
          id="form-checkout__submit" 
          disabled={isLoading}
    >
{isLoading ? 'Processando...' : `Pagar R$ ${total.toFixed(2)}`}
    </Button>
        
        <progress value="0" className="progress-bar">Carregando...</progress>
      </form>
    </div>
  );
}