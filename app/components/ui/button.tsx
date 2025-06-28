import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
      {...props}
    >
      {children}
    </button>
  );
}

