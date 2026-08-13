import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, X, Check, FileText, ExternalLink, Calendar, Briefcase, Eye, AlertCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import api from '../../utils/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DeleteModal from '../../components/ui/DeleteModal';

const ManageCareers = () => {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
  const [editingJob, setEditingJob] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, type: null }); // type: 'job' | 'app'
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch job listings (admin gets all) and candidate applications
  const { data: jobs, loading: loadingJobs, error: errorJobs, refetch: refetchJobs } = useFetch('/api/careers/all');
  const { data: applications, loading: loadingApps, error: errorApps, refetch: refetchApps } = useFetch('/api/careers/applications');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenCreate = () => {
    reset({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirementsString: '',
      active: true,
    });
    setEditingJob(null);
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    reset({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirementsString: job.requirements ? job.requirements.join('\n') : '',
      active: job.active,
    });
    setErrorMessage('');
    setIsFormOpen(true);
  };

  const handleDeleteJobClick = (id) => {
    setDeleteModal({ isOpen: true, id, type: 'job' });
  };

  const handleDeleteAppClick = (id) => {
    setDeleteModal({ isOpen: true, id, type: 'app' });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    
    try {
      if (deleteModal.type === 'job') {
        const res = await api.delete(`/api/careers/${deleteModal.id}`);
        if (res.data.success) {
          refetchJobs();
          refetchApps();
        }
      } else if (deleteModal.type === 'app') {
        const res = await api.delete(`/api/careers/applications/${deleteModal.id}`);
        if (res.data.success) {
          refetchApps();
          setSelectedApp(null);
        }
      }
      setDeleteModal({ isOpen: false, id: null, type: null });
    } catch (err) {
      alert(`Error deleting ${deleteModal.type === 'job' ? 'job opening' : 'application'}.`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateAppStatus = async (appId, status) => {
    try {
      const res = await api.put(`/api/careers/applications/${appId}`, { status });
      if (res.data.success) {
        refetchApps();
        if (selectedApp && selectedApp._id === appId) {
          setSelectedApp({ ...selectedApp, status });
        }
      }
    } catch (err) {
      alert('Error updating application status.');
    }
  };



  const onSubmitForm = async (data) => {
    setSubmitting(true);
    setErrorMessage('');

    // Parse requirements newline string to array
    const requirements = data.requirementsString
      ? data.requirementsString.split('\n').map((r) => r.trim()).filter((r) => r.length > 0)
      : [];

    const payload = {
      title: data.title,
      department: data.department,
      location: data.location,
      type: data.type,
      description: data.description,
      requirements,
      active: data.active,
    };

    try {
      let response;
      if (editingJob) {
        response = await api.put(`/api/careers/${editingJob._id}`, payload);
      } else {
        response = await api.post('/api/careers', payload);
      }

      if (response.data.success) {
        setIsFormOpen(false);
        setEditingJob(null);
        reset();
        refetchJobs();
      } else {
        setErrorMessage(response.data.error || 'Failed to save job opening.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Server error saving data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab controls */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 text-sm font-bold border-b-2 transition ${
              activeTab === 'jobs' ? 'border-brand-red text-brand-navy' : 'border-transparent text-slate-400'
            }`}
          >
            Manage Job Openings
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-4 text-sm font-bold border-b-2 transition ${
              activeTab === 'applications' ? 'border-brand-red text-brand-navy' : 'border-transparent text-slate-400'
            }`}
          >
            Candidate Applications ({applications?.length || 0})
          </button>
        </div>

        {activeTab === 'jobs' && (
          <Button variant="red" size="sm" onClick={handleOpenCreate} icon={Plus}>
            Add Job opening
          </Button>
        )}
      </div>

      {activeTab === 'jobs' ? (
        // Tab 1: Job listings CRUD
        loadingJobs ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
          </div>
        ) : errorJobs ? (
          <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
            <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
            <p className="font-bold">Failed to load careers</p>
            <p className="text-sm mt-1">{errorJobs}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} hoverEffect={false} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      job.active ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {job.active ? 'Active' : 'Archived'}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJobClick(job._id)}
                        className="p-1.5 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-brand-navy mb-1">{job.title}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{job.department} | {job.location}</p>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">{job.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        // Tab 2: Applications view and review
        loadingApps ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
          </div>
        ) : errorApps ? (
          <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
            <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
            <p className="font-bold">Failed to load applications</p>
            <p className="text-sm mt-1">{errorApps}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <FileText className="mx-auto h-12 w-12 mb-3 text-slate-300" />
            <p className="font-semibold text-slate-500">No applications received yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {applications.map((app) => (
                <div
                  key={app._id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedApp?._id === app._id
                      ? 'bg-brand-navy text-white border-transparent'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-sm truncate max-w-[120px]">{app.applicantName}</h5>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      app.status === 'Applied'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : app.status === 'Shortlisted'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate ${selectedApp?._id === app._id ? 'text-slate-300' : 'text-slate-400'}`}>
                    Applied for: {app.careerId?.title || 'Unknown Role'}
                  </p>
                </div>
              ))}
            </div>

            {/* Application Detail View */}
            <div className="lg:col-span-2">
              {selectedApp ? (
                <Card hoverEffect={false} className="p-6 space-y-6">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-brand-navy">{selectedApp.applicantName}</h4>
                      <p className="text-slate-400 text-xs">
                        Application for: <span className="font-bold text-brand-navy">{selectedApp.careerId?.title || 'Unknown Role'}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={selectedApp.status}
                        onChange={(e) => handleUpdateAppStatus(selectedApp._id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white focus:outline-none"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button
                        onClick={() => handleDeleteAppClick(selectedApp._id)}
                        className="p-2 bg-red-50 hover:bg-brand-red hover:text-white rounded-lg text-brand-red transition"
                        title="Delete Application"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Applicant Info */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                      <a href={`mailto:${selectedApp.applicantEmail}`} className="text-brand-red font-semibold hover:underline block mt-0.5">
                        {selectedApp.applicantEmail}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block">Phone Number</span>
                      <a href={`tel:${selectedApp.applicantPhone}`} className="text-brand-navy font-semibold block mt-0.5">
                        {selectedApp.applicantPhone}
                      </a>
                    </div>
                  </div>

                  {/* Resume Download Link */}
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-2">Candidate Resume</span>
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-brand-navy transition shadow-sm"
                    >
                      <FileText className="h-4.5 w-4.5 text-brand-red mr-2" />
                      <span>Open Candidate Resume</span>
                      <ExternalLink className="h-3 w-3 ml-2 text-slate-400" />
                    </a>
                  </div>

                  {/* Cover Letter */}
                  {selectedApp.coverLetter && (
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-2">Cover Letter</span>
                      <div className="p-4 rounded-lg bg-slate-50 border text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                        {selectedApp.coverLetter}
                      </div>
                    </div>
                  )}
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-12 text-slate-400 text-sm">
                  Select a candidate application to view details.
                </div>
              )}
            </div>
          </div>
        )
      )}


      {/* Career CRUD Modal */}
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
              {editingJob ? 'Edit Job Opening' : 'Add Job Opening'}
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
                <label className="block font-semibold text-brand-navy mb-1.5">Job Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  placeholder="e.g. CDL Logistics Route Coordinator"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Department */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Department *</label>
                  <input
                    type="text"
                    {...register('department', { required: 'Department is required' })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none"
                    placeholder="Operations / Staffing"
                  />
                </div>
                {/* Location */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Location *</label>
                  <input
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none"
                    placeholder="Chicago, IL / Houston, TX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Job Type */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Job Type *</label>
                  <select
                    {...register('type', { required: true })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>

                {/* Active check */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1.5">Visibility Status</label>
                  <div className="flex items-center space-x-2 mt-2.5">
                    <input
                      type="checkbox"
                      id="active"
                      {...register('active')}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-brand-red focus:ring-brand-navy"
                    />
                    <label htmlFor="active" className="text-xs font-bold text-slate-500">List as Active opening</label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Job Description *</label>
                <textarea
                  rows="4"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none"
                  placeholder="Outline the core responsibilities and benefits..."
                ></textarea>
              </div>

              {/* Requirements */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1.5">Candidate Requirements (One per line)</label>
                <textarea
                  rows="3"
                  {...register('requirementsString')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none"
                  placeholder="Requirement number one&#10;Requirement number two"
                ></textarea>
                <p className="text-[10px] text-slate-400 mt-1">Separate requirements by typing enter/new line</p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="red" size="sm" disabled={submitting} icon={Check}>
                  {submitting ? 'Saving...' : 'Save Job Opening'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => !isDeleting && setDeleteModal({ isOpen: false, id: null, type: null })}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title={deleteModal.type === 'job' ? 'Delete Job Opening' : 'Delete Application'}
        message={deleteModal.type === 'job' 
          ? 'Are you sure you want to delete this job opening? This will also permanently delete all applications associated with it. This action cannot be undone.'
          : 'Are you sure you want to delete this application? This action cannot be undone.'}
      />
    </div>
  );
};

export default ManageCareers;




