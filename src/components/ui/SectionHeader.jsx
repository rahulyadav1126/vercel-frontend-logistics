import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
  white = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <motion.span
          className="text-sm font-extrabold uppercase tracking-widest text-brand-red"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          white ? 'text-white' : 'text-brand-navy'
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`mt-4 h-1.5 w-20 rounded-full bg-brand-red ${
          centered ? 'mx-auto' : 'mr-auto'
        }`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </div>
  );
};

export default SectionHeader;
