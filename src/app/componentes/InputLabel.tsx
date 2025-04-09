import React from 'react';

interface InputLabelProps {
    htmlFor: string;
    children?: React.ReactNode; // Adicionado para aceitar elementos filhos
}

const InputLabel: React.FC<InputLabelProps> = ({htmlFor,children }) => {
    return (
        <label htmlFor={htmlFor} className="font-medium text-gray-500">
            
            {children} {/* Renderiza os elementos filhos, se houver */}
        </label>
    );
};

export default InputLabel;