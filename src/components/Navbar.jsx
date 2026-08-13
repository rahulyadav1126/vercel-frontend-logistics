// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ArrowRight, Truck } from 'lucide-react';
// import Button from './ui/Button';
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location]);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Services', path: '/services' },
//     { name: 'Gallery', path: '/gallery' },
//     { name: 'Industries', path: '/industries' },
//     { name: 'Careers', path: '/careers' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <nav
//       className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
//           ? 'glassmorphism shadow-md py-3'
//           : 'bg-transparent py-5'
//         }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo Placeholder */}
//           {/* <Link to="/" className="flex items-center space-x-2 group">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy group-hover:bg-brand-red transition duration-300 shadow-md">
//               <Truck className="h-5 w-5 text-white" />
//             </div>
//             <span className={`text-xl font-black tracking-wider transition-colors duration-300 ${isScrolled ? 'text-brand-navy' : 'text-brand-navy sm:text-brand-navy'
//               }`}>
//               YOUR LOGO
//             </span>
//           </Link> */}
//           <Link to="/" className="flex items-center gap-3">
//   <img
//     src={logo}
//     alt="Logo"
//     className="h-12 w-auto"
//   />

//   <span className="text-xl font-bold text-brand-navy">
//     Manas Madhav
//   </span>
// </Link>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-brand-red ${isActive(link.path)
//                     ? 'text-brand-red border-b-2 border-brand-red pb-1'
//                     : 'text-brand-navy'
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Get Quote Action */}
//           <div className="hidden md:block">
//             <Link to="/get-quote">
//               <Button variant="red" size="sm" className="shadow-md">
//                 Get Quote <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center rounded-md p-2 text-brand-navy hover:text-brand-red focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden glassmorphism shadow-lg border-t border-slate-100 py-4 px-6 absolute top-full left-0 right-0 animate-fadeIn">
//           <div className="flex flex-col space-y-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-base font-bold transition-colors duration-200 ${isActive(link.path) ? 'text-brand-red' : 'text-brand-navy'
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Link to="/get-quote" className="w-full">
//               <Button variant="red" size="md" className="w-full shadow-md">
//                 Get Quote <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// // the nav bacground color is  light grey (211,211,211)

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ArrowRight, Truck } from 'lucide-react';
// import Button from './ui/Button';
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location]);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Services', path: '/services' },
//     { name: 'Gallery', path: '/gallery' },
//     { name: 'Industries', path: '/industries' },
//     { name: 'Careers', path: '/careers' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <nav
//       className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' // White smoke with blur when scrolled
//           : 'bg-white/90 backdrop-blur-sm py-5' // White smoke always
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo - Circular with white smoke */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-brand-navy shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-red">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <span className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors duration-300">
//               Manas Madhav
//             </span>
//           </Link>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-brand-red ${
//                   isActive(link.path)
//                     ? 'text-brand-red border-b-2 border-brand-red pb-1'
//                     : 'text-brand-navy'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Get Quote Action */}
//           <div className="hidden md:block">
//             <Link to="/get-quote">
//               <Button variant="red" size="sm" className="shadow-md">
//                 Get Quote <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center rounded-md p-2 text-brand-navy hover:text-brand-red focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-slate-200 py-4 px-6 absolute top-full left-0 right-0 animate-fadeIn">
//           <div className="flex flex-col space-y-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-base font-bold transition-colors duration-200 ${
//                   isActive(link.path) ? 'text-brand-red' : 'text-brand-navy'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Link to="/get-quote" className="w-full">
//               <Button variant="red" size="md" className="w-full shadow-md">
//                 Get Quote <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// // enhace and attractive 



// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ArrowRight, Truck, ChevronDown, Globe, Users, Briefcase, Image, Building2, UserCircle, Mail } from 'lucide-react';
// import Button from './ui/Button';
// import logo from "../assets/logo.png";
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false);
//     setActiveDropdown(null);
//   }, [location]);

