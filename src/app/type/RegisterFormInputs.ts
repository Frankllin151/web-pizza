import { z } from "zod";

// Esquema de validação com Zod
export const registerSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string().email("Digite um email válido").nonempty("O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("A senha é obrigatória"),
});

// Tipos derivados do esquema Zod
export type RegisterFormInputs = z.infer<typeof registerSchema>;