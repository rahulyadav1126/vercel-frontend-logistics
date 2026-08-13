// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import { FileText, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
// import api from '../utils/api';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import SectionHeader from '../components/ui/SectionHeader';

// const GetQuote = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setSubmitting(true);
//     setErrorMsg('');
//     try {
//       const response = await api.post('/api/quotes', data);
//       if (response.data.success) {
//         setSubmitted(true);
//         reset();
//       } else {
//         setErrorMsg(response.data.error || 'Failed to submit quote request.');
//       }
//     } catch (err) {
//       setErrorMsg(err.response?.data?.error || 'Server error. Please try again later.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const services = [
//     'Road & Rail Freight Logistics',
//     'Warehousing & Distribution Management',
//     'Contract Staffing & Recruitment',
//     'Industrial Skill Development Programs',
//     'Last-Mile E-commerce Fulfillment',
//     'Custom Services Request',
//   ];

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
//       <SectionHeader
//         title="Request a Service Quote"
//         subtitle="Get Quote"
//         centered={true}
//       />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {submitted ? (
//           <Card hoverEffect={false} className="text-center p-12 glassmorphism border border-emerald-200">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
//               <CheckCircle2 className="h-10 w-10" />
//             </div>
//             <h3 className="text-2xl font-bold text-brand-navy">Quote Request Submitted!</h3>
//             <p className="mt-4 text-slate-600 max-w-lg mx-auto">
//               Thank you for reaching out to us. Our logistics and staffing operations team is reviewing your request and will contact you within 24 business hours.
//             </p>
//             <div className="mt-8">
//               <Button variant="navy" onClick={() => setSubmitted(false)}>
//                 Request Another Quote
//               </Button>
//             </div>
//           </Card>
//         ) : (
//           <Card hoverEffect={false} className="p-8 sm:p-12 glassmorphism shadow-premium">
//             <div className="flex items-center space-x-3 mb-8">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white">
//                 <FileText className="h-5 w-5" />
//               </div>
//               <h3 className="text-xl font-bold text-brand-navy">Provide Your Enterprise Needs</h3>
//             </div>

//             {errorMsg && (
//               <div className="mb-6 flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
//                 <AlertTriangle className="h-5 w-5 flex-shrink-0" />
//                 <span>{errorMsg}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Full Name *</label>
//                   <input
//                     type="text"
//                     {...register('name', { required: 'Name is required' })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.name ? 'border-red-500' : 'border-slate-300'
//                     } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
//                     placeholder="John Doe"
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Corporate Email *</label>
//                   <input
//                     type="email"
//                     {...register('email', {
//                       required: 'Email is required',
//                       pattern: {
//                         value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//                         message: 'Please enter a valid email address',
//                       },
//                     })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.email ? 'border-red-500' : 'border-slate-300'
//                     } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
//                     placeholder="john@company.com"
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Phone Number *</label>
//                   <input
//                     type="tel"
//                     {...register('phone', { required: 'Phone is required' })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.phone ? 'border-red-500' : 'border-slate-300'
//                     } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
//                     placeholder="+1 (555) 123-4567"
//                   />
//                   {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
//                 </div>

//                 {/* Service Type */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Service Type Required *</label>
//                   <select
//                     {...register('serviceType', { required: 'Please select a service type' })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent"
//                   >
//                     <option value="">Select Service...</option>
//                     {services.map((service) => (
//                       <option key={service} value={service}>
//                         {service}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
//                 </div>

//                 {/* Company Size */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Company Size</label>
//                   <select
//                     {...register('companySize')}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent"
//                   >
//                     <option value="">Select Company Size...</option>
//                     <option value="1-10">1 - 10 Employees</option>
//                     <option value="11-50">11 - 50 Employees</option>
//                     <option value="51-200">51 - 200 Employees</option>
//                     <option value="201-500">201 - 500 Employees</option>
//                     <option value="500+">500+ Employees</option>
//                   </select>
//                 </div>

//                 {/* Pickup Location (For Logistics) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Pickup Location (If applicable)</label>
//                   <input
//                     type="text"
//                     {...register('pickupLocation')}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                     placeholder="City, State / Port"
//                   />
//                 </div>

//                 {/* Delivery Location (For Logistics) */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Delivery Location (If applicable)</label>
//                   <input
//                     type="text"
//                     {...register('deliveryLocation')}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                     placeholder="City, State / Port"
//                   />
//                 </div>
//               </div>

//               {/* Message Details */}
//               <div>
//                 <label className="block text-sm font-semibold text-brand-navy mb-2">Details of Requirements *</label>
//                 <textarea
//                   rows="4"
//                   {...register('message', { required: 'Please supply detail on your needs' })}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.message ? 'border-red-500' : 'border-slate-300'
//                   } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
//                   placeholder="Describe your freight requirements, weight, volume, frequency, or manpower count and job roles required."
//                 ></textarea>
//                 {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
//               </div>

//               {/* Submit Button */}
//               <div className="pt-2">
//                 <Button
//                   type="submit"
//                   variant="red"
//                   className="w-full"
//                   disabled={submitting}
//                   icon={Send}
//                 >
//                   {submitting ? 'Submitting Request...' : 'Send Quote Request'}
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default GetQuote;


