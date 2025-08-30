"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Button from "../componentes/Button";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";

type FormData = {
  email: string;
  senha: string;
  confirm_senha: string;
};

export default function UpdateSenha() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/update-senha`;

    // Inclui o token no corpo da requisição
    const payload = {
      ...data,
      reset_token: resetToken,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Senha atualizada com sucesso!");
      } else {
        alert(result.error || "Erro ao atualizar a senha.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="bg-white rounded-md shadow p-6 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">Atualizar Senha</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            type="email"
            id="email"
            placeholder="Digite seu email"
            {...register("email", { required: "O email é obrigatório" })}
            className="w-full mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <InputLabel htmlFor="senha">Nova Senha</InputLabel>
          <TextInput
            type="password"
            id="senha"
            placeholder="Digite a nova senha"
            {...register("senha", { required: "A senha é obrigatória" })}
            className="w-full mt-1"
          />
          {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

          <InputLabel htmlFor="confirm_senha">Confirmar Nova Senha</InputLabel>
          <TextInput
            type="password"
            id="confirm_senha"
            placeholder="Confirme a nova senha"
            {...register("confirm_senha", { required: "Confirme a senha" })}
            className="w-full mt-1"
          />
          {errors.confirm_senha && <p className="text-red-500 text-sm">{errors.confirm_senha.message}</p>}

          <Button className="w-full mt-4" color="bg-[#1A1A1D]" type="submit">
            Atualizar Senha
          </Button>
        </form>
      </div>
    </div>
  );
}