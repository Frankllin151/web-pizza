export interface PizzaApiData {
  nome: string;
  imagem: string;
  descricao: string;
  tamanhos: {
    p: number;
    m: number;
    g: number;
    gg: number;
  };
}