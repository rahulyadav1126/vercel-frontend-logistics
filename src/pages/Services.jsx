import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Warehouse, Users, GraduationCap, Activity, HelpCircle, X, ChevronRight, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

// Helper map to convert icon strings to Lucide components dynamically
const iconMap = {
  Truck: Truck,
  Warehouse: Warehouse,
  Users: Users,
  GraduationCap: GraduationCap,
  Activity: Activity,
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeServiceDetails, setActiveServiceDetails] = useState(null);

  const { data: services, loading, error } = useFetch('/api/services');

  const filteredServices = services
    ? services.filter((srv) => {
        if (selectedCategory === 'All') return true;
        return srv.category === selectedCategory || srv.category === 'Both';
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Professional Logistics & Manpower Supply Services"
        subtitle="Our Services"
        centered={true}
      />

      {/* Category selector */}
      <div className="flex justify-center space-x-4 mb-12">
        {['All', 'Logistics', 'Manpower'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow ${
              selectedCategory === cat
                ? 'bg-brand-navy text-white shadow-soft-lg'
                : 'bg-white text-brand-navy hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load services</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <Card hoverEffect={false} className="text-center py-16 p-8 text-slate-500">
          <HelpCircle className="mx-auto h-14 w-14 mb-4 text-slate-300" />
          <p className="text-lg font-bold">No services found in this category</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => {
            const LucideIcon = iconMap[srv.icon] || HelpCircle;

            return (
              <Card
                key={srv._id}
                hoverEffect={true}
                onClick={() => setActiveServiceDetails(srv)}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-brand-red mb-6 border border-red-100">
                    <LucideIcon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">{srv.category}</span>
                  <h4 className="text-xl font-bold text-brand-navy mt-1 mb-3 leading-snug">{srv.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center text-brand-navy text-sm font-bold mt-auto group cursor-pointer">
                  <span>View Details</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-200 text-brand-red" />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Interactive Detail Modal dialog */}
      <AnimatePresence>
        {activeServiceDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-premium p-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveServiceDetails(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red rounded-lg transition duration-200"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-brand-red border border-red-100">
                  {React.createElement(iconMap[activeServiceDetails.icon] || HelpCircle, { className: 'h-7 w-7' })}
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">{activeServiceDetails.category}</span>
                  <h4 className="text-2xl font-bold text-brand-navy leading-snug">{activeServiceDetails.title}</h4>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-600 leading-relaxed text-sm">
                  {activeServiceDetails.description}
                </p>
              </div>

              {activeServiceDetails.details && activeServiceDetails.details.length > 0 && (
                <div className="mb-8">
                  <h5 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    Scope of Operations & Capabilities
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeServiceDetails.details.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-slate-600">
                        <ChevronRight className="h-5 w-5 text-brand-red flex-shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button variant="navy" className="flex-1" onClick={() => setActiveServiceDetails(null)}>
                  Close
                </Button>
                <Link to="/get-quote" className="flex-1">
                  <Button variant="red" className="w-full">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
