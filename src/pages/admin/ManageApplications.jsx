import React, { useState } from 'react';
import {
  Trash2,
  FileText,
  ExternalLink,
  Calendar,
  Briefcase,
  AlertCircle,
  RefreshCw,
  Mail,
  Phone,
  Search,
  UserCheck,
  Clock
} from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageApplications = () => {
  const { data: applications, loading, error, refetch } = useFetch('/api/careers/applications');
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/careers/applications/${id}`, { status });
      if (res.data.success) {
        refetch();
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp({ ...selectedApp, status });
        }
      }
    } catch (err) {
      alert('Error updating application status.');
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
      const res = await api.delete(`/api/careers/applications/${itemToDelete}`);
      if (res.data.success) {
        refetch();
        setSelectedApp(null);
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      }
    } catch (err) {
      alert('Error deleting application.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter and search logic
  const filteredApps = applications
    ? applications.filter((app) => {
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        
        const candidateName = app.applicantName?.toLowerCase() || '';
        const candidateEmail = app.applicantEmail?.toLowerCase() || '';
        const jobTitle = app.careerId?.title?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        const matchesSearch =
          candidateName.includes(query) ||
          candidateEmail.includes(query) ||
          jobTitle.includes(query);

        return matchesStatus && matchesSearch;
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-brand-navy">Candidate Job Applications</h3>
          <p className="text-xs text-slate-400">Review and process received job application resumes</p>
        </div>
        <button
          onClick={refetch}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          title="Refresh Data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit">
          {['All', 'Applied', 'Reviewed', 'Shortlisted', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                statusFilter === status
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/55'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by applicant name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load applications</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : applications?.length === 0 ? (
        <Card hoverEffect={false} className="text-center py-16 text-slate-400">
          <FileText className="mx-auto h-12 w-12 mb-3 text-slate-300" />
          <p className="font-semibold text-slate-500">No applications received yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications list */}
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {filteredApps.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No matching applications found.
              </div>
            ) : (
              filteredApps.map((app) => (
                <div
                  key={app._id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedApp?._id === app._id
                      ? 'bg-brand-navy text-white border-transparent shadow-soft-lg'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-sm truncate max-w-[150px]">{app.applicantName}</h5>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      app.status === 'Applied'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : app.status === 'Shortlisted'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : app.status === 'Rejected'
                        ? 'bg-red-100 text-brand-red border border-red-200'
                        : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <p className={`text-[10px] truncate ${selectedApp?._id === app._id ? 'text-slate-300' : 'text-slate-400'}`}>
                    Applied for: {app.careerId?.title || 'Unknown Role'}
                  </p>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100/50">
                    <span className="text-[9px] text-slate-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                    {app.resumeUrl && (
                      <span className="text-[9px] text-brand-red font-semibold flex items-center">
                        <FileText className="h-3 w-3 mr-0.5" /> Resume Included
                      </span>
                    )}
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(app._id);
                        }}
                        className="p-1 hover:bg-red-200 rounded text-red-500"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Details View */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <Card hoverEffect={false} className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-brand-navy">{selectedApp.applicantName}</h4>
                    <p className="text-slate-400 text-xs flex items-center mt-1">
                      <Briefcase className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      Applied position: <span className="font-bold text-brand-navy ml-1">{selectedApp.careerId?.title || 'Unknown Role'}</span>
                      {selectedApp.careerId?.department && (
                        <span className="ml-1 px-1.5 py-0.5 bg-slate-100 rounded text-[9px] text-slate-500">
                          {selectedApp.careerId.department}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedApp.status}
                      onChange={(e) => handleUpdateStatus(selectedApp._id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy cursor-pointer"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDeleteClick(selectedApp._id)}
                      className="p-2 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                      title="Delete Application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Candidate Information Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                    <a
                      href={`mailto:${selectedApp.applicantEmail}`}
                      className="text-brand-red font-semibold hover:underline block mt-1 flex items-center"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      {selectedApp.applicantEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Phone Number</span>
                    <a
                      href={`tel:${selectedApp.applicantPhone}`}
                      className="text-brand-navy font-semibold block mt-1 flex items-center hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-slate-500" />
                      {selectedApp.applicantPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Submitted Date</span>
                    <span className="text-slate-700 font-semibold block mt-1 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-slate-500" />
                      {new Date(selectedApp.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Location Preference</span>
                    <span className="text-slate-700 font-semibold block mt-1">
                      {selectedApp.careerId?.location || 'Not Specified'}
                    </span>
                  </div>
                </div>

                {/* Candidate Resume Download */}
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-2">Candidate Resume</span>
                  {selectedApp.resumeUrl ? (
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-brand-navy transition shadow-sm border border-slate-200"
                    >
                      <FileText className="h-4.5 w-4.5 text-brand-red mr-2" />
                      <span>Open & View Candidate Resume</span>
                      <ExternalLink className="h-3 w-3 ml-2 text-slate-400" />
                    </a>
                  ) : (
                    <div className="flex items-center text-slate-400 bg-slate-50 border p-3 rounded-lg text-xs">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      No resume file uploaded for this candidate.
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                {selectedApp.coverLetter && (
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-2">Cover Letter</span>
                    <div className="p-4 rounded-xl bg-slate-50 border text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                      {selectedApp.coverLetter}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-12 text-slate-400 text-sm">
                Select a candidate application from the list to view full resume details.
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
        title="Delete Application"
        message="Are you sure you want to delete this job application? This action cannot be undone."
      />
    </div>
  );
};

export default ManageApplications;
