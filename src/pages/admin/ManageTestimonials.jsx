import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, X, Check, Star, AlertCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageTestimonials = () => {
  const { data: testimonials, loading, error, refetch } = useFetch('/api/testimonials');
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenCreate = () => {
    reset({
      clientName: '',
      company: '',
      feedback: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    });
    setEditingTestimonial(null);
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (test) => {
    setEditingTestimonial(test);
    reset({
      clientName: test.clientName,
      company: test.company,
      feedback: test.feedback,
      rating: test.rating,
      avatar: test.avatar,
    });
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const response = await api.delete(`/api/testimonials/${itemToDelete}`);
      if (response.data.success) {
        refetch();
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      } else {
        alert(response.data.error || 'Failed to delete testimonial.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Server error during deletion.');
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmitForm = async (data) => {
    setSubmitting(true);
    setErrorMessage('');

    const payload = {
      clientName: data.clientName,
      company: data.company,
      feedback: data.feedback,
      rating: Number(data.rating),
      avatar: data.avatar,
    };

    try {
      let response;
      if (editingTestimonial) {
        response = await api.put(`/api/testimonials/${editingTestimonial._id}`, payload);
      } else {
        response = await api.post('/api/testimonials', payload);
      }

      if (response.data.success) {
        setIsFormOpen(false);
        setEditingTestimonial(null);
        reset();
        refetch();
      } else {
        setErrorMessage(response.data.error || 'Failed to save testimonial.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Server connection error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-brand-navy">Client Testimonials</h3>
        <Button variant="red" size="sm" onClick={handleOpenCreate} icon={Plus}>
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load testimonials</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test) => (
            <Card key={test._id} hoverEffect={false} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-1 text-brand-red">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenEdit(test)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(test._id)}
                      className="p-1.5 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 text-xs italic mb-4 leading-relaxed">"{test.feedback}"</p>
              </div>

              <div className="flex items-center space-x-3 mt-4 border-t border-slate-100 pt-4">
                {test.avatar && (
                  <img src={test.avatar} alt={test.clientName} className="h-10 w-10 rounded-full object-cover border" />
                )}
                <div>
                  <h5 className="font-bold text-brand-navy text-xs">{test.clientName}</h5>
                  <p className="text-[10px] text-slate-400 font-semibold">{test.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Testimonial Form Dialog */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-premium p-8">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red rounded-lg transition"
            >
              <X className="h-6 w-6" />
            </button>

            <h4 className="text-xl font-bold text-brand-navy mb-6">
              {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
            </h4>

            {errorMessage && (
              <div className="mb-6 flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-sm">
              {/* Client Name */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Client Name *</label>
                <input
                  type="text"
                  {...register('clientName', { required: 'Client Name is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="e.g. Sarah Jenkins"
                />
                {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>}
              </div>

              {/* Company & Designation */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Company / Title *</label>
                <input
                  type="text"
                  {...register('company', { required: 'Company / Title is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="e.g. Prime Retail Group, COO"
                />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
              </div>

              {/* Rating */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Rating (1 to 5 Stars) *</label>
                <select
                  {...register('rating', { required: true })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Feedback Content */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Feedback Feedback *</label>
                <textarea
                  rows="4"
                  {...register('feedback', { required: 'Feedback text is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="Enter corporate feedback content here..."
                ></textarea>
                {errors.feedback && <p className="text-red-500 text-xs mt-1">{errors.feedback.message}</p>}
              </div>

              {/* Avatar Url */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Avatar Image URL</label>
                <input
                  type="text"
                  {...register('avatar')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="red" size="sm" disabled={submitting} icon={Check}>
                  {submitting ? 'Saving...' : 'Save Testimonial'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
};

export default ManageTestimonials;
