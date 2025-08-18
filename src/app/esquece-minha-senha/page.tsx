"use client"
import Button from "../componentes/Button";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

// Define o tipo dos dados do formulário
type FormData = {
  email: string;
};

export default function EsqueciMinhaSenha() {
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

   const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Constrói o URL da API para a rota de esqueci a senha
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/forget-password`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: data.email,
        }),
      });

      // Verifica se a resposta HTTP foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro na rede ou resposta do servidor não foi ok.");
      }

      // Converte a resposta para JSON
      const result = await response.json();

      // Mostra um alerta com a mensagem da API
      if (result.success) {
        alert(result.success); // Ex: "Verificar na caixa do seu email"
        // Redireciona para o login se a operação for bem-sucedida
        
      } else {
        // Usa a mensagem de erro do servidor
        alert(result.error || "Erro desconhecido.");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div
        className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]
        p-6 w-[400px]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Esqueci minha senha</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <div className="w-full">
              <InputLabel htmlFor="email">Email</InputLabel> <br />
              <TextInput
                type="email"
                placeholder="Digite seu email"
                id="email"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Por favor, digite um email válido",
                  },
                })}
                className="w-full mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div className="justify-center flex">
            <Button
              className="w-full mx-12"
              color="bg-[#1A1A1D]"
              type="submit"
            >
              Enviar link de recuperação
            </Button>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          <a href="/login.html">
            <span className="text-sm text-gray-600 hover:underline">Lembrou da sua senha? Voltar para o login</span>
          </a>
        </div>
      </div>
    </div>
  );
}

