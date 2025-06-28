import React, { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, ...props }: CardProps) {
  return (
    <div className="rounded-2xl shadow-md bg-white" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }: CardProps) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}
// at the end of components/ui/card.tsx
export default Card;
