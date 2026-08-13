import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  onClick,
  ...props
}) => {
  const cardStyle = glass
    ? 'glassmorphism rounded-2xl shadow-soft-lg border border-white/20'
    : 'bg-white rounded-2xl shadow-soft-lg border border-slate-100';

  return (
    <motion.div
      onClick={onClick}
      className={`${cardStyle} p-6 overflow-hidden ${hoverEffect ? 'hover-premium cursor-pointer' : ''} ${className}`}
      whileHover={hoverEffect ? { y: -6 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
