import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.2)]",
    secondary: "bg-sage-100 text-sage-800 hover:bg-sage-200 focus:ring-sage-100",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-50 focus:ring-slate-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};