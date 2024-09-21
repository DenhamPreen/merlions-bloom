import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button      
      className="
        mx-auto
        relative
        px-8
        py-3
        font-bold
        text-white
        bg-primary
        border-b-4
        border-secondary
        rounded-lg
        shadow-lg
        transform active:translate-y-1 active:border-none transition-transform duration-100 ease-in-out
        hover:bg-secondary
        hover:border-primary
        hover: text-primary
      "
    >
      {label}
      <span
        className="
          absolute
          inset-0
          rounded-lg
          bg-white
          opacity-10
          pointer-events-none
          transition-opacity
          duration-300
        "
      ></span>
    </button>
  );
};

export default Button;
