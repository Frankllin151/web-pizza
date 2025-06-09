
import { z } from "zod";
// Esquema de validação com Zod 
 export const loginSchema = z.object({
    email: z.string().email("Digite um email válido").nonempty("O email é obrigátorio"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").nonempty("A senha é obrigátoria"),
    remember: z.boolean().optional(),
  
  })
  
 export type LoginFormInputs = z.infer<typeof loginSchema>
  
  