import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  withIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  withIcon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-400 hover:bg-brand-500 text-white shadow-lg shadow-brand-200 focus:ring-brand-400 border border-transparent",
    secondary: "bg-white hover:bg-brand-50 text-brand-800 shadow-sm border border-brand-100 focus:ring-brand-200",
    outline: "bg-transparent border-2 border-brand-400 text-brand-600 hover:bg-brand-50 focus:ring-brand-400"
  };

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
      {withIcon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;