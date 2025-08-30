import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import { PizzaFormData } from '../type/dashboard/PizzaFormData';
import { AddPizzaProps } from '../type/dashboard/AddPizzaProps';




const AddPizzaComponent: React.FC<AddPizzaProps> = ({ onSubmit }) => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState<PizzaFormData>({
    name: '',
    description: '',
    sizes: [
      { size: 'P', price: 0 },
      { size: 'M', price: 0 },
      { size: 'G', price: 0 },
      { size: 'GG', price: 0 }
    ],
    image: null
  });

  // Estado para armazenar a URL de pré-visualização da imagem
  const [imagePreview, setImagePreview] = useState<string>('/pizza/pizza.png');

  // Manipulador para campos de texto
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manipulador para alterações de preço
  const handlePriceChange = (index: number, price: string) => {
    const newSizes = [...formData.sizes];
    newSizes[index].price = parseFloat(price) || 0;
    setFormData({
      ...formData,
      sizes: newSizes
    });
  };

  // Manipulador para upload de imagem


  // Manipulador para submissão do formulário
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Transforma PizzaFormData para o formato da API
  const pizzaApiData = {
    nome: formData.name,
    imagem: imagePreview, // ou formData.image se for upload
    descricao: formData.description,
    tamanhos: {
      p: formData.sizes.find(s => s.size === 'P')?.price || 0,
      m: formData.sizes.find(s => s.size === 'M')?.price || 0,
      g: formData.sizes.find(s => s.size === 'G')?.price || 0,
      gg: formData.sizes.find(s => s.size === 'GG')?.price || 0,
    }
  };

  try {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiurl}/api/dashboard/adicionar-pizza`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pizzaApiData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Erro ao adicionar pizza: ${errorData.message || 'Erro desconhecido'}`);
      return;
    }

    alert("Pizza adicionada com sucesso!");
    // Se quiser, pode limpar o formulário ou atualizar a lista de pizzas aqui
  } catch (error) {
    alert("Erro ao adicionar pizza!");
    console.error(error);
  }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]">
      <h2 className="text-2xl font-bold mb-6 text-[#1A1A1D]">Adicionar Nova Pizza</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Nome da Pizza */}
        <div className="mb-4">
          <InputLabel htmlFor="name">Nome da Pizza</InputLabel>
          <TextInput
            type="text"
            name="name"
            id="name"
            placeholder="Nome da pizza"
            value={formData.name}
            onChange={handleTextChange}
            className="w-full mt-1"
            required
          />
        </div>

        {/* Descrição da Pizza */}
        <div className="mb-4">
          <InputLabel htmlFor="description">Descrição</InputLabel>
          <textarea
            name="description"
            id="description"
            placeholder="Descrição breve da pizza"
            value={formData.description}
            onChange={handleTextChange}
            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-[#F97316] transition-colors duration-300"
            rows={3}
            required
          />
        </div>

        {/* Preços por Tamanho */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-500 mb-2">Preços por Tamanho</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {formData.sizes.map((size, index) => (
              <div key={size.size} className="mb-2">
                <InputLabel htmlFor={`price-${size.size}`}>{`Tamanho ${size.size}`}</InputLabel>
                <div className="flex items-center mt-1">
                  <span className="text-gray-500 mr-1">R$</span>
                  <TextInput
                    type="number"
                    name={`price-${size.size}`}
                    id={`price-${size.size}`}
                    placeholder="0.00"
                    value={size.price || ''}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    className="w-full"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload de Imagem */}
      

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            color="bg-gray-500" 
            className="hover:bg-gray-600"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            color="bg-[#F97316]" 
            className="hover:bg-[#EA580C]"
          >
            Adicionar Pizza
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPizzaComponent;