  // import React, { useState } from 'react';
  // import { useForm } from 'react-hook-form';
  // import { Briefcase, MapPin, Calendar, Clock, Upload, CheckCircle2, AlertCircle, X } from 'lucide-react';
  // import { motion, AnimatePresence } from 'framer-motion';
  // import useFetch from '../hooks/useFetch';
  // import api from '../utils/api';
  // import Button from '../components/ui/Button';
  // import Card from '../components/ui/Card';
  // import SectionHeader from '../components/ui/SectionHeader';

  // const Careers = () => {
  //   const { data: jobs, loading, error } = useFetch('/api/careers');
  //   const [selectedJob, setSelectedJob] = useState(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [submitting, setSubmitting] = useState(false);
  //   const [submitted, setSubmitted] = useState(false);
  //   const [submitError, setSubmitError] = useState('');

  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm();

  //   const handleOpenApply = (job) => {
  //     setSelectedJob(job);
  //     setIsModalOpen(true);
  //     setSubmitted(false);
  //     setSubmitError('');
  //   };

  //   const handleCloseApply = () => {
  //     setIsModalOpen(false);
  //     setSelectedJob(null);
  //     reset();
  //   };

  //   const onSubmitApplication = async (data) => {
  //     setSubmitting(true);
  //     setSubmitError('');
  //     try {
  //       const formData = new FormData();
  //       formData.append('applicantName', data.applicantName);
  //       formData.append('applicantEmail', data.applicantEmail);
  //       formData.append('applicantPhone', data.applicantPhone);
  //       formData.append('coverLetter', data.coverLetter || '');
  //       formData.append('resume', data.resume[0]); // Multer expects single file matching 'resume' name

  //       const response = await api.post(`/api/careers/${selectedJob._id}/apply`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       if (response.data.success) {
  //         setSubmitted(true);
  //         reset();
  //       } else {
  //         setSubmitError(response.data.error || 'Failed to submit application.');
  //       }
  //     } catch (err) {
  //       setSubmitError(err.response?.data?.error || 'Server error uploading file. Please verify file type (PDF/Word) and size limit (10MB).');
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  //   return (
  //     <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
  //       <SectionHeader
  //         title="Join Our Growing Enterprise"
  //         subtitle="Careers"
  //         centered={true}
  //       />

  //       {/* Hero Section Banner inside Careers */}
  //       <div className="relative rounded-3xl overflow-hidden mb-16 h-72 flex items-center justify-center bg-brand-navy shadow-lg">
  //         <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&q=80&w=1200')" }}></div>
  //         <div className="relative text-center px-4 max-w-2xl">
  //           <h3 className="text-3xl font-extrabold text-white sm:text-4xl">Empowering Talent. Building Careers.</h3>
  //           <p className="text-slate-300 mt-4 text-base">
  //             Join our professional team of drivers, logisticians, operations leads, and safety supervisors. We offer robust benefits, growth opportunities, and safety-first corporate environments.
  //           </p>
  //         </div>
  //       </div>

  //       <h3 className="text-2xl font-extrabold text-brand-navy mb-8 border-b-2 border-slate-100 pb-4">Open Postings</h3>

  //       {loading ? (
  //         <div className="flex justify-center items-center py-20">
  //           <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
  //         </div>
  //       ) : error ? (
  //         <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
  //           <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
  //           <p className="font-bold">Failed to load careers</p>
  //           <p className="text-sm mt-1">{error}</p>
  //         </div>
  //       ) : jobs && jobs.length === 0 ? (
  //         <Card hoverEffect={false} className="text-center py-16 p-8 text-slate-500">
  //           <Briefcase className="mx-auto h-14 w-14 mb-4 text-slate-300" />
  //           <p className="text-lg font-bold">No active job openings currently</p>
  //           <p className="text-sm mt-1">Please check back later or send your resume to recruitment@logisticsco.com</p>
  //         </Card>
  //       ) : (
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {jobs.map((job) => (
  //             <Card key={job._id} hoverEffect={true} className="flex flex-col h-full justify-between">
  //               <div>
  //                 <div className="flex justify-between items-start mb-4">
  //                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-brand-red">
  //                     {job.type}
  //                   </span>
  //                   <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{job.department}</span>
  //                 </div>
  //                 <h4 className="text-xl font-bold text-brand-navy mb-2 line-clamp-1">{job.title}</h4>
  //                 <div className="flex items-center space-x-2 text-slate-500 text-sm mb-4">
  //                   <MapPin className="h-4 w-4 text-slate-400" />
  //                   <span>{job.location}</span>
  //                 </div>
  //                 <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
  //                   {job.description}
  //                 </p>

  //                 {job.requirements && job.requirements.length > 0 && (
  //                   <div className="mb-6">
  //                     <p className="text-xs font-extrabold text-brand-navy uppercase tracking-wider mb-2">Key Requirements:</p>
  //                     <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1.5">
  //                       {job.requirements.slice(0, 3).map((req, i) => (
  //                         <li key={i} className="line-clamp-1">{req}</li>
  //                       ))}
  //                       {job.requirements.length > 3 && <li>And {job.requirements.length - 3} more...</li>}
  //                     </ul>
  //                   </div>
  //                 )}
  //               </div>

  //               <Button variant="navy" className="w-full mt-auto" onClick={() => handleOpenApply(job)}>
  //                 Apply Now
  //               </Button>
  //             </Card>
  //           ))}
  //         </div>
  //       )}

  //       {/* Interactive Career Application Modal */}
  //       <AnimatePresence>
  //         {isModalOpen && selectedJob && (
  //           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm overflow-y-auto">
  //             <motion.div
  //               initial={{ scale: 0.95, opacity: 0 }}
  //               animate={{ scale: 1, opacity: 1 }}
  //               exit={{ scale: 0.95, opacity: 0 }}
  //               transition={{ duration: 0.3 }}
  //               className="relative w-full max-w-2xl bg-white rounded-2xl shadow-premium p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
  //             >
  //               {/* Close Button */}
  //               <button
  //                 type="button"
  //                 onClick={handleCloseApply}
  //                 className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red rounded-lg transition duration-200"
  //               >
  //                 <X className="h-6 w-6" />
  //               </button>

  //               <div className="mb-6">
  //                 <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Apply For Role</span>
  //                 <h4 className="text-2xl font-bold text-brand-navy mt-1">{selectedJob.title}</h4>
  //                 <p className="text-slate-500 text-sm mt-1">{selectedJob.department} | {selectedJob.location}</p>
  //               </div>

  //               {submitted ? (
  //                 <div className="text-center py-10 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
  //                   <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
  //                     <CheckCircle2 className="h-8 w-8" />
  //                   </div>
  //                   <h4 className="text-lg font-bold text-brand-navy">Application Submitted!</h4>
  //                   <p className="text-slate-600 text-sm mt-2">
  //                     Your job application has been successfully filed. Our HR recruitment specialists will review your credentials and contact you if your skills align with requirements.
  //                   </p>
  //                   <Button variant="navy" className="mt-6" onClick={handleCloseApply}>
  //                     Close Window
  //                   </Button>
  //                 </div>
  //               ) : (
  //                 <form onSubmit={handleSubmit(onSubmitApplication)} className="space-y-6">
  //                   {submitError && (
  //                     <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
  //                       <AlertCircle className="h-5 w-5 flex-shrink-0" />
  //                       <span>{submitError}</span>
  //                     </div>
  //                   )}

  //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  //                     {/* Applicant Name */}
  //                     <div>
  //                       <label className="block text-sm font-semibold text-brand-navy mb-2">Full Name *</label>
  //                       <input
  //                         type="text"
  //                         {...register('applicantName', { required: 'Full name is required' })}
  //                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
  //                         placeholder="John Doe"
  //                       />
  //                       {errors.applicantName && <p className="text-red-500 text-xs mt-1">{errors.applicantName.message}</p>}
  //                     </div>

  //                     {/* Applicant Email */}
  //                     <div>
  //                       <label className="block text-sm font-semibold text-brand-navy mb-2">Email Address *</label>
  //                       <input
  //                         type="email"
  //                         {...register('applicantEmail', {
  //                           required: 'Email is required',
  //                           pattern: {
  //                             value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //                             message: 'Valid email required',
  //                           },
  //                         })}
  //                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
  //                         placeholder="john.doe@email.com"
  //                       />
  //                       {errors.applicantEmail && <p className="text-red-500 text-xs mt-1">{errors.applicantEmail.message}</p>}
  //                     </div>
  //                   </div>

  //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  //                     {/* Applicant Phone */}
  //                     <div>
  //                       <label className="block text-sm font-semibold text-brand-navy mb-2">Phone Number *</label>
  //                       <input
  //                         type="tel"
  //                         {...register('applicantPhone', { required: 'Phone number is required' })}
  //                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
  //                         placeholder="+1 (555) 012-3456"
  //                       />
  //                       {errors.applicantPhone && <p className="text-red-500 text-xs mt-1">{errors.applicantPhone.message}</p>}
  //                     </div>

  //                     {/* Resume Upload File */}
  //                     <div>
  //                       <label className="block text-sm font-semibold text-brand-navy mb-2">Resume (PDF/Word) *</label>
  //                       <div className="relative flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
  //                         <input
  //                           type="file"
  //                           accept=".pdf,.doc,.docx"
  //                           {...register('resume', { required: 'Resume file is required' })}
  //                           className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  //                         />
  //                         <div className="flex items-center space-x-2 px-4 py-2.5 text-slate-500 pointer-events-none">
  //                           <Upload className="h-5 w-5 text-brand-navy" />
  //                           <span className="text-sm">Click to choose file...</span>
  //                         </div>
  //                       </div>
  //                       {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
  //                     </div>
  //                   </div>

  //                   {/* Cover Letter */}
  //                   <div>
  //                     <label className="block text-sm font-semibold text-brand-navy mb-2">Brief Cover Letter / Introduction</label>
  //                     <textarea
  //                       rows="4"
  //                       {...register('coverLetter')}
  //                       className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy"
  //                       placeholder="Outline why you are a good match for this opening..."
  //                     ></textarea>
  //                   </div>

  //                   {/* Submit buttons */}
  //                   <div className="flex justify-end space-x-4 pt-2">
  //                     <Button variant="outline" onClick={handleCloseApply} disabled={submitting}>
  //                       Cancel
  //                     </Button>
  //                     <Button type="submit" variant="red" disabled={submitting}>
  //                       {submitting ? 'Submitting Application...' : 'Submit Application'}
  //                     </Button>
  //                   </div>
  //                 </form>
  //               )}
  //             </motion.div>
  //           </div>
  //         )}
  //       </AnimatePresence>
  //     </div>
  //   );
  // };

  // export default Careers;


  // // validation for mobile number indian and email  and when pdf is upload so the pdf name is not show only show pdf like name 

  import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, MapPin, Calendar, Clock, Upload, CheckCircle2, AlertCircle, X, File, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import api from '../utils/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Careers = () => {
  const { data: jobs, loading, error } = useFetch('/api/careers');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  // Watch resume file for displaying name
  const resumeFile = watch('resume');

  // Indian phone number validation function
  const validateIndianPhone = (value) => {
    if (!value) return 'Indian phone number is required';
    
    // Remove all non-digit characters except + (for cleaning)
    const cleaned = value.replace(/[^0-9+]/g, '');
    
    // Check if it starts with +91
    if (cleaned.startsWith('+91')) {
      const digits = cleaned.replace('+91', '');
      if (digits.length === 10 && /^[6-9]/.test(digits)) {
        return true;
      }
      return 'Please enter a valid Indian phone number with +91 followed by 10 digits (e.g., +919876543210)';
    }
    
    // Check if it starts with 0
    if (cleaned.startsWith('0')) {
      const digits = cleaned.replace('0', '');
      if (digits.length === 10 && /^[6-9]/.test(digits)) {
        return true;
      }
      return 'Please enter a valid Indian phone number with 0 followed by 10 digits (e.g., 09876543210)';
    }
    
    // Check if it's exactly 10 digits starting with 6-9
    if (/^[6-9]\d{9}$/.test(cleaned)) {
      return true;
    }
    
    // Check if it has 10 digits starting with 6-9 (with other characters)
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
      return true;
    }
    
    return 'Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)';
  };

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setSubmitted(false);
    setSubmitError('');
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseApply = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setSelectedFileName('');
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmitApplication = async (data) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const formData = new FormData();
      formData.append('applicantName', data.applicantName);
      formData.append('applicantEmail', data.applicantEmail);
      formData.append('applicantPhone', data.applicantPhone);
      formData.append('coverLetter', data.coverLetter || '');
      formData.append('resume', data.resume[0]);

      const response = await api.post(`/api/careers/${selectedJob._id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitted(true);
        reset();
        setSelectedFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitError(response.data.error || 'Failed to submit application.');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Server error uploading file. Please verify file type (PDF/Word) and size limit (10MB).');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file selection to display file name
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Join Our Growing Enterprise"
        subtitle="Careers"
        centered={true}
      />

      {/* Hero Section Banner inside Careers */}
      <div className="relative rounded-3xl overflow-hidden mb-16 h-72 flex items-center justify-center bg-brand-navy shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&q=80&w=1200')" }}></div>
        <div className="relative text-center px-4 max-w-2xl">
          <h3 className="text-3xl font-extrabold text-white sm:text-4xl">Empowering Talent. Building Careers.</h3>
          <p className="text-slate-300 mt-4 text-base">
            Join our professional team of drivers, logisticians, operations leads, and safety supervisors. We offer robust benefits, growth opportunities, and safety-first corporate environments.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-extrabold text-brand-navy mb-8 border-b-2 border-slate-100 pb-4">Open Postings</h3>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
          <p className="font-bold">Failed to load careers</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : jobs && jobs.length === 0 ? (
        <Card hoverEffect={false} className="text-center py-16 p-8 text-slate-500">
          <Briefcase className="mx-auto h-14 w-14 mb-4 text-slate-300" />
          <p className="text-lg font-bold">No active job openings currently</p>
          <p className="text-sm mt-1">Please check back later or send your resume to recruitment@logisticsco.com</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Card key={job._id} hoverEffect={true} className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-brand-red">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{job.department}</span>
                </div>
                <h4 className="text-xl font-bold text-brand-navy mb-2 line-clamp-1">{job.title}</h4>
                <div className="flex items-center space-x-2 text-slate-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{job.location}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {job.description}
                </p>

                {job.requirements && job.requirements.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-extrabold text-brand-navy uppercase tracking-wider mb-2">Key Requirements:</p>
                    <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1.5">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="line-clamp-1">{req}</li>
                      ))}
                      {job.requirements.length > 3 && <li>And {job.requirements.length - 3} more...</li>}
                    </ul>
                  </div>
                )}
              </div>

              <Button variant="navy" className="w-full mt-auto" onClick={() => handleOpenApply(job)}>
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Interactive Career Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-premium p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseApply}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red rounded-lg transition duration-200"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Apply For Role</span>
                <h4 className="text-2xl font-bold text-brand-navy mt-1">{selectedJob.title}</h4>
                <p className="text-slate-500 text-sm mt-1">{selectedJob.department} | {selectedJob.location}</p>
              </div>

              {submitted ? (
                <div className="text-center py-10 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy">Application Submitted!</h4>
                  <p className="text-slate-600 text-sm mt-2">
                    Your job application has been successfully filed. Our HR recruitment specialists will review your credentials and contact you if your skills align with requirements.
                  </p>
                  <Button variant="navy" className="mt-6" onClick={handleCloseApply}>
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitApplication)} className="space-y-6">
                  {submitError && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Applicant Name */}
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('applicantName', { 
                          required: 'Full name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          },
                          pattern: {
                            value: /^[a-zA-Z\s'-]+$/,
                            message: 'Name can only contain letters and spaces'
                          }
                        })}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.applicantName ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-brand-navy`}
                        placeholder="John Doe"
                      />
                      {errors.applicantName && <p className="text-red-500 text-xs mt-1">{errors.applicantName.message}</p>}
                    </div>

                    {/* Applicant Email */}
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        {...register('applicantEmail', {
                          required: 'Email address is required',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address (e.g., name@company.com)',
                          },
                          validate: {
                            noSpaces: (value) => 
                              !value.includes(' ') || 'Email cannot contain spaces',
                            validDomain: (value) => 
                              /\.(com|org|net|in|edu|gov|co|io)$/i.test(value) || 
                              'Please enter a valid email domain (.com, .org, .in, etc.)'
                          }
                        })}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.applicantEmail ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-brand-navy`}
                        placeholder="john.doe@email.com"
                        onBlur={() => trigger('applicantEmail')}
                      />
                      {errors.applicantEmail && <p className="text-red-500 text-xs mt-1">{errors.applicantEmail.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Applicant Phone - Indian Number */}
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('applicantPhone', { 
                          required: 'Indian phone number is required',
                          validate: validateIndianPhone
                        })}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.applicantPhone ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-brand-navy`}
                        placeholder="9876543210 or +919876543210"
                        onBlur={() => trigger('applicantPhone')}
                      />
                      {errors.applicantPhone && <p className="text-red-500 text-xs mt-1">{errors.applicantPhone.message}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        Accepts: 9876543210, +919876543210, or 09876543210
                      </p>
                    </div>

                    {/* Resume Upload File with better display */}
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Resume (PDF/Word) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".pdf,.doc,.docx"
                          {...register('resume', { 
                            required: 'Resume file is required',
                            validate: {
                              fileType: (value) => {
                                if (!value || !value[0]) return true;
                                const file = value[0];
                                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                                return validTypes.includes(file.type) || 'Please upload a PDF or Word document (.pdf, .doc, .docx)';
                              },
                              fileSize: (value) => {
                                if (!value || !value[0]) return true;
                                const file = value[0];
                                const maxSize = 10 * 1024 * 1024; // 10MB
                                return file.size <= maxSize || 'File size must be less than 10MB';
                              }
                            }
                          })}
                          onChange={(e) => {
                            register('resume').onChange(e);
                            handleFileChange(e);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${
                          errors.resume ? 'border-red-500' : 'border-slate-300'
                        } bg-white`}>
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            {selectedFileName ? (
                              <>
                                <FileText className="h-5 w-5 text-brand-navy flex-shrink-0" />
                                <span className="text-sm text-slate-700 truncate">{selectedFileName}</span>
                              </>
                            ) : (
                              <>
                                <Upload className="h-5 w-5 text-brand-navy flex-shrink-0" />
                                <span className="text-sm text-slate-500">Click to choose file...</span>
                              </>
                            )}
                          </div>
                          {selectedFileName && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFileName('');
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                  // Reset the form value
                                  const event = new Event('change', { bubbles: true });
                                  fileInputRef.current.dispatchEvent(event);
                                }
                              }}
                              className="text-slate-400 hover:text-red-500 transition-colors z-20 ml-2 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">Brief Cover Letter / Introduction</label>
                    <textarea
                      rows="4"
                      {...register('coverLetter', {
                        maxLength: {
                          value: 1000,
                          message: 'Cover letter must be less than 1000 characters'
                        }
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.coverLetter ? 'border-red-500' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-brand-navy`}
                      placeholder="Outline why you are a good match for this opening..."
                    ></textarea>
                    {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter.message}</p>}
                  </div>

                  {/* Submit buttons */}
                  <div className="flex justify-end space-x-4 pt-2">
                    <Button variant="outline" onClick={handleCloseApply} disabled={submitting}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="red" disabled={submitting}>
                      {submitting ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;