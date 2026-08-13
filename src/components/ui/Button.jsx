import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'navy',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    navy: 'bg-brand-navy text-white hover:bg-brand-navy-light focus:ring-brand-navy accent-glow-navy',
    red: 'bg-brand-red text-white hover:bg-red-600 focus:ring-brand-red accent-glow-red',
    outline: 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-navy',
    'outline-red': 'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white focus:ring-brand-red',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-brand-navy focus:ring-white',
    white: 'bg-white text-brand-navy hover:bg-slate-100 focus:ring-white shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {children}
    </motion.button>
  );
};

export default Button;
