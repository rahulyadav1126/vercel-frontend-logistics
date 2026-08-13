// import React, { useState, useEffect } from 'react';
// import { ArrowUp } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           onClick={scrollToTop}
//           className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg border border-slate-700 hover:bg-brand-red transition duration-300 focus:outline-none"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <ArrowUp className="h-5 w-5" />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ScrollToTop;





// import React, { useState, useEffect } from "react";
// import { ArrowUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const { pathname } = useLocation();

//   // Route change hone par page top par le jao
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "auto", // "smooth" bhi use kar sakte ho
//     });
//   }, [pathname]);

//   // Scroll button show/hide
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);

//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   // Button click par top par scroll
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           onClick={scrollToTop}
//           className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg border border-slate-700 hover:bg-brand-red transition duration-300 focus:outline-none"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <ArrowUp className="h-5 w-5" />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ScrollToTop;

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Scroll to top on route change (instant)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // or 'auto' for instant scroll
    });
  }, [location.pathname]);

  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top on button click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg border border-slate-700 hover:bg-brand-red transition duration-300 focus:outline-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;