// Interface para o componente de adicionar pizza
import { PizzaFormData } from "./PizzaFormData";
export interface AddPizzaProps {
    onSubmit: (pizzaData: PizzaFormData) => void;
  }