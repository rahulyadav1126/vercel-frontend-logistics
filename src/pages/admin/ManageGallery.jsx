import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, X, Check, Upload, AlertCircle, Eye } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageGallery = () => {
  const { data: items, loading, error, refetch } = useFetch('/api/gallery');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [editingItem, setEditingItem] = useState(null);

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
      category: 'Logistics',
      imageUrl: '',
    });
    setPreviewImage('');
    setErrorMessage('');
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
    });
    setPreviewImage(item.imageUrl);
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMessage('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress(10);
      const res = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (res.data.success) {
        setValue('imageUrl', res.data.url);
        setPreviewImage(res.data.url);
      } else {
        setErrorMessage(res.data.error || 'Failed to upload image.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'File upload error. Check image dimensions and type.');
    } finally {
      setUploadProgress(0);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const response = await api.delete(`/api/gallery/${itemToDelete}`);
      if (response.data.success) {
        refetch();
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      } else {
        alert(response.data.error || 'Failed to delete gallery item.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Server error during deletion.');
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmitForm = async (data) => {
    if (!data.imageUrl) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      let response;
      if (editingItem) {
        response = await api.put(`/api/gallery/${editingItem._id}`, {
          title: data.title,
          category: data.category,
          imageUrl: data.imageUrl,
        });
      } else {
        response = await api.post('/api/gallery', {
          title: data.title,
          category: data.category,
          imageUrl: data.imageUrl,
        });
      }

      if (response.data.success) {
        setIsFormOpen(false);
        setEditingItem(null);
        reset();
        refetch();
      } else {
        setErrorMessage(response.data.error || 'Failed to create gallery item.');
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
        <h3 className="text-lg font-bold text-brand-navy">Operations Gallery</h3>
        <Button variant="red" size="sm" onClick={handleOpenCreate} icon={Plus}>
          Add Portfolio Image
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load gallery</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id} hoverEffect={false} className="p-4 bg-white relative group overflow-hidden border border-slate-100">
              <div className="relative rounded-lg overflow-hidden h-48 mb-3 bg-slate-50">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 bg-white/90 hover:bg-brand-navy hover:text-white rounded-lg text-brand-navy shadow-sm transition"
                    title="Edit Image Details"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="p-1.5 bg-white/90 hover:bg-brand-red hover:text-white rounded-lg text-brand-red shadow-sm transition"
                    title="Delete Image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">{item.category}</span>
              <h4 className="text-sm font-bold text-brand-navy truncate mt-0.5">{item.title}</h4>
            </Card>
          ))}
        </div>
      )}

      {/* CRUD Form Dialog */}
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
              {editingItem ? 'Edit Portfolio Image' : 'Add Portfolio Image'}
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
                <label className="block font-semibold text-brand-navy mb-1.5">Gallery Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="e.g. Heavy Haul Fleet in Chicago"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Category *</label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
                >
                  <option value="Logistics">Logistics Operations</option>
                  <option value="Manpower">Manpower Supply</option>
                  <option value="Warehouse">Warehouse Management</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* File Upload Selector */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Upload Image (JPG/PNG/WEBP) *</label>
                <div className="relative flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center space-x-2 px-4 py-2.5 text-slate-500 pointer-events-none">
                    <Upload className="h-5 w-5 text-brand-navy" />
                    <span className="text-sm">Click to choose image file...</span>
                  </div>
                </div>

                {uploadProgress > 0 && (
                  <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                {previewImage && (
                  <div className="mt-4 rounded-lg overflow-hidden h-28 border bg-slate-50 relative">
                    <img src={previewImage} alt="Upload preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="red" size="sm" disabled={submitting || uploadProgress > 0} icon={Check}>
                  {submitting ? 'Saving...' : 'Save Gallery Item'}
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
        title="Delete Gallery Item"
        message="Are you sure you want to delete this image? It will be removed from the public gallery immediately."
      />
    </div>
  );
};

export default ManageGallery;
