export interface ItemCarrinho {
    id: number; // ID da pizza
    nome: string; // Nome da pizza
    preco: number; // Preço total (baseado no tamanho e quantidade)
    tamanho: 'p' | 'm' | 'g' | 'gg'; // Tamanho selecionado
    quantidade: number; // Quantidade do item
    imagem?: string; // URL da imagem da pizza (opcional)
  }