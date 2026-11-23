import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'emerald' | 'white' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold text-sm tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0 select-none cursor-pointer';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 focus-visible:ring-primary',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 focus-visible:ring-emerald-500',
    white: 'bg-white hover:bg-slate-100 text-slate-900 shadow-md focus-visible:ring-white',
    ghost: 'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 focus-visible:ring-white',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
