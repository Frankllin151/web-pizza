import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import InputLabel from './InputLabel';

// Interface para os tamanhos de pizza e seus preços
interface PizzaSize {
  size: string;
  price: number;
}

// Interface para o componente de adicionar pizza
interface AddPizzaProps {
  onSubmit: (pizzaData: PizzaFormData) => void;
}

// Interface para os dados do formulário
interface PizzaFormData {
  name: string;
  description: string;
  sizes: PizzaSize[];
  image: File | null;
}

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
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Criar URL para pré-visualização
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  };

  // Manipulador para submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
        <div className="mb-6">
          <InputLabel htmlFor="image">Imagem da Pizza (opcional)</InputLabel>
          <div className="flex items-start mt-2">
            <div className="w-24 h-24 rounded-lg overflow-hidden mr-4 bg-gray-100">
              <img 
                src={imagePreview} 
                alt="Pré-visualização da pizza" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label 
                htmlFor="image" 
                className="inline-block px-4 py-2 cursor-pointer text-white bg-[#F97316] rounded-lg font-medium shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]"
              >
                Escolher Imagem
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {formData.image ? formData.image.name : 'Nenhuma imagem selecionada (será usada imagem padrão)'}
              </p>
            </div>
          </div>
        </div>

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