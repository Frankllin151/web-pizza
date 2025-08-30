import { PizzaApiData } from "../pizzaApidata";
import { PizzaFormData } from "./PizzaFormData";
export interface AddPizzaProps {
    onSubmit: (pizzaData: PizzaApiData) => void;
  }