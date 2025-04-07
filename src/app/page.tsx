import Button from "./componentes/Button";
import TextInput from "./componentes/TextInput";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">


   <TextInput
   type="text"
   placeholder="name"
   name="name"
   />
    </div>
 
  );
}
