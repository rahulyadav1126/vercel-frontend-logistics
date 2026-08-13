// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
// import api from '../utils/api';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import SectionHeader from '../components/ui/SectionHeader';

// const Contact = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [openFaq, setOpenFaq] = useState(null);

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
//       const response = await api.post('/api/contacts', data);
//       if (response.data.success) {
//         setSubmitted(true);
//         reset();
//       } else {
//         setErrorMsg(response.data.error || 'Failed to submit message.');
//       }
//     } catch (err) {
//       setErrorMsg(err.response?.data?.error || 'Server error. Please try again later.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const faqs = [
//     {
//       q: 'What is your standard mobilization timeline for manpower?',
//       a: 'Depending on the headcount and skill requirements, we can deploy temporary manpower teams within 48 to 72 hours. For highly specialized technical staffing or large-scale plant openings, our mobilization timeline ranges from 2 to 4 weeks.',
//     },
//     {
//       q: 'Do you offer international freight logistics and customs clearance?',
//       a: 'Yes, we provide international multi-modal shipping services. Our logistics teams handle full export/import custom clearance audits, container tracking, port handling, and border compliance.',
//     },
//     {
//       q: 'Are all your supplied workforce insured and compliance-vetted?',
//       a: 'Absolutely. Every worker supplied under our contract staffing service is fully compliance-verified, medically certified, background-checked, and covered by comprehensive employer liability insurance policies.',
//     },
//     {
//       q: 'Can I track my cargo in real time?',
//       a: 'Yes, all our shipping fleets and third-party freight vehicles are equipped with GPS tracking networks. Once your shipment is dispatched, you will receive a secure tracking link showing live coordinates and route progress.',
//     },
//   ];

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//       <SectionHeader
//         title="Connect With Our Global Team"
//         subtitle="Contact Us"
//         centered={true}
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
//         {/* Contact details */}
//         <div className="lg:col-span-1 space-y-6">
//           <Card hoverEffect={false} className="p-8 bg-brand-navy text-white">
//             <h3 className="text-xl font-bold text-white mb-6">Corporate Office</h3>
//             <div className="space-y-6">
//               <div className="flex items-start space-x-4">
//                 <MapPin className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
//                 <div>
//                   <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">HQ Address</p>
//                   <p className="text-black mt-1">100 Logistics Blvd, Suite 400, Chicago, IL 60601</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <Phone className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
//                 <div>
//                   <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">Direct Support</p>
//                   <p className="text-black mt-1">+1 (800) 555-0199</p>
//                   <p className="text-black text-sm">+1 (312) 555-0255</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <Mail className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
//                 <div>
//                   <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">General Email</p>
//                   <a href="mailto:info@logisticsco.com" className="text-black hover:text-brand-red mt-1 block">info@logisticsco.com</a>
//                   <a href="mailto:support@logisticsco.com" className="text-black hover:text-brand-red text-sm block">support@logisticsco.com</a>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <Clock className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
//                 <div>
//                   <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">Operational Hours</p>
//                   <p className="text-black mt-1">Mon - Fri: 8:00 AM - 6:00 PM</p>
//                   <p className="text-black text-sm">Sat: 9:00 AM - 2:00 PM (Emergency Call Support: 24/7)</p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Contact Form */}
//         <div className="lg:col-span-2">
//           <Card hoverEffect={false} className="p-8 sm:p-10 glassmorphism shadow-premium">
//             <h3 className="text-xl font-bold text-brand-navy mb-6">Send an Inquiry Message</h3>

//             {submitted ? (
//               <div className="text-center py-10 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
//                   <CheckCircle2 className="h-8 w-8" />
//                 </div>
//                 <h4 className="text-lg font-bold text-brand-navy">Message Sent Successfully!</h4>
//                 <p className="text-slate-600 text-sm mt-2">
//                   Thank you for your message. We have received your inquiry and our support team will reach out to you shortly.
//                 </p>
//                 <Button variant="navy" className="mt-6" onClick={() => setSubmitted(false)}>
//                   Send Another Message
//                 </Button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {errorMsg && (
//                   <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
//                     <AlertCircle className="h-5 w-5 flex-shrink-0" />
//                     <span>{errorMsg}</span>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-brand-navy mb-2">Name *</label>
//                     <input
//                       type="text"
//                       {...register('name', { required: 'Name is required' })}
//                       className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                       placeholder="Jane Doe"
//                     />


