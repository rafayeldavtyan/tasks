import React, { ButtonHTMLAttributes } from 'react';

interface SButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const SButton = ({
  type = "submit",
  label,
  onClick,
  className = "",
  ...props
}: SButtonProps) => {
  return (
    <button
      type={type}
      className={`focus:outline-none font-medium rounded-15 text-lg w-full sm:w-auto px-6 py-3 text-center ${className}`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default SButton;