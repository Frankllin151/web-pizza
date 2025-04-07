import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <input
            {...props}
            className=" 
          px-4 py-2 rounded-md
                font-medium
                border border-[#1A1A1D] 
                focus:outline-none 
                focus:border-transparent
                focus:ring-1  
                focus:ring-[#F97316]
                transition-colors duration-300
            "
        />
    );
};

export default TextInput;