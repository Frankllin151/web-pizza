"use client"
import Button from "../Button"
import InputLabel from "../InputLabel"
import TextInput from "../TextInput"
import { DadosEntregaProps } from "@/app/type/carrinho/DadosEntregaProps" 
import { z } from "zod";
import { Schema } from "zod";
import { useState } from "react"
export default function DadosEntrega({
  dadosEntrega,
  handleInputChange,
  total,
  avancarEtapa,
  voltarEtapa,
  itens,
}: DadosEntregaProps)
{
  const [errosEntrega, setErrosEntrega] = useState<{ [key: string]: string }>({});


  const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().min(1, "CPF é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().min(1, "Complemento é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
});

// Função chamada ao clicar no botão "Continuar"
const handleValidarCampos = () => {
  const resultado = schema.safeParse({
    nome: dadosEntrega.nome,
    email: dadosEntrega.email,
    cpf: dadosEntrega.cpf,
    telefone: dadosEntrega.telefone,
    endereco: dadosEntrega.endereco,
    numero: dadosEntrega.numero,
    complemento: dadosEntrega.complemento,
    bairro: dadosEntrega.bairro,
    cidade: dadosEntrega.cidade,
  });

  if (!resultado.success) {
    // Cast para evitar erro do TypeScript
    const errosFormatados = resultado.error.format() as unknown as Record<string, { _errors: string[] }>;


    // Cria objeto simples com os erros por campo
    const errosTratados: { [key: string]: string } = {};
    for (const campo in errosFormatados) {
      if (campo !== "_errors" && errosFormatados[campo]._errors.length > 0) {
        errosTratados[campo] = errosFormatados[campo]._errors[0];
      }
    }

    setErrosEntrega(errosTratados);
    return;
  }

  // Nenhum erro: limpa e avança
  setErrosEntrega({});
  avancarEtapa();
};
  
  
    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dados para Entrega</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h2>
              
              <div className="space-y-4">
                <div>
                  <InputLabel htmlFor="nome">Nome Completo</InputLabel>
                  <TextInput
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={dadosEntrega.nome}
                    onChange={handleInputChange}
                    className="w-full mt-1 text-white"
                  />
                {errosEntrega.nome && 
                <p className="text-red-500">{errosEntrega.nome}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={dadosEntrega.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.email && 
                <p className="text-red-500">{errosEntrega.email}</p>}
                  </div>
                  <div>
                    <InputLabel htmlFor="telefone">Telefone</InputLabel>
                    <TextInput
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={dadosEntrega.telefone}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.telefone && 
                <p className="text-red-500">{errosEntrega.telefone}</p>}
                  </div>
                </div>
                
                <div>
                  <InputLabel htmlFor="cpf">CPF</InputLabel>
                  <TextInput
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={dadosEntrega.cpf}
                    onChange={handleInputChange}
                    className="w-full mt-1 text-white"
                  />
                    {errosEntrega.cpf && 
                <p className="text-red-500">{errosEntrega.cpf}</p>}
                </div>
                
                
                <h2 className="text-xl font-semibold text-white mt-8 mb-4">Endereço de Entrega</h2>
                
                <div>
                  <InputLabel htmlFor="endereco">Rua/Avenida</InputLabel>
                  <TextInput
                    id="endereco"
                    name="endereco"
                    type="text"
                    placeholder="Nome da rua ou avenida"
                    value={dadosEntrega.endereco}
                    onChange={handleInputChange}
                    className="w-full mt-1 text-white"
                  />
                    {errosEntrega.endereco && 
                <p className="text-red-500">{errosEntrega.endereco}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="numero">Número</InputLabel>
                    <TextInput
                      id="numero"
                      name="numero"
                      type="text"
                      placeholder="123"
                      value={dadosEntrega.numero}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.numero && 
                <p className="text-red-500">{errosEntrega.numero}</p>}
                  </div>
                  <div>
                    <InputLabel htmlFor="complemento">Complemento</InputLabel>
                    <TextInput
                      id="complemento"
                      name="complemento"
                      type="text"
                      placeholder="Apt, bloco, referência (opcional)"
                      value={dadosEntrega.complemento}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.complemento && 
                <p className="text-red-500">{errosEntrega.complemento}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="bairro">Bairro</InputLabel>
                    <TextInput
                      id="bairro"
                      name="bairro"
                      type="text"
                      placeholder="Nome do bairro"
                      value={dadosEntrega.bairro}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.bairro && 
                <p className="text-red-500">{errosEntrega.bairro}</p>}
                  </div>
                  <div>
                    <InputLabel htmlFor="cidade">Cidade</InputLabel>
                    <TextInput
                      id="cidade"
                      name="cidade"
                      type="text"
                      placeholder="Nome da cidade"
                      value={dadosEntrega.cidade}
                      onChange={handleInputChange}
                      className="w-full mt-1 text-white"
                    />
                      {errosEntrega.cidade && 
                <p className="text-red-500">{errosEntrega.cidade}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-[#1A1A1D] rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-4 sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-2 mb-4">
                {itens.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-300 text-sm">
                    <span>{item.quantidade}x {item.nome}</span>
                    <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Taxa de entrega:</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="flex justify-between text-white font-bold">
                  <span>Total:</span>
                  <span className="text-[#F97316]">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  color="bg-[#1A1A1D]" 
                  className="w-1/2 py-2 border border-gray-700"
                  onClick={voltarEtapa}
                >
                  Voltar
                </Button>
                <Button
                  color="bg-[#F97316]" 
                  className="w-1/2 py-2"
                  onClick={handleValidarCampos}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}