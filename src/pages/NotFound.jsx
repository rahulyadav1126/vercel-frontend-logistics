import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-brand-red mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h1 className="text-6xl font-black text-brand-navy">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">Page Not Found</h2>
        <p className="mt-2 max-w-md text-slate-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="navy" icon={Home}>
              Back to Homepage
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