//                     {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-brand-navy mb-2">Email *</label>
//                     <input
//                       type="email"
//                       {...register('email', {
//                         required: 'Email is required',
//                         pattern: {
//                           value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//                           message: 'Valid email required',
//                         },
//                       })}
//                       className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                       placeholder="jane@company.com"
//                     />
//                     {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-brand-navy mb-2">
//                       Phone Number *
//                     </label>
//                     <div className="flex">
//                       <span className="px-4 py-3 bg-gray-100 border border-r-0 rounded-l-lg text-gray-700">
//                         +91
//                       </span>
//                       <input
//                         type="tel"
//                         placeholder="9876543210"
//                         maxLength={10}
//                         {...register("phone", {
//                           required: "Phone number is required",
//                           pattern: {
//                             value: /^[6-9]\d{9}$/,
//                             message: "Enter a valid 10-digit Indian mobile number",
//                           },
//                         })}
//                         onInput={(e) => {
//                           e.target.value = e.target.value.replace(/\D/g, "");
//                         }}
//                         className="w-full px-4 py-3 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                       />
//                     </div>
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.phone.message}
//                       </p>
//                     )}
//                   </div>
//                   <div>


//                     <label className="block text-sm font-semibold text-brand-navy mb-2">Subject *</label>
//                     <input
//                       type="text"
//                       {...register('subject', { required: 'Subject is required' })}
//                       className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                       placeholder="Manpower Supply / Freight quote"
//                     />
//                     {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
//                   </div>
//                 </div>


//                 <div>
//                   <label className="block text-sm font-semibold text-brand-navy mb-2">Message *</label>
//                   <textarea
//                     rows="5"
//                     {...register('message', { required: 'Message content is required' })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
//                     placeholder="Enter your message in detail..."
//                   ></textarea>
//                   {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
//                 </div>

//                 <Button type="submit" variant="red" className="w-full" disabled={submitting} icon={Send}>
//                   {submitting ? 'Sending Message...' : 'Send Message'}
//                 </Button>
//               </form>
//             )}
//           </Card>
//         </div>
//       </div>

//       {/* Accordion FAQ Grid */}
//       <div className="mb-16">
//         <h3 className="text-2xl font-extrabold text-brand-navy text-center mb-8">Frequently Asked Questions</h3>
//         <div className="max-w-3xl mx-auto space-y-4">
//           {faqs.map((faq, index) => {
//             const isOpen = openFaq === index;
//             return (
//               <div key={index} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
//                 <button
//                   type="button"
//                   onClick={() => setOpenFaq(isOpen ? null : index)}
//                   className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-brand-navy hover:text-brand-red transition duration-200"
//                 >
//                   <span>{faq.q}</span>
//                   <ChevronDown className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-red' : ''}`} />
//                 </button>
//                 <AnimatePresence initial={false}>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
//                         {faq.a}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Styled Iframe Map */}

//       <div className="rounded-2xl overflow-hidden shadow-soft-lg border border-slate-200 h-96 w-full">
//         <iframe
//           title="Kala Butter Momos"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.941871288073!2d76.99756187928271!3d28.631504221403038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0f2a693dd09b%3A0x573bbb9cc75b3f9d!2sKala%20butter%20momos!5e0!3m2!1sen!2sin!4v1784970822379!5m2!1sen!2sin"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="strict-origin-when-cross-origin"
//         />
//       </div>
//     </div>
//   );
// };

// export default Contact;


