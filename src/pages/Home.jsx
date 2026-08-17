

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import Video from "../assets/truck.mp4";

// import {
//   Truck,
//   Warehouse,
//   Users,
//   GraduationCap,
//   Activity,
//   ArrowRight,
//   ShieldAlert,
//   ChevronDown,
//   Calendar,
//   Send,
//   Star,
//   Globe,
//   Award,
//   Users2,
//   Clock,
//   CheckCircle,
//   HelpCircle,
//   ThumbsUp,
//   MapPin,
//   CheckCircle2,
//   AlertCircle,
//   Sparkles,
//   TrendingUp,
//   Shield,
//   Zap,
//   Building2,
//   Package,
//   ShoppingBag,
//   Headphones,
//   Briefcase,
//   Target,
//   Layers,
//   Rocket
// } from 'lucide-react';

// import api from '../utils/api';
// import useFetch from '../hooks/useFetch';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import SectionHeader from '../components/ui/SectionHeader';
// // Fallbacks in case MongoDB is offline
// const fallbackServices = [
//   { _id: '1', title: 'Road & Rail Freight Logistics', description: 'Comprehensive heavy hauling and overland transportation services across nationwide freight networks.', icon: 'Truck', category: 'Logistics' },
//   { _id: '2', title: 'Warehousing & Distribution Management', description: 'State-of-the-art secure distribution centers with intelligent inventory tracking systems.', icon: 'Warehouse', category: 'Logistics' },
//   { _id: '3', title: 'Contract Staffing & Recruitment', description: 'Providing highly skilled temporary, permanent, and seasonal manpower tailored to enterprise requirements.', icon: 'Users', category: 'Manpower' },
//   { _id: '4', title: 'Industrial Skill Development Programs', description: 'Accredited training and certification programs for machine operator and warehouse safety personnel.', icon: 'GraduationCap', category: 'Manpower' },
// ];

// const fallbackGallery = [
//   { _id: '1', title: 'Modern Transport Fleet Ready for Dispatch', imageUrl: 'https://images.unsplash.com/photo-1516576885230-101c7414ddf2?auto=format&fit=crop&q=80&w=400', category: 'Logistics' },
//   { _id: '2', title: 'Vast Warehouse and Distribution Center Operations', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400', category: 'Warehouse' },
//   { _id: '3', title: 'Professional Manpower Training Session', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400', category: 'Manpower' },
// ];

// const fallbackTestimonials = [
//   { _id: '1', clientName: 'Sarah Jenkins', company: 'Prime Retail Group, COO', feedback: 'Partnering with this team has completely streamlined our supply chain. Their delivery timelines are rock-solid, and their e-commerce fulfillment error rate is practically non-existent. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
//   { _id: '2', clientName: 'David Chen', company: 'Apex Manufacturing, Director of Operations', feedback: 'We rely heavily on their contract manpower solutions. During peak manufacturing seasons, they provided 120 certified assembly line personnel within 72 hours. Their compliance checks and safety training are exceptional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
// ];

// const iconMap = {
//   Truck: Truck,
//   Warehouse: Warehouse,
//   Users: Users,
//   GraduationCap: GraduationCap,
//   Activity: Activity,
// };

// const Home = () => {
//   const [openFaq, setOpenFaq] = useState(null);
//   const [contactSubmitted, setContactSubmitted] = useState(false);
//   const [contactSubmitting, setContactSubmitting] = useState(false);
//   const [contactError, setContactError] = useState('');
//   const [hoveredService, setHoveredService] = useState(null);
//   const [hoveredIndustry, setHoveredIndustry] = useState(null);

//   // Fetch from APIs
//   const { data: dbServices } = useFetch('/api/services');
//   const { data: dbGallery } = useFetch('/api/gallery');
//   const { data: dbTestimonials } = useFetch('/api/testimonials');

//   const services = dbServices && dbServices.length > 0 ? dbServices.slice(0, 4) : fallbackServices;
//   const gallery = dbGallery && dbGallery.length > 0 ? dbGallery.slice(0, 3) : fallbackGallery;
//   const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleContactSubmit = async (data) => {
//     setContactSubmitting(true);
//     setContactError('');
//     try {
//       const res = await api.post('/api/contacts', data);
//       if (res.data.success) {
//         setContactSubmitted(true);
//         reset();
//       } else {
//         setContactError(res.data.error || 'Failed to submit contact request.');
//       }
//     } catch (err) {
//       setContactError(err.response?.data?.error || 'Server connection error. Message saved locally.');
//       setTimeout(() => {
//         setContactSubmitted(true);
//         reset();
//       }, 1000);
//     } finally {
//       setContactSubmitting(false);
//     }
//   };

//   const clients = [
//     'GLOBAL LOGISTICS CORP',
//     'EXPRESS COURIERS',
//     'APEX MANUFACTURING',
//     'RETAIL GIANTS INC',
//     'SUPPLY CHAIN CO',
//   ];

//   const stats = [
//     { value: '1.2M+', label: 'Tons Cargo Transported', icon: Globe, color: 'from-blue-500 to-cyan-400' },
//     { value: '25,000+', label: 'Staff Mobilized', icon: Users2, color: 'from-emerald-500 to-teal-400' },
//     { value: '99.8%', label: 'Delivery Accuracy Rate', icon: ThumbsUp, color: 'from-purple-500 to-pink-400' },
//     { value: '24/7', label: 'Safety Support Desk', icon: Clock, color: 'from-orange-500 to-red-400' },
//   ];

//   const timelineSteps = [
//     { num: '01', title: 'Consultation', desc: 'Analyzing your supply chain lanes and temporary staffing requisitions.', icon: Headphones },
//     { num: '02', title: 'Operational Audit', desc: 'Establishing safety metrics, routing optimization maps, and skill requisitions.', icon: Shield },
//     { num: '03', title: 'Crew & Fleet Dispatch', desc: 'Deploying heavy freight trucks or compliance-vetted workforce crews directly to site.', icon: Truck },
//     { num: '04', title: 'Coordinated Oversight', desc: 'Continuous route logs reporting and safety coordinators supervising warehouse staff.', icon: Activity },
//   ];

