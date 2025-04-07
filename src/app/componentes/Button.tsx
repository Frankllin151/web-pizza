import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string; // Define a cor do botão ao usá-lo
   
}

const Button: React.FC<ButtonProps> = ({ color, children, ...props }) => {
    return (
        <button
            className={`px-4 py-2 cursor-pointer text-white shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] ${color} rounded-lg
            font-medium
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;