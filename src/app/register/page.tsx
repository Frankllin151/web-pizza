"use client";

import Button from "../componentes/Button";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormInputs } from "../type/RegisterFormInputs";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div
        className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]
        p-6 w-[400px]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Registrar</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <div>
              {/* Campo de Nome */}
              <div>
                <InputLabel htmlFor="name">Nome</InputLabel> <br />
                <TextInput
                  type="text"
                  id="name"
                  placeholder="Digite seu Nome"
                  {...register("name")}
                  className="w-full mt-1"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Campo de Email */}
              <div>
                <InputLabel htmlFor="email">Email</InputLabel> <br />
                <TextInput
                  type="email"
                  placeholder="Digite seu email"
                  id="email"
                  {...register("email")}
                  className="w-full mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Campo de Senha */}
              <div>
                <InputLabel htmlFor="password">Senha</InputLabel> <br />
                <TextInput
                  type="password"
                  placeholder="Digite sua senha"
                  id="password"
                  {...register("password")}
                  className="w-full mt-1"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botão de Registrar */}
          <div className="justify-center flex">
            <Button className={"w-full mx-12"} color="bg-[#1A1A1D]">
              Registrar
            </Button>
          </div>
        </form>

        <div className="my-4 text-center text-gray-500">ou</div>

        {/* Botões de Login com Google e Facebook */}
        <div className="flex justify-center">
          <div className="space-y-2">
            <Button className={""} color="bg-[#DB4437]">
              Google
            </Button>
            <Button className={"ml-1"} color="bg-[#4267B2]" >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}