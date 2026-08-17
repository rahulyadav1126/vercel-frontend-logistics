import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, AlertCircle, X, Image as ImageIcon } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const { data: items, loading, error } = useFetch(`/api/gallery?category=${selectedCategory}`);

  const categories = ['All', 'Logistics', 'Manpower', 'Warehouse', 'Others'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Our Operations & Staff Worksite Gallery"
        subtitle="Work Gallery"
        centered={true}
      />

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow ${selectedCategory === cat
                ? 'bg-brand-red text-white'
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
          <p className="font-bold">Failed to load gallery items</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : items && items.length === 0 ? (
        <Card hoverEffect={false} className="text-center py-16 p-8 text-slate-500">
          <ImageIcon className="mx-auto h-14 w-14 mb-4 text-slate-300" />
          <p className="text-lg font-bold">No images found in this category</p>
          <p className="text-sm mt-1">Please explore another tab filter.</p>
        </Card>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  onClick={() => setLightboxImage(item)}
                  className="relative group overflow-hidden rounded-2xl shadow-soft-lg cursor-pointer bg-white border border-slate-100"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Eye className="h-8 w-8 text-white mb-2" />
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">{item.category}</span>
                    <h4 className="text-lg font-bold text-white mt-1 leading-snug">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox / Image Preview Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/95 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close icon */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-brand-navy/80 hover:bg-brand-red rounded-lg text-white transition duration-200 z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="rounded-2xl max-w-full max-h-[75vh] object-contain shadow-2xl mx-auto"
              />
              <div className="text-center mt-4">
                <span className="inline-block px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                  {lightboxImage.category}
                </span>
                <h4 className="text-xl font-bold text-white">{lightboxImage.title}</h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
