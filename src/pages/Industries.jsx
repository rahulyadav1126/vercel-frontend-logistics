import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Warehouse, ShoppingCart, Truck, Construction, Building2 } from 'lucide-react';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Industries = () => {
  const industries = [
    {
      title: 'Manufacturing & Heavy Assembly',
      description: 'We provide specialized assembly line manpower, quality control inspectors, safety compliance leads, and production shift managers.',
      details: [
        'Rapid mobilization of certified operators',
        'Strict OSHA safety compliance tracking',
        'Continuous performance auditing',
      ],
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Warehousing & Distribution Center Operations',
      description: 'Supplying logistics warehouse operators, certified forklift operators, loaders, inventory supervisors, and packing teams.',
      details: [
        'Forklift operator safety certifications',
        'WMS barcode auditing experience',
        'Flexible temporary headcount sizing',
      ],
      icon: Warehouse,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'E-commerce & Fast-Moving Consumer Goods',
      description: 'Logistics fulfillment networks specialized in last-mile dispatch, parcel sorting, order pick/pack systems, and seasonal scaling support.',
      details: [
        'Fulfillment center order dispatch teams',
        'Seasonal scaling for holiday shopping spikes',
        'High accuracy picking rate metrics',
      ],
      icon: ShoppingCart,
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Transportation & Commercial Fleet Logistics',
      description: 'Supply of vetted commercial drivers (CDL holders), fleet routing analysts, customs coordinators, and heavy hauling leads.',
      details: [
        'Vetted CDL class drivers and freight supervisors',
        'Commercial routing optimization leads',
        'Cold-chain transport supervisors',
      ],
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Construction & Civil Engineering',
      description: 'Providing heavy machinery operators, site safety inspectors, compliance auditors, and skilled civil builders for massive projects.',
      details: [
        'Certified riggers and heavy machine operators',
        'Accredited site safety compliance officers',
        'Short-term project-based crew scaling',
      ],
      icon: Construction,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Corporate Offices & IT Support Facilities',
      description: 'Providing clerical administration support, corporate helpdesk coordinators, facility supervisors, and safety management leads.',
      details: [
        'Vetted office administration professionals',
        'Facilities security and operation technicians',
        'Bilingual corporate reception teams',
      ],
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Key Industries We Support"
        subtitle="Industries Served"
        centered={true}
      />

      <div className="space-y-16">
        {industries.map((ind, index) => {
          const IconComponent = ind.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={ind.title}
              className={`flex flex-col lg:flex-row items-center gap-12 border-b border-slate-100 pb-12 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-soft-lg group">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition duration-300"></div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-brand-red">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-navy">{ind.title}</h3>
                </div>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {ind.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ind.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Industries;
