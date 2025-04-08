import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  className?: string; // Tornado opcional
}

const TextInput: React.FC<TextInputProps> = ({ type, name, className, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      className={`
        px-4 py-2 rounded-md
        font-medium
        border border-gray-500
        focus:outline-none 
        focus:border-transparent
        focus:ring-1  
        focus:ring-[#F97316]
        transition-colors duration-300
        ${className || ''} // Permite adicionar classes personalizadas
      `}
      {...props} // Espalha outras propriedades recebidas
    />
  );
};

export default TextInput;