import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Target, Landmark, HeartHandshake, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const About = () => {
  const coreValues = [
    { title: 'Absolute Compliance', desc: 'We maintain rigorous standards of insurance, legal auditing, and labor safety audits.', icon: ShieldCheck },
    { title: 'Operational Speed', desc: 'Mobilizing fleet routing or manpower recruitment rapidly within hours to meet client demands.', icon: Target },
    { title: 'Corporate Quality', desc: 'Providing only vetted professionals and highly maintained transportation assets.', icon: Award },
    { title: 'Trusted Partnership', desc: 'Honest communication, transparent pricing sheets, and reliability in every transaction.', icon: HeartHandshake },
  ];

  const executiveTeam = [
    { name: 'Marcus Sterling', role: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250' },
    { name: 'Elena Rostova', role: 'Head of Logistics Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' },
    { name: 'Sarah Jenkins', role: 'Director of HR & Staffing Recruitment', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250' },
    { name: 'Devon Carter', role: 'Safety Compliance Officer (OSHA)', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Pioneering Corporate Logistics & Staffing Solutions"
        subtitle="About Us"
        centered={true}
      />

      {/* History and corporate summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h3 className="text-2xl font-extrabold text-brand-navy mb-4">Our Corporate History</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Founded with the vision to bridge the operational gap between logistics fleet networks and industrial manpower supply, we have grown to service over 120 Fortune 500 enterprises.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            By coordinating CDL freight logistics, state-of-the-art climate-controlled warehousing facilities, and vetted staffing solutions under a unified corporate team, we help partners streamline operations and focus on core growth.
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-soft-lg h-72">
          <img
            src="https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&q=80&w=600"
            alt="Corporate office meeting"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Vision & Mission grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Card hoverEffect={false} className="p-8 bg-brand-navy text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white mb-6">
            <Eye className="h-6 w-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-4">Our Vision</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            To build the world’s most reliable, compliance-first, and technologically integrated logistics and manpower supply network. We strive to set new benchmarks for workforce compliance and freight reliability.
          </p>
        </Card>
        <Card hoverEffect={false} className="p-8 bg-slate-100 border border-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white mb-6">
            <Landmark className="h-6 w-6" />
          </div>
          <h4 className="text-xl font-bold text-brand-navy mb-4">Our Mission</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            To empower enterprise operations through rapid mobilization of vetted industrial talent and highly optimized transport solutions. We prioritize safety, legal compliance, and operational transparency above all else.
          </p>
        </Card>
      </div>

      {/* Core values */}
      <div className="mb-20">
        <h3 className="text-2xl font-extrabold text-brand-navy text-center mb-12">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <Card key={val.title} hoverEffect={true} className="text-center p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4">
                  <IconComp className="h-6 w-6" />
                </div>
                <h5 className="font-bold text-brand-navy mb-2">{val.title}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team profiles */}
      <div>
        <h3 className="text-2xl font-extrabold text-brand-navy text-center mb-12">Executive Leadership</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveTeam.map((team, idx) => (
            <motion.div
              key={team.name}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft-lg h-64 mb-4">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h5 className="font-bold text-brand-navy text-lg">{team.name}</h5>
              <p className="text-slate-500 text-sm">{team.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
