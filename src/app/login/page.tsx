"use client"
import Button from "../componentes/Button";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";
import { useForm } from "react-hook-form";
import { loginSchema , LoginFormInputs} from "../type/LoginFormInputs";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {

 const {
  register, 
  handleSubmit ,
  formState: {errors}, 
 } = useForm<LoginFormInputs>({
  resolver:zodResolver(loginSchema)
 })
 const onSubmit = (data: LoginFormInputs) => {
  console.log(`Email: ${data.email} 
 Senha: ${data.password}     
checkbox: ${data.remember}   
 `);
  
 }


  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
    <div
      className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]
      p-6 w-[400px]"
    >
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      <form className="space-y-4"  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <div>
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
        <div>
          <InputLabel htmlFor="password">Senha</InputLabel> <br />
          <TextInput
            type="password"
            placeholder="Digite sua senha"
            id="password"
            className="w-full mt-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
          </div>
          
        </div>
        <div className="flex items-center ml-2">
  <label htmlFor="remember" className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      id="remember"
      {...register("remember")}
      className="sr-only peer focus:outline-none"
    />
    <div
      className="w-11 h-6 bg-gray-500 rounded-full peer-focus:ring-2 peer-focus:ring-[#fff] peer-checked:bg-[#F97316] transition-colors duration-300"
    ></div>
    <div
      className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"
    ></div>
  </label>
  <span className="ml-3 text-sm text-gray-600">Lembrar-me</span>
</div>
     
       <div className="justify-center flex">
       <Button
         className={"w-full mx-12"}
          color="bg-[#1A1A1D]"
        >
          Entrar
        </Button>
       </div>
      </form>
      
    
    </div>
  </div>
  );
}