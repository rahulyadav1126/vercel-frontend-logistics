import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import Button from './ui/Button';
import SuccessModal from './ui/SuccessModal';
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
    e.target.reset();
  };

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t-4 border-brand-red">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Profile */}
          <div>
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-brand-red shadow-md flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:shadow-xl">
                <img
                  src={logo}
                  alt="Manas Madhav Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-black text-white tracking-wider transition-colors duration-300 group-hover:text-brand-red">
                Manas Madhav
              </span>
            </Link>

            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              An enterprise leader in logistics, heavy hauling, global freight management, and professional manpower staffing. Delivering reliability and corporate excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-brand-red">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Work Gallery', path: '/gallery' },
                { name: 'Active Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center hover:text-white hover:translate-x-1 transition duration-200 text-sm group"
                  >
                    <ChevronRight className="h-4 w-4 text-brand-red mr-1 transition-transform duration-200 group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-brand-red">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                'Freight & Heavy Logistics',
                'Secure Warehousing',
                'Contract Staffing Supply',
                'Industrial Skill Certification',
                'E-commerce Fulfillment',
                'Corporate Transport Auditing',
              ].map((service) => (
                <li key={service} className="flex items-center text-sm group">
                  <ChevronRight className="h-4 w-4 text-brand-red mr-1 transition-transform duration-200 group-hover:translate-x-1" />
                  <span className="group-hover:text-white transition-colors duration-200">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-brand-red">
              Newsletter
            </h3>
            <p className="text-slate-400 mb-4 text-sm">
              Subscribe to stay updated on supply chain news and hiring updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your corporate email"
                className="px-4 py-2.5 rounded-lg bg-brand-navy-light border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all duration-300 text-sm"
              />
              <Button type="submit" variant="red" size="sm" className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Mid bar: Direct Contacts info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-slate-700/60 text-sm">
          <div className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-brand-navy-light rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Phone</p>
              <a href="tel:+919956426456" className="text-white hover:text-brand-red font-semibold transition-colors duration-300">+91 99564 26456</a>
            </div>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-brand-navy-light rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Email Enquiries</p>
              <a href="mailto:manasmadhavlogistics@gmail.com" className="text-white hover:text-brand-red font-semibold transition-colors duration-300">manasmadhavlogistics@gmail.com</a>
            </div>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-brand-navy-light rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Registered Office</p>
              <span className="text-white font-semibold block mt-1 leading-snug" title="Plot No. 46, Veer Bazar Road, Beside Butter Momos, Jai Vihar Phase-1, Najafgarh, New Delhi, Delhi - 110043">
                Plot No. 46, Veer Bazar Road, Beside Butter Momos, Jai Vihar Phase-1, Najafgarh, New Delhi, Delhi - 110043
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-xs text-slate-500">
          <p>© {currentYear} Manas Madhav Logistics & Manpower Services. All rights reserved. | Designed & Developed by Rahul Yadav</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors duration-300 hover:translate-x-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-white transition-colors duration-300 hover:translate-x-0.5"
            >
              Terms of Service
            </Link>
            <Link
              to="/admin/login"
              className="hover:text-white font-semibold text-brand-red transition-all duration-300 hover:scale-105"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
        title="Subscription Successful!"
        message="Thank you for subscribing to our corporate newsletter!"
      />
    </footer>
  );
};

export default Footer;