//   const faqs = [
//     { q: 'What is your standard mobilization timeline for manpower?', a: 'Depending on the headcount and skill requirements, we can deploy temporary manpower teams within 48 to 72 hours.' },
//     { q: 'Do you offer international freight logistics and customs clearance?', a: 'Yes, we provide international multi-modal shipping services. Our logistics teams handle full export/import custom clearance audits.' },
//     { q: 'Are all your supplied workforce insured and compliance-vetted?', a: 'Absolutely. Every worker supplied under our contract staffing service is fully compliance-verified, background-checked, and covered by comprehensive employer liability insurance policies.' },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <div className="space-y-24 pb-16">
//       {/* 1. HERO SECTION - Enhanced with animated elements */}
//       <section className="relative h-[90vh] flex items-center bg-brand-navy text-white overflow-hidden">
//         {/* Background Image Overlay with Parallax effect */}
//          {/* <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600')" }}></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"></div>  */}

//         <video
//   className="absolute inset-0 w-full h-full object-cover opacity-30"
//   src={Video}
//   autoPlay
//   loop
//   muted
//   playsInline
//   preload="auto"
// >
//   Your browser does not support the video tag.
// </video>

// <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"></div>


//         {/* Animated floating particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-brand-red/30 rounded-full"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//                 scale: 0,
//               }}
//               animate={{
//                 y: [null, -100, -200],
//                 opacity: [0, 1, 0],
//                 scale: [0, 2, 0],
//               }}
//               transition={{
//                 duration: 5 + Math.random() * 10,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
//           <div className="max-w-3xl">
//             <motion.span
//               className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-red text-white mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               Enterprise Logistics & Manpower Partner
//             </motion.span>
//             <motion.h1
//               className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//             >
//               Streamlining Freight. <br />
//               <span className="text-brand-red relative">
//                 Mobilizing Vetted Staff.
//                 <motion.span
//                   className="absolute -bottom-2 left-0 w-full h-1 bg-brand-red"
//                   initial={{ width: 0 }}
//                   animate={{ width: '100%' }}
//                   transition={{ duration: 0.8, delay: 0.5 }}
//                 />
//               </span>
//             </motion.h1>
//             <motion.p
//               className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               A professional logistics operator and contract manpower supply agency delivering corporate excellence, absolute safety, and absolute compliance.
//             </motion.p>
//             <motion.div
//               className="mt-10 flex flex-wrap gap-4"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               <Link to="/get-quote">
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button variant="red" size="lg" className="shadow-lg hover:shadow-2xl transition-all duration-300">
//                     Request a Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </motion.div>
//               </Link>
//               <Link to="/careers">
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button variant="outline-white" size="lg" className="hover:bg-white/10 transition-all duration-300">
//                     Explore Careers
//                   </Button>
//                 </motion.div>
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* 2. TRUSTED CLIENTS - Enhanced with hover effects */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
//         <motion.p
//           className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           Trusted by Industry Leaders Globally
//         </motion.p>
//         <motion.div
//           className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 0.6 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           {clients.map((client, index) => (
//             <motion.div
//               key={client}
//               className="text-sm font-black text-brand-navy tracking-wider px-4 py-2 border-2 border-slate-200 rounded-lg cursor-pointer transition-all duration-300 hover:border-brand-red hover:bg-red-50 hover:scale-105 hover:shadow-lg"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//             >
//               {client}
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* 3. SERVICES SECTION - Enhanced with advanced hover effects */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <SectionHeader
//           title="Engineered Services to Power Your Operation"
//           subtitle="Our Services"
//           centered={true}
//         />
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {services.map((srv, index) => {
//             const LucideIcon = iconMap[srv.icon] || Truck;
//             const isHovered = hoveredService === index;
//             return (
//               <motion.div
//                 key={srv._id}
//                 variants={itemVariants}
//                 onMouseEnter={() => setHoveredService(index)}
//                 onMouseLeave={() => setHoveredService(null)}
//                 whileHover={{ y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card hoverEffect={true} className="flex flex-col justify-between relative overflow-hidden group">
//                   {/* Animated gradient background on hover */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                     initial={false}
//                     animate={{ opacity: isHovered ? 1 : 0 }}
//                   />

//                   <div className="relative z-10">
//                     <motion.div
//                       className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
//                       whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       <LucideIcon className="h-6 w-6" />
//                     </motion.div>
//                     <h4 className="font-extrabold text-brand-navy text-lg mb-2 group-hover:text-brand-red transition-colors duration-300">{srv.title}</h4>
//                     <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{srv.description}</p>
//                   </div>

//                   <Link to="/services" className="relative z-10 mt-6 inline-flex items-center text-xs font-bold text-brand-navy group-hover:text-brand-red transition-all duration-300">
//                     <span className="group-hover:mr-2 transition-all duration-300">Learn More</span>
//                     <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-2 transition-all duration-300" />
//                   </Link>

//                   {/* Corner accent */}
//                   <motion.div
//                     className="absolute -right-12 -top-12 w-24 h-24 bg-brand-red/5 rounded-full"
//                     animate={{
//                       scale: isHovered ? 2 : 0.5,
//                       opacity: isHovered ? 1 : 0,
//                     }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </section>

//       {/* 4. WHY CHOOSE US - Enhanced with animations */}
//       <section className="bg-brand-navy py-20 text-white border-t-4 border-b-4 border-brand-red relative overflow-hidden">
//         {/* Animated background pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_transparent_0%,_transparent_2px,_rgba(255,255,255,0.1)_2px,_rgba(255,255,255,0.1)_4px)] bg-[length:20px_20px]" />
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Operational Advantage</span>
//               <h3 className="text-3xl font-extrabold text-white sm:text-4xl mt-2 leading-snug">Why Cooperate With Our Agency?</h3>
//               <p className="mt-4 text-slate-300 text-sm leading-relaxed">
//                 Logistics managers and HR executives face massive hurdles coordinating multiple service contracts. We combine fleet hauling logistics and worker staffing under one cohesive service level agreement (SLA).
//               </p>
//               <div className="mt-8 space-y-4">
//                 {[
//                   { title: '100% Insured Compliance', desc: 'Every worker holds active certifications, background verifications, and medical clearance logs.', icon: Shield },
//                   { title: 'Rapid Mobilization Desks', desc: 'Our dedicated operations desks coordinate shipping routes and staff schedules 24/7/365.', icon: Zap },
//                   { title: 'Tailored SLA Pricing', desc: 'Save up to 15% on logistics coordination fees by bundling staffing and shipping needs.', icon: TrendingUp },
//                 ].map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     className="flex items-start space-x-3 group cursor-pointer"
//                     whileHover={{ x: 5 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <motion.div
//                       className="flex-shrink-0 mt-0.5"
//                       whileHover={{ rotate: 360, scale: 1.2 }}
//                       transition={{ duration: 0.4 }}
//                     >
//                       <CheckCircle className="h-6 w-6 text-brand-red" />
//                     </motion.div>
//                     <div>
//                       <h4 className="font-bold text-white text-sm group-hover:text-brand-red transition-colors duration-300">{item.title}</h4>
//                       <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//             <motion.div
//               className="relative rounded-2xl overflow-hidden shadow-premium h-80"
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600"
//                 alt="Truck driver loading cargo"
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//             <video
//   src={Video}
//   autoPlay
//   loop
//   muted
//   playsInline
//   className="w-full h-full object-cover"
// />
//               <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* 5. COMPANY STATISTICS - Enhanced with animated counters */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="grid grid-cols-2 lg:grid-cols-4 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {stats.map((stat, idx) => {
//             const Icon = stat.icon;
//             return (
//               <motion.div
//                 key={idx}
//                 variants={itemVariants}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card hoverEffect={true} className="text-center p-6 bg-slate-50 border border-slate-200 relative overflow-hidden group">
//                   <motion.div
//                     className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
//                   />
//                   <motion.div
//                     className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
//                     whileHover={{ rotate: 360, scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Icon className="h-6 w-6" />
//                   </motion.div>
//                   <motion.p
//                     className="text-3xl font-extrabold text-brand-navy"
//                     initial={{ scale: 0.5 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: idx * 0.1 }}
//                   >
//                     {stat.value}
//                   </motion.p>
//                   <p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-wider">{stat.label}</p>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </section>

//       {/* 6. INDUSTRIES WE SERVE - Enhanced with hover effects */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <SectionHeader
//           title="Industries We Keep In Motion"
//           subtitle="Industries Served"
//           centered={true}
//         />
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {[
//             { title: 'Manufacturing & Plants', icon: Building2, bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
//             { title: 'Warehouse Logistics', icon: Package, bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300' },
//             { title: 'Retail & FMCG Networks', icon: ShoppingBag, bg: 'https://images.unsplash.com/photo-1516576885230-101c7414ddf2?auto=format&fit=crop&q=80&w=300' },
//             { title: 'Civil Infrastructure', icon: Building2, bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=300' },
//           ].map((item, idx) => (
//             <motion.div
//               key={idx}
//               variants={itemVariants}
//               className="relative rounded-2xl overflow-hidden h-60 shadow group cursor-pointer"
//               whileHover={{ y: -10, scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//               onMouseEnter={() => setHoveredIndustry(idx)}
//               onMouseLeave={() => setHoveredIndustry(null)}
//             >
//               <motion.img
//                 src={item.bg}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//                 animate={{ scale: hoveredIndustry === idx ? 1.1 : 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//               <motion.div
//                 className="absolute inset-0 bg-brand-navy/70 flex flex-col justify-end p-6"
//                 animate={{ backgroundColor: hoveredIndustry === idx ? 'rgba(10, 20, 40, 0.8)' : 'rgba(10, 20, 40, 0.7)' }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <motion.div
//                   className="flex items-center space-x-2"
//                   animate={{ x: hoveredIndustry === idx ? 5 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <item.icon className="h-5 w-5 text-brand-red" />
//                   <h4 className="text-lg font-bold text-white leading-snug">{item.title}</h4>
//                 </motion.div>
//                 <Link to="/industries" className="text-brand-red text-xs font-bold mt-2 flex items-center group-hover:translate-x-2 transition-all duration-300">
//                   Learn Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
//                 </Link>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* 7. WORKING PROCESS TIMELINE - Enhanced with icons and animations */}
//       <section className="bg-slate-50 py-20 border-t border-b border-slate-200/60 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_transparent_0%,_rgba(220,38,38,0.03)_100%)]" />

//         <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             title="Coordinated Onboarding Timeline"
//             subtitle="Working Process"
//             centered={true}
//           />
//           <motion.div
//             className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {/* Connecting line */}
//             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-brand-red/20 via-brand-red/40 to-brand-red/20 hidden lg:block -translate-y-1/2" />

//             {timelineSteps.map((step, idx) => {
//               const Icon = step.icon;
//               return (
//                 <motion.div
//                   key={idx}
//                   variants={itemVariants}
//                   className="relative group"
//                   whileHover={{ y: -5 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="relative bg-white p-8 rounded-2xl shadow-soft-lg border border-slate-100 text-left hover:shadow-xl transition-all duration-300 hover:border-brand-red/30">
//                     <motion.div
//                       className="absolute -top-6 left-6 text-5xl font-black text-brand-red opacity-15 group-hover:opacity-25 transition-opacity duration-300"
//                       whileHover={{ scale: 1.2 }}
//                     >
//                       {step.num}
//                     </motion.div>

//                     <motion.div
//                       className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
//                       whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       <Icon className="h-5 w-5" />
//                     </motion.div>

//                     <h4 className="text-xl font-bold text-brand-navy mb-3 mt-2 group-hover:text-brand-red transition-colors duration-300">{step.title}</h4>
//                     <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>

//                     {/* Progress indicator */}
//                     <motion.div
//                       className="absolute bottom-0 left-0 h-1 bg-brand-red rounded-b-2xl"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: '100%' }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.8, delay: idx * 0.1 }}
//                     />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* 8. GALLERY HIGHLIGHT - Enhanced with overlay animations */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <SectionHeader
//           title="On-site Operations in Action"
//           subtitle="Portfolio Highlight"
//           centered={true}
//         />
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {gallery.map((item) => (
//             <motion.div
//               key={item._id}
//               variants={itemVariants}
//               className="relative rounded-2xl overflow-hidden h-64 group shadow shadow-soft-lg"
//               whileHover={{ y: -10, scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//                 animate={{ scale: 1 }}
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.5 }}
//               />
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//               >
//                 <motion.span
//                   className="text-xs font-semibold text-brand-red uppercase tracking-wider"
//                   initial={{ y: 20, opacity: 0 }}
//                   whileHover={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {item.category}
//                 </motion.span>
//                 <motion.h4
//                   className="text-white font-bold mt-1 text-base"
//                   initial={{ y: 20, opacity: 0 }}
//                   whileHover={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.3, delay: 0.1 }}
//                 >
//                   {item.title}
//                 </motion.h4>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//         <motion.div
//           className="text-center mt-10"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           <Link to="/gallery">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button variant="outline" className="hover:shadow-lg transition-all duration-300">
//                 View Full Operations Gallery
//               </Button>
//             </motion.div>
//           </Link>
//         </motion.div>
//       </section>

//       {/* 9. TESTIMONIALS - Enhanced with card hover effects */}
//       <section className="bg-brand-navy py-20 text-white border-t-4 border-b-4 border-brand-red relative overflow-hidden">
//         {/* Animated background */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_transparent_0%,_transparent_2px,_rgba(255,255,255,0.1)_2px,_rgba(255,255,255,0.1)_4px)] bg-[length:20px_20px]" />
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <SectionHeader
//             title="What Our Corporate Partners Say"
//             subtitle="Testimonials"
//             centered={true}
//             white={true}
//           />
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 gap-12"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {testimonials.map((test) => (
//               <motion.div
//                 key={test._id}
//                 variants={itemVariants}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card hoverEffect={false} className="bg-brand-navy-light text-slate-300 p-8 border border-slate-700/60 flex flex-col justify-between relative group hover:border-brand-red/50 transition-all duration-300">
//                   <motion.div
//                     className="absolute -right-4 -top-4 w-20 h-20 bg-brand-red/5 rounded-full"
//                     whileHover={{ scale: 2 }}
//                     transition={{ duration: 0.3 }}
//                   />

//                   <div>
//                     <motion.div
//                       className="flex space-x-1 text-brand-red mb-4"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {[...Array(test.rating)].map((_, i) => (
//                         <motion.div
//                           key={i}
//                           whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <Star className="h-4.5 w-4.5 fill-current" />
//                         </motion.div>
//                       ))}
//                     </motion.div>
//                     <p className="text-sm italic leading-relaxed mb-6 font-medium text-black relative">
//                       <span className="text-brand-red text-3xl absolute -top-1 -left-3 opacity-50"></span>
//                       {test.feedback}
//                       <span className="text-brand-red text-3xl absolute -bottom-4 opacity-50"></span>
//                     </p>
//                   </div>
// {/* yha span k under " lga tha */}
//                   <div className="flex items-center space-x-4">
//                     {test.avatar && (
//                       <motion.img
//                         src={test.avatar}
//                         alt={test.clientName}
//                         className="h-12 w-12 rounded-full object-cover shadow border border-slate-600"
//                         whileHover={{ scale: 1.1, rotate: 360 }}
//                         transition={{ duration: 0.5 }}
//                       />
//                     )}
//                     {/* y h  review k liye  group-hover text brand red    */}
//                     <div>
//                       <h5 className="font-bold text-black text-sm group-hover:text-brand-red transition-colors duration-300">{test.clientName}</h5>   
//                       <p className="text-xs text-brand-red font-semibold">{test.company}</p>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* 10. FAQ & CONTACT FORM - Enhanced with animations */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* FAQ panel */}
//           <div>
//             <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Help Center</span>
//             <h3 className="text-3xl font-extrabold text-brand-navy mt-2 mb-8 leading-snug">Answers to Common Questions</h3>
//             <div className="space-y-4">
//               {faqs.map((faq, index) => {
//                 const isOpen = openFaq === index;
//                 return (
//                   <motion.div
//                     key={index}
//                     className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => setOpenFaq(isOpen ? null : index)}
//                       className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-brand-navy hover:text-brand-red transition-all duration-300 group"
//                     >
//                       <span className="text-sm flex items-center">
//                         <HelpCircle className="h-4 w-4 mr-2 text-brand-red opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
//                         {faq.q}
//                       </span>
//                       <motion.div
//                         animate={{ rotate: isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <ChevronDown className={`h-4 w-4 transform transition-colors duration-300 ${isOpen ? 'text-brand-red' : 'text-slate-400 group-hover:text-brand-red'}`} />
//                       </motion.div>
//                     </button>
//                     <AnimatePresence initial={false}>
//                       {isOpen && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: 'auto', opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <div className="px-6 pb-5 pt-1 text-slate-500 text-xs leading-relaxed border-t border-slate-100">
//                             {faq.a}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Inline Contact form - Enhanced with animations */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <Card hoverEffect={false} className="p-8 glassmorphism shadow-premium relative overflow-hidden group">
//               <motion.div
//                 className="absolute -right-20 -top-20 w-40 h-40 bg-brand-red/5 rounded-full"
//                 whileHover={{ scale: 2 }}
//                 transition={{ duration: 0.5 }}
//               />

//               <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center">
//                 <Sparkles className="h-5 w-5 text-brand-red mr-2" />
//                 Quick Contact Form
//               </h3>

//               {contactSubmitted ? (
//                 <motion.div
//                   className="text-center py-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <motion.div
//                     className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3"
//                     whileHover={{ scale: 1.1, rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <CheckCircle2 className="h-6 w-6" />
//                   </motion.div>
//                   <h4 className="text-base font-bold text-brand-navy">Lead Saved Successfully!</h4>
//                   <p className="text-slate-600 text-xs mt-1">We will respond within 24 hours.</p>
//                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                     <Button variant="navy" className="mt-4" onClick={() => setContactSubmitted(false)}>
//                       Send Another Message
//                     </Button>
//                   </motion.div>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-4">
//                   {contactError && (
//                     <motion.div
//                       className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700 text-xs"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <AlertCircle className="h-4 w-4 flex-shrink-0" />
//                       <span>{contactError}</span>
//                     </motion.div>
//                   )}

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <motion.input
//                         type="text"
//                         placeholder="Your Name *"
//                         {...register('name', { required: 'Name is required' })}
//                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
//                         whileFocus={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                       />
//                       {errors.name && <p className="text-red-500 text-[10px] mt-0.5 animate-pulse">{errors.name.message}</p>}
//                     </div>
//                     <div>
//                       <motion.input
//                         type="email"
//                         placeholder="Corporate Email *"
//                         {...register('email', { required: 'Email is required' })}
//                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
//                         whileFocus={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                       />
//                       {errors.email && <p className="text-red-500 text-[10px] mt-0.5 animate-pulse">{errors.email.message}</p>}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <motion.input
//                         type="tel"
//                         placeholder="Phone Number *"
//                         {...register('phone', { required: 'Phone is required' })}
//                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
//                         whileFocus={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                       />
//                       {errors.phone && <p className="text-red-500 text-[10px] mt-0.5 animate-pulse">{errors.phone.message}</p>}
//                     </div>
//                     <div>
//                       <motion.input
//                         type="text"
//                         placeholder="Subject *"
//                         {...register('subject', { required: 'Subject is required' })}
//                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
//                         whileFocus={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                       />
//                       {errors.subject && <p className="text-red-500 text-[10px] mt-0.5 animate-pulse">{errors.subject.message}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <motion.textarea
//                       rows="3"
//                       placeholder="Your Message *"
//                       {...register('message', { required: 'Message is required' })}
//                       className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50 resize-none"
//                       whileFocus={{ scale: 1.02 }}
//                       transition={{ duration: 0.2 }}
//                     />
//                     {errors.message && <p className="text-red-500 text-[10px] mt-0.5 animate-pulse">{errors.message.message}</p>}
//                   </div>

//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Button type="submit" variant="red" className="w-full group" disabled={contactSubmitting} icon={Send}>
//                       {contactSubmitting ? (
//                         <span className="flex items-center">
//                           <span className="animate-spin mr-2">⟳</span>
//                           Sending Request...
//                         </span>
//                       ) : (
//                         'Send Inquiry'
//                       )}
//                     </Button>
//                   </motion.div>
//                 </form>
//               )}
//             </Card>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* 11. GOOGLE MAP SECTION - Enhanced with hover effect */}
//       <motion.section
//         className="rounded-3xl overflow-hidden shadow-soft-lg border border-slate-200 h-96 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
//         whileHover={{ scale: 1.01 }}
//         transition={{ duration: 0.3 }}
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <iframe
//           title="Logistics Company Map HQ Location"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.941871288073!2d76.99756187928271!3d28.631504221403038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0f2a693dd09b%3A0x573bbb9cc75b3f9d!2sKala%20butter%20momos!5e0!3m2!1sen!2sin!4v1784970822379!5m2!1sen!2sin"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//           className="rounded-3xl"
//         ></iframe>
//       </motion.section>
//     </div>
//   );
// };

// export default Home;


// //  add the animation use framer motion threjs or gsap and check the testimonial text color slate color replace to black  

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Video from "../assets/truck.mp4";

import {
  Truck,
  Warehouse,
  Users,
  GraduationCap,
  Activity,
  ArrowRight,
  ChevronDown,
  Send,
  Star,
  Globe,
  Users2,
  Clock,
  CheckCircle,
  HelpCircle,
  ThumbsUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Package,
  ShoppingBag,
  Headphones,
  Briefcase,
  Quote,
} from 'lucide-react';

import api from '../utils/api';
import useFetch from '../hooks/useFetch';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

// Fallbacks in case MongoDB is offline
const fallbackServices = [
  { _id: '1', title: 'Road & Rail Freight Logistics', description: 'Comprehensive heavy hauling and overland transportation services across nationwide freight networks.', icon: 'Truck', category: 'Logistics' },
  { _id: '2', title: 'Warehousing & Distribution Management', description: 'State-of-the-art secure distribution centers with intelligent inventory tracking systems.', icon: 'Warehouse', category: 'Logistics' },
  { _id: '3', title: 'Contract Staffing & Recruitment', description: 'Providing highly skilled temporary, permanent, and seasonal manpower tailored to enterprise requirements.', icon: 'Users', category: 'Manpower' },
  { _id: '4', title: 'Industrial Skill Development Programs', description: 'Accredited training and certification programs for machine operator and warehouse safety personnel.', icon: 'GraduationCap', category: 'Manpower' },
];

const fallbackGallery = [
  { _id: '1', title: 'Modern Transport Fleet Ready for Dispatch', imageUrl: 'https://images.unsplash.com/photo-1516576885230-101c7414ddf2?auto=format&fit=crop&q=80&w=400', category: 'Logistics' },
  { _id: '2', title: 'Vast Warehouse and Distribution Center Operations', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400', category: 'Warehouse' },
  { _id: '3', title: 'Professional Manpower Training Session', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400', category: 'Manpower' },
];

const fallbackTestimonials = [
  { _id: '1', clientName: 'Sarah Jenkins', company: 'Prime Retail Group, COO', feedback: 'Partnering with this team has completely streamlined our supply chain. Their delivery timelines are rock-solid, and their e-commerce fulfillment error rate is practically non-existent. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { _id: '2', clientName: 'David Chen', company: 'Apex Manufacturing, Director of Operations', feedback: 'We rely heavily on their contract manpower solutions. During peak manufacturing seasons, they provided 120 certified assembly line personnel within 72 hours. Their compliance checks and safety training are exceptional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { _id: '3', clientName: 'Emily Rodriguez', company: 'Supply Chain Solutions Inc, CEO', feedback: 'The level of professionalism and attention to detail is unmatched. Our logistics efficiency improved by 40% within the first quarter of working with them.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
  { _id: '4', clientName: 'Michael Thompson', company: 'Global Trade Partners, VP', feedback: 'Their manpower solutions are second to none. The quality of staff they provide is consistently excellent, and their compliance standards are exceptional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
];

const iconMap = {
  Truck: Truck,
  Warehouse: Warehouse,
  Users: Users,
  GraduationCap: GraduationCap,
  Activity: Activity,
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState('');
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredIndustry, setHoveredIndustry] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) > 2) {
        const newDirection = scrollY > lastScrollY ? 'reverse' : 'normal';
        if (marqueeRef.current && marqueeRef.current.style.animationDirection !== newDirection) {
          marqueeRef.current.style.animationDirection = newDirection;
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Scroll animations using framer-motion
  const { scrollYProgress } = useScroll();
  const springConfig = { damping: 15, stiffness: 100 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.7]);

  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch from APIs
  const { data: dbServices } = useFetch('/api/services');
  const { data: dbGallery } = useFetch('/api/gallery');
  const { data: dbTestimonials } = useFetch('/api/testimonials');

  const services = dbServices && dbServices.length > 0 ? dbServices.slice(0, 4) : fallbackServices;
  const gallery = dbGallery && dbGallery.length > 0 ? dbGallery.slice(0, 3) : fallbackGallery;
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  // Duplicate testimonials for infinite scroll
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const handleContactSubmit = async (data) => {
    setContactSubmitting(true);
    setContactError('');
    try {
      const res = await api.post('/api/contacts', data);
      if (res.data.success) {
        setContactSubmitted(true);
        reset();
      } else {
        setContactError(res.data.error || 'Failed to submit contact request.');
      }
    } catch (err) {
      setContactError(err.response?.data?.error || 'Server connection error. Message saved locally.');
      setTimeout(() => {
        setContactSubmitted(true);
        reset();
      }, 1000);
    } finally {
      setContactSubmitting(false);
    }
  };

  const clients = [
    'GLOBAL LOGISTICS CORP',
    'EXPRESS COURIERS',
    'APEX MANUFACTURING',
    'RETAIL GIANTS INC',
    'SUPPLY CHAIN CO',
  ];

  // Duplicate clients for infinite scroll effect
  const infiniteClients = [...clients, ...clients, ...clients];

  const stats = [
    { value: '1.2M+', label: 'Tons Cargo Transported', icon: Globe, color: 'from-blue-500 to-cyan-400' },
    { value: '25,000+', label: 'Staff Mobilized', icon: Users2, color: 'from-emerald-500 to-teal-400' },
    { value: '99.8%', label: 'Delivery Accuracy Rate', icon: ThumbsUp, color: 'from-purple-500 to-pink-400' },
    { value: '24/7', label: 'Safety Support Desk', icon: Clock, color: 'from-orange-500 to-red-400' },
  ];

  const timelineSteps = [
    { num: '01', title: 'Consultation', desc: 'Analyzing your supply chain lanes and temporary staffing requisitions.', icon: Headphones },
    { num: '02', title: 'Operational Audit', desc: 'Establishing safety metrics, routing optimization maps, and skill requisitions.', icon: Shield },
    { num: '03', title: 'Crew & Fleet Dispatch', desc: 'Deploying heavy freight trucks or compliance-vetted workforce crews directly to site.', icon: Truck },
    { num: '04', title: 'Coordinated Oversight', desc: 'Continuous route logs reporting and safety coordinators supervising warehouse staff.', icon: Activity },
  ];

  const faqs = [
    { q: 'What is your standard mobilization timeline for manpower?', a: 'Depending on the headcount and skill requirements, we can deploy temporary manpower teams within 48 to 72 hours.' },
    { q: 'Do you offer international freight logistics and customs clearance?', a: 'Yes, we provide international multi-modal shipping services. Our logistics teams handle full export/import custom clearance audits.' },
    { q: 'Are all your supplied workforce insured and compliance-vetted?', a: 'Absolutely. Every worker supplied under our contract staffing service is fully compliance-verified, background-checked, and covered by comprehensive employer liability insurance policies.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // 3D tilt effect for cards
  const getTiltStyle = (index, intensity = 10) => {
    const rotateX = mousePosition.y * intensity * (index % 2 === 0 ? 1 : -1);
    const rotateY = mousePosition.x * intensity * (index % 2 === 0 ? -1 : 1);
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Phone validation regex (10 digits)
  const phoneRegex = /^[0-9]{10}$/;

  return (
    <div className="space-y-24 pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION - Enhanced with 3D parallax */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center bg-brand-navy text-white overflow-hidden">
        <motion.video
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src={Video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </motion.video>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"
          style={{ opacity: heroOpacity }}
        />

        {/* Animated floating particles - enhanced */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-brand-red/40 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                y: [null, -200, -400],
                x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0, 3, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>


        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-3xl">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-red text-white mb-6 shadow-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.4)" }}
            >
              Enterprise Logistics & Manpower Partner
            </motion.span>
            <motion.h1
              className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Streamlining Freight. <br />
              <span className="text-brand-red relative">
                Mobilizing Vetted Staff.
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-brand-red"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A professional logistics operator and contract manpower supply agency delivering corporate excellence, absolute safety, and absolute compliance.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/get-quote">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(220, 38, 38, 0.4)",
                      "0 0 0 15px rgba(220, 38, 38, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Button variant="red" size="lg" className="shadow-lg hover:shadow-2xl transition-all duration-300">
                    Request a Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/careers">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline-white" size="lg" className="hover:bg-white/10 transition-all duration-300">
                    Explore Careers
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED CLIENTS - INFINITY LOOP DESIGN */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
        <motion.p
          className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by Industry Leaders Globally
        </motion.p>

        {/* Infinity Loop Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex items-center gap-8 md:gap-16 py-4"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {infiniteClients.map((client, index) => (
              <motion.div
                key={`${client}-${index}`}
                className="flex-shrink-0 text-sm font-black text-brand-navy tracking-wider px-6 py-3 border-2 border-slate-200 rounded-lg cursor-pointer transition-all duration-300 hover:border-brand-red hover:bg-red-50 hover:scale-105 hover:shadow-lg"
                whileHover={{
                  y: -5,
                  rotate: [-1, 0, 1, 0],
                  scale: 1.05,
                }}
                initial={{ opacity: 0.6 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                {client}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES SECTION - Enhanced with 3D tilt */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Engineered Services to Power Your Operation"
          subtitle="Our Services"
          centered={true}
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((srv, index) => {
            const LucideIcon = iconMap[srv.icon] || Truck;
            const isHovered = hoveredService === index;
            return (
              <motion.div
                key={srv._id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                style={getTiltStyle(index, 5)}
              >
                <Card hoverEffect={true} className="flex flex-col justify-between relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
                      whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LucideIcon className="h-6 w-6" />
                    </motion.div>
                    <h4 className="font-extrabold text-brand-navy text-lg mb-2 group-hover:text-brand-red transition-colors duration-300">{srv.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{srv.description}</p>
                  </div>

                  <Link to="/services" className="relative z-10 mt-6 inline-flex items-center text-xs font-bold text-brand-navy group-hover:text-brand-red transition-all duration-300">
                    <span className="group-hover:mr-2 transition-all duration-300">Learn More</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-2 transition-all duration-300" />
                  </Link>

                  <motion.div
                    className="absolute -right-12 -top-12 w-24 h-24 bg-brand-red/5 rounded-full"
                    animate={{
                      scale: isHovered ? 2 : 0.5,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 4. WHY CHOOSE US - Enhanced with scroll parallax */}
      <motion.section
        className="bg-brand-navy py-20 text-white border-t-4 border-b-4 border-brand-red relative overflow-hidden"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_transparent_0%,_transparent_2px,_rgba(255,255,255,0.1)_2px,_rgba(255,255,255,0.1)_4px)] bg-[length:20px_20px]" />
        </div>

        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(220,38,38,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(220,38,38,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(220,38,38,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Operational Advantage</span>
              <h3 className="text-3xl font-extrabold text-white sm:text-4xl mt-2 leading-snug">Why Cooperate With Our Agency?</h3>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                Logistics managers and HR executives face massive hurdles coordinating multiple service contracts. We combine fleet hauling logistics and worker staffing under one cohesive service level agreement (SLA).
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: '100% Insured Compliance', desc: 'Every worker holds active certifications, background verifications, and medical clearance logs.', icon: Shield },
                  { title: 'Rapid Mobilization Desks', desc: 'Our dedicated operations desks coordinate shipping routes and staff schedules 24/7/365.', icon: Zap },
                  { title: 'Tailored SLA Pricing', desc: 'Save up to 15% on logistics coordination fees by bundling staffing and shipping needs.', icon: TrendingUp },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start space-x-3 group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex-shrink-0 mt-0.5"
                      whileHover={{ rotate: 360, scale: 1.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle className="h-6 w-6 text-brand-red" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-brand-red transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-premium h-80"
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600"
                alt="Truck driver loading cargo"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. COMPANY STATISTICS - Enhanced with animated counters */}
      <section ref={statsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card hoverEffect={true} className="text-center p-6 bg-slate-50 border border-slate-200 relative overflow-hidden group">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <motion.p
                    className="text-3xl font-extrabold text-brand-navy"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-wider">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 6. INDUSTRIES WE SERVE - Enhanced with hover effects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Industries We Keep In Motion"
          subtitle="Industries Served"
          centered={true}
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { title: 'Manufacturing & Plants', icon: Building2, bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
            { title: 'Warehouse Logistics', icon: Package, bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300' },
            { title: 'Retail & FMCG Networks', icon: ShoppingBag, bg: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=300' },
            { title: 'Civil Infrastructure', icon: Building2, bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=300' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden h-60 shadow group cursor-pointer"
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredIndustry(idx)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              <motion.img
                src={item.bg}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{ scale: hoveredIndustry === idx ? 1.15 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-brand-navy/70 flex flex-col justify-end p-6"
                animate={{
                  backgroundColor: hoveredIndustry === idx ? 'rgba(10, 20, 40, 0.85)' : 'rgba(10, 20, 40, 0.7)',
                  backdropFilter: hoveredIndustry === idx ? 'blur(4px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center space-x-2"
                  animate={{ x: hoveredIndustry === idx ? 8 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="h-5 w-5 text-brand-red" />
                  <h4 className="text-lg font-bold text-white leading-snug">{item.title}</h4>
                </motion.div>
                <Link to="/industries" className="text-brand-red text-xs font-bold mt-2 flex items-center group-hover:translate-x-2 transition-all duration-300">
                  Learn Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. WORKING PROCESS TIMELINE - Enhanced with icons and animations */}
      <section className="bg-slate-50 py-20 border-t border-b border-slate-200/60 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_transparent_0%,_rgba(220,38,38,0.03)_100%)]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Coordinated Onboarding Timeline"
            subtitle="Working Process"
            centered={true}
          />
          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-brand-red/20 via-brand-red/40 to-brand-red/20 hidden lg:block -translate-y-1/2" />

            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative group"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={getTiltStyle(idx, 3)}
                >
                  <div className="relative bg-white p-8 rounded-2xl shadow-soft-lg border border-slate-100 text-left hover:shadow-xl transition-all duration-300 hover:border-brand-red/30">
                    <motion.div
                      className="absolute -top-6 left-6 text-5xl font-black text-brand-red opacity-15 group-hover:opacity-30 transition-opacity duration-300"
                      whileHover={{ scale: 1.3, rotate: -10 }}
                    >
                      {step.num}
                    </motion.div>

                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300"
                      whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <h4 className="text-xl font-bold text-brand-navy mb-3 mt-2 group-hover:text-brand-red transition-colors duration-300">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>

                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-brand-red rounded-b-2xl"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. GALLERY HIGHLIGHT - Enhanced with overlay animations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="On-site Operations in Action"
          subtitle="Portfolio Highlight"
          centered={true}
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {gallery.map((item, index) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden h-64 group shadow shadow-soft-lg"
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              style={getTiltStyle(index, 4)}
            >
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.span
                  className="text-xs font-semibold text-brand-red uppercase tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.category}
                </motion.span>
                <motion.h4
                  className="text-white font-bold mt-1 text-base"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {item.title}
                </motion.h4>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/gallery">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="hover:shadow-lg transition-all duration-300">
                View Full Operations Gallery
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* 9. TESTIMONIALS - INFINITE LOOP DESIGN */}
      <section ref={testimonialsRef} className="bg-brand-navy py-20 border-t-4 border-b-4 border-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_transparent_0%,_transparent_2px,_rgba(255,255,255,0.1)_2px,_rgba(255,255,255,0.1)_4px)] bg-[length:20px_20px]" />
        </div>

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.05) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 50%, rgba(220,38,38,0.05) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.05) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Our Corporate Partners Say"
            subtitle="Testimonials"
            centered={true}
            white={true}
          />

          {/* Infinite Testimonials Marquee */}
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <style>{`
              @keyframes infinite-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-infinite-scroll {
                animation: infinite-scroll 40s linear infinite;
              }
            `}</style>

            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-brand-navy to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-brand-navy to-transparent z-10 pointer-events-none"></div>

            <div
              ref={marqueeRef}
              className="flex gap-8 py-8 animate-infinite-scroll"
              style={{
                width: 'max-content',
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {[...infiniteTestimonials, ...infiniteTestimonials].map((test, index) => (
                <motion.div
                  key={`${test._id}-${index}`}
                  className="flex-shrink-0 w-[350px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card hoverEffect={false} className="bg-white p-6 border border-slate-200 flex flex-col justify-between relative group hover:border-brand-red/50 transition-all duration-300 shadow-lg h-full">
                    <motion.div
                      className="absolute -right-4 -top-4 w-20 h-20 bg-brand-red/5 rounded-full"
                      whileHover={{ scale: 2.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div>
                      <motion.div
                        className="flex space-x-1 text-brand-red mb-3"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.4, rotate: [0, -15, 15, -15, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="relative">
                        <Quote className="h-6 w-6 text-brand-red/30 absolute -top-1 -left-1" />
                        <p className="text-sm leading-relaxed font-medium text-black pl-6 line-clamp-4">
                          {test.feedback}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-100">
                      {test.avatar && (
                        <motion.img
                          src={test.avatar}
                          alt={test.clientName}
                          className="h-12 w-12 rounded-full object-cover shadow border-2 border-slate-200"
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      <div>
                        <h5 className="font-bold text-black text-sm group-hover:text-brand-red transition-colors duration-300">
                          {test.clientName}
                        </h5>
                        <p className="text-xs text-brand-red font-semibold">{test.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ & CONTACT FORM - Enhanced with validations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* FAQ panel */}
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Help Center</span>
            <h3 className="text-3xl font-extrabold text-brand-navy mt-2 mb-8 leading-snug">Answers to Common Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-brand-navy hover:text-brand-red transition-all duration-300 group"
                    >
                      <span className="text-sm flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-brand-red opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={`h-4 w-4 transform transition-colors duration-300 ${isOpen ? 'text-brand-red' : 'text-slate-400 group-hover:text-brand-red'}`} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-slate-500 text-xs leading-relaxed border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Inline Contact form - Enhanced with validations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card hoverEffect={false} className="p-8 shadow-2xl relative overflow-hidden group bg-white border border-slate-200">
              <motion.div
                className="absolute -right-20 -top-20 w-40 h-40 bg-brand-red/5 rounded-full"
                whileHover={{ scale: 2.5 }}
                transition={{ duration: 0.5 }}
              />

              <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-brand-red mr-2" />
                Quick Contact Form
              </h3>

              {contactSubmitted ? (
                <motion.div
                  className="text-center py-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3"
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-6 w-6" />
                  </motion.div>
                  <h4 className="text-base font-bold text-brand-navy">Lead Saved Successfully!</h4>
                  <p className="text-slate-600 text-xs mt-1">We will respond within 24 hours.</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="navy" className="mt-4" onClick={() => setContactSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-4">
                  {contactError && (
                    <motion.div
                      className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700 text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{contactError}</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <motion.input
                        type="text"
                        placeholder="Your Name *"
                        {...register('name', {
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
                        whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                        transition={{ duration: 0.2 }}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] mt-0.5 animate-pulse flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <motion.input
                        type="email"
                        placeholder="Corporate Email *"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: emailRegex,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
                        whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                        transition={{ duration: 0.2 }}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] mt-0.5 animate-pulse flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <motion.input
                        type="tel"
                        placeholder="Phone Number (10 digits) *"
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: phoneRegex,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
                        whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                        transition={{ duration: 0.2 }}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] mt-0.5 animate-pulse flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <motion.input
                        type="text"
                        placeholder="Subject *"
                        {...register('subject', {
                          required: 'Subject is required',
                          minLength: { value: 3, message: 'Subject must be at least 3 characters' }
                        })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50"
                        whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                        transition={{ duration: 0.2 }}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-[10px] mt-0.5 animate-pulse flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <motion.textarea
                      rows="3"
                      placeholder="Your Message *"
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white transition-all duration-300 hover:border-brand-red/50 resize-none"
                      whileFocus={{ scale: 1.02, borderColor: '#dc2626' }}
                      transition={{ duration: 0.2 }}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[10px] mt-0.5 animate-pulse flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" variant="red" className="w-full group" disabled={contactSubmitting} icon={Send}>
                      {contactSubmitting ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⟳</span>
                          Sending Request...
                        </span>
                      ) : (
                        'Send Inquiry'
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* 11. GOOGLE MAP SECTION - Enhanced with hover effect */}
      <motion.section
        className="rounded-3xl overflow-hidden shadow-soft-lg border border-slate-200 h-96 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <iframe
          title="Logistics Company Map HQ Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.941871288073!2d76.99756187928271!3d28.631504221403038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0f2a693dd09b%3A0x573bbb9cc75b3f9d!2sKala%20butter%20momos!5e0!3m2!1sen!2sin!4v1784970822379!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-3xl"
        ></iframe>
      </motion.section>
    </div>
  );
};

export default Home;

// remove the bacground orange circle