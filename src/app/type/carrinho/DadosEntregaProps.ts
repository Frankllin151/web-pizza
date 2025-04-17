export  interface DadosEntregaProps {
    dadosEntrega: {
      nome: string;
      email: string;
      cpf: string;
      telefone: string;
      endereco: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
    };
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