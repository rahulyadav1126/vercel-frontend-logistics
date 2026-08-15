import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import Button from './Button';

const SuccessModal = ({ isOpen, onClose, title = 'Success!', message = 'Action completed successfully.' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-premium p-6 sm:p-8"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-navy rounded-lg transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-2">{title}</h4>
              <p className="text-sm text-slate-500 mb-8">{message}</p>

              <div className="flex w-full">
                <Button 
                  variant="primary" 
                  className="w-full bg-brand-navy hover:bg-brand-navy-light text-white" 
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
