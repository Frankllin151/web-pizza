import { PizzaSize } from "./PizzaSize";
// Interface para os dados do formulário
export interface PizzaFormData {
    name: string;
    description: string;
    sizes: PizzaSize[];
    image: File | null;
  }