// // add hover effect and  enhace the  

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2, AlertCircle, Building2, Headphones, Globe, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const response = await api.post('/api/contacts', data);
      if (response.data.success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMsg(response.data.error || 'Failed to submit message.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Server error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What is your standard mobilization timeline for manpower?',
      a: 'Depending on the headcount and skill requirements, we can deploy temporary manpower teams within 48 to 72 hours. For highly specialized technical staffing or large-scale plant openings, our mobilization timeline ranges from 2 to 4 weeks.',
    },
    {
      q: 'Do you offer international freight logistics and customs clearance?',
      a: 'Yes, we provide international multi-modal shipping services. Our logistics teams handle full export/import custom clearance audits, container tracking, port handling, and border compliance.',
    },
    {
      q: 'Are all your supplied workforce insured and compliance-vetted?',
      a: 'Absolutely. Every worker supplied under our contract staffing service is fully compliance-verified, medically certified, background-checked, and covered by comprehensive employer liability insurance policies.',
    },
    {
      q: 'Can I track my cargo in real time?',
      a: 'Yes, all our shipping fleets and third-party freight vehicles are equipped with GPS tracking networks. Once your shipment is dispatched, you will receive a secure tracking link showing live coordinates and route progress.',
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Connect With Our Global Team"
        subtitle="Contact Us"
        centered={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Contact details */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card hoverEffect={false} className="p-8 bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:translate-x-1/4 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 group-hover:-translate-x-1/4 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-brand-red/20 rounded-xl group-hover:bg-brand-red/30 transition-colors duration-300">
                    <Building2 className="h-7 w-7 text-brand-red" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Corporate Office</h3>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: 'HQ Address', value: 'Plot No. 46, Veer Bazar Road, Beside Butter Momos, Jai Vihar Phase-1, Najafgarh, New Delhi, Delhi - 110043' },
                    { icon: Phone, label: 'Direct Support', value: '+91 99564 26456' },
                    { icon: Mail, label: 'General Email', value: 'manasmadhavlogistics@gmail.com', isLink: true },
                    { icon: Clock, label: 'Operational Hours', value: 'Mon - Fri: 8:00 AM - 6:00 PM', sub: 'Sat: 9:00 AM - 2:00 PM' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item"
                    >
                      <div className="p-2 bg-brand-red/20 rounded-lg group-hover/item:bg-brand-red/30 transition-colors duration-300">
                        <item.icon className="h-5 w-5 text-brand-red flex-shrink-0" />
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">{item.label}</p>
                        {item.isLink ? (
                          <a href={`mailto:${item.value}`} className="text-white hover:text-brand-red transition-colors mt-1 block text-sm font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white mt-1 text-sm font-medium">{item.value}</p>
                        )}
                        {item.sub && (
                          item.isLink ? (
                            <a href={`mailto:${item.sub}`} className="text-slate-300 hover:text-brand-red transition-colors text-sm block">
                              {item.sub}
                            </a>
                          ) : (
                            <p className="text-slate-300 text-sm">{item.sub}</p>
                          )
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Emergency badge */}
                {/* <div className="mt-8 p-4 bg-red-500/20 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300 group/emergency">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/30 rounded-lg animate-pulse group-hover/emergency:animate-none">
                      <Headphones className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-sm">24/7 Emergency Support</p>
                      <p className="text-white text-xs">Always available for urgent assistance</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card hoverEffect={false} className="p-8 sm:p-10 bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-500 border border-slate-100 relative overflow-hidden group">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-navy/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-red/10 rounded-xl group-hover:bg-brand-red/20 transition-colors duration-300">
                  <Send className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">Send an Inquiry Message</h3>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200"
                >
                  <motion.div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-brand-navy">Message Sent Successfully!</h4>
                  <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                    Thank you for your message. We have received your inquiry and our support team will reach out to you shortly.
                  </p>
                  <Button variant="navy" className="mt-6" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {errorMsg && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center space-x-2 rounded-xl bg-red-50 p-4 text-red-700 text-sm border border-red-200"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">Full Name *</label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 transition-all duration-300 outline-none hover:border-brand-red/50"
                        placeholder="Jane Doe"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">Email Address *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Valid email required',
                          },
                        })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 transition-all duration-300 outline-none hover:border-brand-red/50"
                        placeholder="jane@company.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Phone Number *
                      </label>
                      <div className="flex group">
                        <span className="px-4 py-3 bg-slate-100 border-2 border-r-0 rounded-l-xl text-slate-700 font-semibold text-sm group-hover:border-brand-red/50 transition-colors duration-300">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          maxLength={10}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: "Enter a valid 10-digit Indian mobile number",
                            },
                          })}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-r-xl focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 transition-all duration-300 outline-none group-hover:border-brand-red/50"
                        />
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">Subject *</label>
                      <input
                        type="text"
                        {...register('subject', { required: 'Subject is required' })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 transition-all duration-300 outline-none hover:border-brand-red/50"
                        placeholder="Manpower Supply / Freight quote"
                      />
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.subject.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">Message *</label>
                    <textarea
                      rows="5"
                      {...register('message', { required: 'Message content is required' })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 transition-all duration-300 outline-none hover:border-brand-red/50 resize-none"
                      placeholder="Enter your message in detail..."
                    ></textarea>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="red"
                    className="w-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    disabled={submitting}
                    icon={Send}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Accordion FAQ Grid */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-red/30"></div>
          <h3 className="text-3xl font-extrabold text-brand-navy text-center">Frequently Asked Questions</h3>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-red/30"></div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border-2 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ${isOpen ? 'border-brand-red/40 shadow-lg' : 'border-slate-200 hover:border-slate-300'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-brand-navy hover:text-brand-red transition duration-200 group"
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isOpen
                      ? 'bg-brand-red text-white scale-110'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-brand-red/20 group-hover:text-brand-red'
                      }`}>
                      {index + 1}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 transform transition-all duration-300 ${isOpen ? 'rotate-180 text-brand-red' : ''
                    }`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-3 text-slate-600 text-sm leading-relaxed border-t-2 border-brand-red/20 bg-gradient-to-br from-slate-50 to-white">
                        <div className="flex items-start gap-3">
                          <div className="w-1 h-full bg-gradient-to-b from-brand-red to-brand-red/20 rounded-full"></div>
                          <p className="pl-2">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 h-96 w-full relative group"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Map overlay badge */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 group-hover:bg-white transition-all duration-300">
          <div className="p-1.5 bg-brand-red/10 rounded-lg group-hover:bg-brand-red/20 transition-colors duration-300">
            <Globe className="h-4 w-4 text-brand-red" />
          </div>
          <span className="text-xs font-semibold text-brand-navy">Find Us Here</span>
        </div>

        {/* Map interaction overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

        <iframe
          title="Kala Butter Momos"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.941871288073!2d76.99756187928271!3d28.631504221403038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0f2a693dd09b%3A0x573bbb9cc75b3f9d!2sKala%20butter%20momos!5e0!3m2!1sen!2sin!4v1784970822379!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="group-hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
    </div>
  );
};

export default Contact;

