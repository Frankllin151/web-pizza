import { DadosEntregas } from "../DadosEntrega";
import { Item } from "./Item";
export interface PagamentoCartaoProps {
  total: number;
    metodoPagamento: string;
  itens: Item[];
  dadosEntrega:DadosEntregas;
  onPaymentSuccess: (data: any) => void;
  onPaymentError: (error: any) => void;
}