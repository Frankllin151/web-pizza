import { DadosEntregas } from "../DadosEntrega";

export interface DadosEntregaProps {
  dadosEntrega: DadosEntregas; // ✅ reaproveita o tipo já definido
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
  avancarEtapa: () => void;
  voltarEtapa: () => void;
  itens: {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    tamanho: string;
    imagem?: string;
  }[];
}