// // add the validation email , phonenumber  all need fill


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FileText, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const GetQuote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const response = await api.post('/api/quotes', data);
      if (response.data.success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMsg(response.data.error || 'Failed to submit quote request.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Server error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    'Road & Rail Freight Logistics',
    'Warehousing & Distribution Management',
    'Contract Staffing & Recruitment',
    'Industrial Skill Development Programs',
    'Last-Mile E-commerce Fulfillment',
    'Custom Services Request',
  ];

  // Improved Indian phone number validation
  const validateIndianPhone = (value) => {
    if (!value) return 'Indian phone number is required';
    
    // Remove all non-digit characters except + (for cleaning)
    const cleaned = value.replace(/[^0-9+]/g, '');
    
    // Check if it starts with +91
    if (cleaned.startsWith('+91')) {
      const digits = cleaned.replace('+91', '');
      if (digits.length === 10 && /^[6-9]/.test(digits)) {
        return true;
      }
      return 'Please enter a valid Indian phone number with +91 followed by 10 digits (e.g., +919876543210)';
    }
    
    // Check if it starts with 0
    if (cleaned.startsWith('0')) {
      const digits = cleaned.replace('0', '');
      if (digits.length === 10 && /^[6-9]/.test(digits)) {
        return true;
      }
      return 'Please enter a valid Indian phone number with 0 followed by 10 digits (e.g., 09876543210)';
    }
    
    // Check if it's exactly 10 digits starting with 6-9
    if (/^[6-9]\d{9}$/.test(cleaned)) {
      return true;
    }
    
    // Check if it has 10 digits starting with 6-9 (with other characters)
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
      return true;
    }
    
    return 'Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)';
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Request a Service Quote"
        subtitle="Get Quote"
        centered={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {submitted ? (
          <Card hoverEffect={false} className="text-center p-12 glassmorphism border border-emerald-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy">Quote Request Submitted!</h3>
            <p className="mt-4 text-slate-600 max-w-lg mx-auto">
              Thank you for reaching out to us. Our logistics and staffing operations team is reviewing your request and will contact you within 24 business hours.
            </p>
            <div className="mt-8">
              <Button variant="navy" onClick={() => setSubmitted(false)}>
                Request Another Quote
              </Button>
            </div>
          </Card>
        ) : (
          <Card hoverEffect={false} className="p-8 sm:p-12 glassmorphism shadow-premium">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Provide Your Enterprise Needs</h3>
            </div>

            {errorMsg && (
              <div className="mb-6 flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Name must be less than 50 characters'
                      },
                      pattern: {
                        value: /^[a-zA-Z\s'-]+$/,
                        message: 'Name can only contain letters, spaces, apostrophes, and hyphens'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Corporate email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address (e.g., name@company.com)',
                      },
                      validate: {
                        noSpaces: (value) => 
                          !value.includes(' ') || 'Email cannot contain spaces',
                        validDomain: (value) => 
                          /\.(com|org|net|in|edu|gov|co|io)$/i.test(value) || 
                          'Please enter a valid email domain (.com, .org, .in, etc.)'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                    placeholder="john@company.com"
                    onBlur={() => trigger('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone - Indian Number with improved validation */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Indian phone number is required',
                      validate: validateIndianPhone
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                    placeholder="9876543210 or +919876543210"
                    onBlur={() => trigger('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Accepts: 9876543210, +919876543210, 09876543210, or 987-654-3210
                  </p>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Service Type Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('serviceType', { 
                      required: 'Please select a service type',
                      validate: (value) => 
                        value !== '' || 'Please select a valid service option'
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.serviceType ? 'border-red-500' : 'border-slate-300'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                  >
                    <option value="">Select Service...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Company Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('companySize', { 
                      required: 'Please select company size',
                      validate: (value) => 
                        value !== '' || 'Please select a valid company size'
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.companySize ? 'border-red-500' : 'border-slate-300'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                  >
                    <option value="">Select Company Size...</option>
                    <option value="1-10">1 - 10 Employees</option>
                    <option value="11-50">11 - 50 Employees</option>
                    <option value="51-200">51 - 200 Employees</option>
                    <option value="201-500">201 - 500 Employees</option>
                    <option value="500+">500+ Employees</option>
                  </select>
                  {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize.message}</p>}
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('pickupLocation', { 
                      required: 'Pickup location is required',
                      minLength: {
                        value: 3,
                        message: 'Pickup location must be at least 3 characters'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.pickupLocation ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                    placeholder="City, State / Port"
                  />
                  {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation.message}</p>}
                </div>

                {/* Delivery Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('deliveryLocation', { 
                      required: 'Delivery location is required',
                      minLength: {
                        value: 3,
                        message: 'Delivery location must be at least 3 characters'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.deliveryLocation ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                    placeholder="City, State / Port"
                  />
                  {errors.deliveryLocation && <p className="text-red-500 text-xs mt-1">{errors.deliveryLocation.message}</p>}
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Details of Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  {...register('message', { 
                    required: 'Please provide details of your requirements',
                    minLength: {
                      value: 10,
                      message: 'Please provide at least 10 characters of detail'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Description must be less than 1000 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent`}
                  placeholder="Describe your freight requirements, weight, volume, frequency, or manpower count and job roles required."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="red"
                  className="w-full"
                  disabled={submitting}
                  icon={Send}
                >
                  {submitting ? 'Submitting Request...' : 'Send Quote Request'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default GetQuote;

