import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, X, Check, HelpCircle, AlertCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageServices = () => {
  const { data: services, loading, error, refetch } = useFetch('/api/services');
  const [editingService, setEditingService] = useState(null);
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
    setValue,
    formState: { errors },
  } = useForm();

  const handleOpenCreate = () => {
    reset({
      title: '',
      description: '',
      category: 'Logistics',
      icon: 'Truck',
      imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
      detailsString: '',
    });
    setEditingService(null);
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    reset({
      title: srv.title,
      description: srv.description,
      category: srv.category,
      icon: srv.icon,
      imageUrl: srv.imageUrl,
      detailsString: srv.details ? srv.details.join(', ') : '',
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
      const response = await api.delete(`/api/services/${itemToDelete}`);
      if (response.data.success) {
        refetch();
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      } else {
        alert(response.data.error || 'Failed to delete service.');
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

    // Convert comma-separated string details back to array
    const details = data.detailsString
      ? data.detailsString.split(',').map((item) => item.trim()).filter((item) => item.length > 0)
      : [];

    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      icon: data.icon,
      imageUrl: data.imageUrl,
      details,
    };

    try {
      let response;
      if (editingService) {
        response = await api.put(`/api/services/${editingService._id}`, payload);
      } else {
        response = await api.post('/api/services', payload);
      }

      if (response.data.success) {
        setIsFormOpen(false);
        setEditingService(null);
        reset();
        refetch();
      } else {
        setErrorMessage(response.data.error || 'Failed to save service.');
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
        <h3 className="text-lg font-bold text-brand-navy">Service Catalog</h3>
        <Button variant="red" size="sm" onClick={handleOpenCreate} icon={Plus}>
          Add New Service
        </Button>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <Card key={srv._id} hoverEffect={false} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-brand-navy border border-slate-200">
                    {srv.category}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                      title="Edit Service"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(srv._id)}
                      className="p-1.5 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-2">{srv.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{srv.description}</p>
                {srv.details && srv.details.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] font-extrabold text-brand-navy uppercase tracking-wider mb-1">Details List:</p>
                    <ul className="list-disc pl-5 text-[10px] text-slate-400 space-y-1">
                      {srv.details.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CRUD Form Drawer/Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-premium p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red rounded-lg transition"
            >
              <X className="h-6 w-6" />
            </button>

            <h4 className="text-xl font-bold text-brand-navy mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h4>

            {errorMessage && (
              <div className="mb-6 flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-sm">
              {/* Title */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Service Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="e.g. Forklift Operator Staffing"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Description *</label>
                <textarea
                  rows="3"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="Provide a short service summary..."
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Category *</label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="Logistics">Logistics Only</option>
                    <option value="Manpower">Manpower Only</option>
                    <option value="Both">Both Sectors</option>
                  </select>
                </div>

                {/* Icon identifier */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Icon ID</label>
                  <select
                    {...register('icon')}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="Truck">Truck (Freight)</option>
                    <option value="Warehouse">Warehouse (Depot)</option>
                    <option value="Users">Users (Staffing)</option>
                    <option value="GraduationCap">Graduation Cap (Training)</option>
                    <option value="Activity">Activity (Metrics)</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Image URL *</label>
                <input
                  type="text"
                  {...register('imageUrl', { required: 'Image URL is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Details Bullet points */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Detailed Bullet points (Comma-separated)</label>
                <input
                  type="text"
                  {...register('detailsString')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="Bullet one, Bullet two, Bullet three"
                />
                <p className="text-[10px] text-slate-400 mt-1">Separate details using commas</p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="red" size="sm" disabled={submitting} icon={Check}>
                  {submitting ? 'Saving...' : 'Save Service'}
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
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone and will remove it from the public homepage."
      />
    </div>
  );
};

export default ManageServices;
