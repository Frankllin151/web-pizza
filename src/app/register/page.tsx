import Button from "../componentes/Button";
import InputLabel from "../componentes/InputLabel";
import TextInput from "../componentes/TextInput";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div
        className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]
        p-6 w-[400px]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-4">
          <div className="flex justify-center">
            <div>
            <div>
            <InputLabel htmlFor="email">Email</InputLabel> <br />
            <TextInput
              type="email"
              placeholder="Digite seu email"
              name="email"
              id="email"
              className="w-full mt-1"
            />
          </div>
          <div>
            <InputLabel htmlFor="password">Senha</InputLabel> <br />
            <TextInput
              type="password"
              placeholder="Digite sua senha"
              name="password"
              id="password"
              className="w-full mt-1"
            />
          </div>
            </div>
          </div>
         <div className="justify-center flex">
         <Button
           className={"w-full mx-12"}
            color="bg-[#1A1A1D]"
          >
            Registrar
          </Button>
         </div>
        </form>
        <div className="my-4 text-center text-gray-500">ou</div>
        <div className="flex justify-center">

        <div className="space-y-2 ">
          <Button
           className={""}
            color="bg-[#DB4437]"
            
           
          >
           Google
          </Button>
          <Button
            className={"ml-1"}
            color="bg-[#4267B2]"
          
            
          >
           Facebook
          </Button>
        </div>
        </div>
      
      </div>
    </div>
    )
}