//   const navLinks = [
//     { name: 'Home', path: '/', icon: Globe },
//     { name: 'About', path: '/about', icon: Users },
//     { name: 'Services', path: '/services', icon: Briefcase },
//     { name: 'Gallery', path: '/gallery', icon: Image },
//     { name: 'Industries', path: '/industries', icon: Building2 },
//     { name: 'Careers', path: '/careers', icon: UserCircle },
//     { name: 'Contact', path: '/contact', icon: Mail },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <nav
//       className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? 'bg-white/95 backdrop-blur-lg shadow-2xl py-3 border-b border-slate-100/50'
//           : 'bg-white/80 backdrop-blur-md py-5 border-b border-transparent'
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo - Enhanced Circular */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="relative">
//               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-red to-brand-red/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-brand-navy shadow-lg flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-red group-hover:shadow-xl relative">
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-xl font-extrabold text-brand-navy group-hover:text-brand-red transition-colors duration-300 tracking-tight">
//                 Manas Madhav
//               </span>
//               <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase group-hover:text-brand-red/70 transition-colors duration-300">
//                 Logistics & Manpower
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Nav Links - Enhanced */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {navLinks.map((link) => {
//               const Icon = link.icon;
//               const isActiveLink = isActive(link.path);
//               return (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 group flex items-center gap-2 ${
//                     isActiveLink
//                       ? 'text-brand-red bg-brand-red/10 shadow-inner'
//                       : 'text-brand-navy hover:text-brand-red hover:bg-slate-50'
//                   }`}
//                 >
//                   <Icon className={`h-4 w-4 transition-transform duration-300 ${
//                     isActiveLink ? 'text-brand-red' : 'group-hover:scale-110 group-hover:text-brand-red'
//                   }`} />
//                   <span>{link.name}</span>
//                   {isActiveLink && (
//                     <motion.span
//                       layoutId="activeNav"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-red/50 rounded-full"
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Right Section - Enhanced */}
//           <div className="hidden lg:flex items-center gap-4">
//             <Link to="/get-quote">
//               <Button 
//                 variant="red" 
//                 size="sm" 
//                 className="shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center">
//                   Get Quote 
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                 </span>
//                 <span className="absolute inset-0 bg-gradient-to-r from-brand-red to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button - Enhanced */}
//           <div className="flex lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="relative inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy hover:text-brand-red hover:bg-brand-red/10 transition-all duration-300 focus:outline-none group"
//             >
//               <span className="absolute inset-0 rounded-xl bg-brand-red/0 group-hover:bg-brand-red/5 transition-colors duration-300"></span>
//               {isOpen ? (
//                 <X className="h-6 w-6 relative z-10 rotate-90 transition-transform duration-300" />
//               ) : (
//                 <Menu className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu - Enhanced */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="lg:hidden bg-white/98 backdrop-blur-xl shadow-2xl border-t border-slate-100 py-6 px-6 absolute top-full left-0 right-0"
//           >
//             <div className="flex flex-col space-y-2">
//               {navLinks.map((link, index) => {
//                 const Icon = link.icon;
//                 const isActiveLink = isActive(link.path);
//                 return (
//                   <motion.div
//                     key={link.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <Link
//                       to={link.path}
//                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-300 ${
//                         isActiveLink
//                           ? 'text-brand-red bg-brand-red/10 shadow-inner'
//                           : 'text-brand-navy hover:text-brand-red hover:bg-slate-50'
//                       }`}
//                     >
//                       <Icon className={`h-5 w-5 transition-transform duration-300 ${
//                         isActiveLink ? 'text-brand-red' : 'group-hover:scale-110'
//                       }`} />
//                       <span>{link.name}</span>
//                       {isActiveLink && (
//                         <motion.div
//                           layoutId="activeMobileNav"
//                           className="ml-auto h-2 w-2 rounded-full bg-brand-red"
//                         />
//                       )}
//                     </Link>
//                   </motion.div>
//                 );
//               })}

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="pt-4 border-t border-slate-200"
//               >
//                 <Link to="/get-quote" className="w-full">
//                   <Button 
//                     variant="red" 
//                     size="md" 
//                     className="w-full shadow-lg hover:shadow-xl transition-all duration-300 group"
//                   >
//                     <span className="flex items-center justify-center">
//                       Get Quote 
//                       <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                     </span>
//                   </Button>
//                 </Link>
//               </motion.div>

//               {/* Quick Contact in Mobile */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.35 }}
//                 className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2"
//               >
//                 <a 
//                   href="tel:+18005550199" 
//                   className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-brand-navy hover:bg-brand-red/10 hover:text-brand-red transition-all duration-300"
//                 >
//                   <Phone className="h-4 w-4" />
//                   Call Now
//                 </a>
//                 <a 
//                   href="mailto:info@logisticsco.com" 
//                   className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-semibold text-brand-navy hover:bg-brand-red/10 hover:text-brand-red transition-all duration-300"
//                 >
//                   <Mail className="h-4 w-4" />
//                   Email Us
//                 </a>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    { name: 'Careers&Job', path: '/careers' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Industries', path: '/industries' },
    { name: 'About', path: '/about' },
    // { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/95 backdrop-blur-xl shadow-xl py-3"
        : "bg-white/80 backdrop-blur-md py-5"
        }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">


          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-14 w-14 rounded-full overflow-hidden border-2 border-brand-red shadow-lg"
            >
              <img
                src={logo}
                alt="Manas Madhav"
                className="h-full w-full object-cover"
              />
            </motion.div>


            <span className="text-xl font-extrabold text-brand-navy">
              Manas Madhav
            </span>
          </Link>



          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group"
              >

                <span
                  className={`text-sm font-bold transition-colors duration-300 ${isActive(link.path)
                    ? "text-brand-red"
                    : "text-brand-navy hover:text-brand-red"
                    }`}
                >
                  {link.name}
                </span>


                <span
                  className={`absolute left-0 -bottom-2 h-0.5 bg-brand-red transition-all duration-300 ${isActive(link.path)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                    }`}
                />

              </Link>
            ))}

          </div>



          {/* Quote Button */}
          <div className="hidden md:block">

            <Link to="/get-quote">

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >

                <Button
                  variant="red"
                  size="sm"
                  className="shadow-lg"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              </motion.div>

            </Link>

          </div>



          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-navy"
          >
            {isOpen
              ? <X size={28} />
              : <Menu size={28} />
            }
          </button>


        </div>

      </div>



      {/* Mobile Menu */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl border-t"
          >

            <div className="flex flex-col px-6 py-6 gap-5">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-bold ${isActive(link.path)
                    ? "text-brand-red"
                    : "text-brand-navy"
                    }`}
                >
                  {link.name}
                </Link>

              ))}


              <Link to="/get-quote">

                <Button
                  variant="red"
                  size="md"
                  className="w-full"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              </Link>


            </div>

          </motion.div>

        )}

      </AnimatePresence>


    </nav>
  );
};

export default Navbar;