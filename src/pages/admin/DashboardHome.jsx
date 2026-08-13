import React from 'react';
import {
  FileText,
  Users,
  Briefcase,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Inbox,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/ui/Card';

const DashboardHome = () => {
  const { data, loading, error } = useFetch('/api/auth/stats');

  const stats = data?.stats;
  const recentQuotes = data?.recentQuotes || [];
  const recentContacts = data?.recentContacts || [];

  const cards = [
    {
      title: 'Quote Requests',
      value: stats?.quotes || 0,
      sub: `${stats?.pendingQuotes || 0} Pending`,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      icon: FileText,
      link: '/admin/quotes',
    },
    {
      title: 'Contact Leads',
      value: stats?.contacts || 0,
      sub: `${stats?.pendingContacts || 0} Unread`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      icon: Users,
      link: '/admin/contacts',
    },
    {
      title: 'Job Openings',
      value: stats?.careers || 0,
      sub: 'Active postings',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      icon: Briefcase,
      link: '/admin/careers',
    },
    {
      title: 'Job Applications',
      value: stats?.applications || 0,
      sub: `${stats?.pendingApplications || 0} New`,
      color: 'bg-red-50 text-brand-red border-red-100',
      icon: UserCheck,
      link: '/admin/applications',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-brand-navy"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 text-red-700 rounded-xl p-4 border border-red-200">
        <AlertCircle className="mx-auto h-12 w-12 mb-2 text-red-500" />
        <p className="font-bold">Failed to load analytics data</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-brand-navy text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-soft-lg">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-red opacity-15 blur-2xl"></div>
        <h2 className="text-2xl font-bold">Executive Analytics Terminal</h2>
        <p className="text-slate-300 text-sm mt-1 max-w-lg">
          Oversight summary of customer quote requests, incoming contact submissions, job opening applications, and service catalog databases.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} to={card.link}>
              <Card
                hoverEffect={true}
                className={`flex items-center space-x-4 border p-6 ${card.color}`}
              >
                <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.title}</p>
                  <p className="text-2xl font-extrabold text-slate-800">{card.value}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{card.sub}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <Card hoverEffect={false} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-extrabold text-brand-navy uppercase tracking-wider flex items-center">
              <Inbox className="h-5 w-5 text-brand-red mr-2" /> Recent Quote Requests
            </h3>
            <Link to="/admin/quotes" className="text-xs font-bold text-brand-red flex items-center hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <p className="text-slate-400 text-sm py-6 text-center">No quote requests submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentQuotes.map((q) => (
                    <tr key={q._id} className="text-slate-600">
                      <td className="py-3 font-semibold">{q.name}</td>
                      <td className="py-3 truncate max-w-[150px]">{q.serviceType}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Recent Contacts */}
        <Card hoverEffect={false} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-extrabold text-brand-navy uppercase tracking-wider flex items-center">
              <Inbox className="h-5 w-5 text-brand-red mr-2" /> Recent Inquiry Leads
            </h3>
            <Link to="/admin/contacts" className="text-xs font-bold text-brand-red flex items-center hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>

          {recentContacts.length === 0 ? (
            <p className="text-slate-400 text-sm py-6 text-center">No contact inquiries submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentContacts.map((c) => (
                    <tr key={c._id} className="text-slate-600">
                      <td className="py-3 font-semibold">{c.name}</td>
                      <td className="py-3 truncate max-w-[150px]">{c.subject}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
