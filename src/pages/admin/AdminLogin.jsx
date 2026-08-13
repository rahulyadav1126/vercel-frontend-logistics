import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AdminLogin = () => {
  const { login, error, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  // If already authenticated, redirect to admin dashboard
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLocalError('');
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate('/admin');
      } else {
        setLocalError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setLocalError('Server connection error. Please verify MongoDB state.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy p-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand-red opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brand-navy-light opacity-30 blur-3xl"></div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card hoverEffect={false} className="p-8 sm:p-10 glassmorphism-dark border-slate-700/60 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white shadow-lg mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Admin Management Portal</h2>
            <p className="text-slate-400 text-sm mt-1">Log in using corporate administrator credentials</p>
          </div>

          {(localError || error) && (
            <div className="mb-6 flex items-start space-x-2 rounded-lg bg-red-950/60 border border-red-500/50 p-4 text-red-200 text-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-brand-red" />
              <div>
                <p className="font-bold">Login Failed</p>
                <p className="mt-0.5">{localError || error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2">Corporate Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  {...register('email', { required: 'Corporate email is required' })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-brand-navy-dark border border-slate-700 text-white focus:outline-none focus:border-brand-red text-sm"
                  placeholder="admin@logisticsco.com"
                />
              </div>
              {errors.email && <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-widest mb-2">Security Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  {...register('password', { required: 'Security password is required' })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-brand-navy-dark border border-slate-700 text-white focus:outline-none focus:border-brand-red text-sm"
                  placeholder="••••••••••••"
                />
              </div>
              {errors.password && <p className="text-brand-red text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="red"
              className="w-full"
              disabled={submitting}
              icon={ArrowRight}
            >
              {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-slate-400 hover:text-white text-xs font-semibold">
              ← Return to Client Homepage
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// Dummy motion wrapper for import compatibility in direct code snippet
import { motion } from 'framer-motion';

export default AdminLogin;
