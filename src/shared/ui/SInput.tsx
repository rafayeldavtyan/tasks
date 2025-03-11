import React, { InputHTMLAttributes } from 'react';

interface SInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const SInput = ({
  label,
  id,
  type = "text",
  className = "",
  ...props
}: SInputProps) => {

  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-2 text-start text-base font-normal text-black">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="bg-none border border-[#DFEAF2] text-[#718EBF] font-normal text-[15px] rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-4"
        {...props}
      />
    </div>
  );
};

export default SInput;
