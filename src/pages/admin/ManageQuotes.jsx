import React, { useState } from 'react';
import { Trash2, AlertCircle, RefreshCw, FileText, Calendar, Check, Compass, MessageSquare } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageQuotes = () => {
  const { data: quotes, loading, error, refetch } = useFetch('/api/quotes');
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/quotes/${id}`, { status });
      if (res.data.success) {
        refetch();
        if (selectedQuote && selectedQuote._id === id) {
          setSelectedQuote({ ...selectedQuote, status });
        }
      }
    } catch (err) {
      alert('Error updating status.');
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
      const res = await api.delete(`/api/quotes/${itemToDelete}`);
      if (res.data.success) {
        refetch();
        setSelectedQuote(null);
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      }
    } catch (err) {
      alert('Error deleting quote request.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <h3 className="text-lg font-bold text-brand-navy">Quote Requests</h3>
        <button
          onClick={refetch}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          title="Refresh Data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load quotes</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileText className="mx-auto h-12 w-12 mb-3 text-slate-300" />
          <p className="font-semibold text-slate-500">No quote requests received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quotes List */}
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {quotes.map((q) => (
              <div
                key={q._id}
                onClick={() => setSelectedQuote(q)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedQuote?._id === q._id
                    ? 'bg-brand-navy text-white border-transparent'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sm truncate max-w-[120px]">{q.name}</h5>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    q.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {q.status}
                  </span>
                </div>
                <p className={`text-[10px] truncate ${selectedQuote?._id === q._id ? 'text-slate-300' : 'text-slate-400'}`}>
                  Service: {q.serviceType}
                </p>
                <p className="text-[8px] text-slate-500 mt-1">
                  {new Date(q.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Details View */}
          <div className="lg:col-span-2">
            {selectedQuote ? (
              <Card hoverEffect={false} className="p-6 space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-brand-navy">{selectedQuote.name}</h4>
                    <p className="text-slate-400 text-xs mt-0.5 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Submitted: {new Date(selectedQuote.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {selectedQuote.status === 'Pending' ? (
                      <button
                        onClick={() => handleUpdateStatus(selectedQuote._id, 'Replied')}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-lg text-xs font-bold transition flex items-center"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" /> Mark Replied
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(selectedQuote._id, 'Pending')}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 rounded-lg text-xs font-bold transition flex items-center"
                      >
                        Mark Pending
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(selectedQuote._id)}
                      className="p-2 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                      title="Delete Quote Request"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                    <a href={`mailto:${selectedQuote.email}`} className="text-brand-red font-semibold hover:underline block mt-0.5">
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Phone Number</span>
                    <a href={`tel:${selectedQuote.phone}`} className="text-brand-navy font-semibold block mt-0.5">
                      {selectedQuote.phone}
                    </a>
                  </div>
                </div>

                {/* Company & Service details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Requested Service</span>
                    <p className="text-slate-800 font-bold mt-0.5">{selectedQuote.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Company Size</span>
                    <p className="text-slate-800 font-bold mt-0.5">{selectedQuote.companySize || 'N/A'}</p>
                  </div>
                </div>

                {/* Locations (Logistics freight specific details) */}
                {(selectedQuote.pickupLocation || selectedQuote.deliveryLocation) && (
                  <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-brand-navy font-bold">
                      <Compass className="h-4 w-4 text-brand-red" />
                      <span>Logistics Transit Parameters</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block">Pickup Origin</span>
                        <p className="text-slate-800 font-semibold mt-0.5">{selectedQuote.pickupLocation || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block">Delivery Destination</span>
                        <p className="text-slate-800 font-semibold mt-0.5">{selectedQuote.deliveryLocation || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirement message details */}
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 text-slate-400 mr-1.5" /> Requirement Message
                  </span>
                  <div className="p-4 rounded-lg bg-slate-50 border text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                    {selectedQuote.message}
                  </div>
                </div>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-12 text-slate-400 text-sm">
                Select a quote request from the left list to view details.
              </div>
            )}
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Quote Request"
        message="Are you sure you want to delete this quote request? This action cannot be undone."
      />
    </div>
  );
};

export default ManageQuotes;
