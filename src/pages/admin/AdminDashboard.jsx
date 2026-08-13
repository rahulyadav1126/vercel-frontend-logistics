import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Truck,
  Image as ImageIcon,
  MessageSquare,
  Briefcase,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard Analytics', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Services', path: '/admin/services', icon: Truck },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Manage Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Manage Careers', path: '/admin/careers', icon: Briefcase },
    { name: 'Job Applications', path: '/admin/applications', icon: UserCheck },
    { name: 'Contact Leads', path: '/admin/contacts', icon: Users },
    { name: 'Quote Requests', path: '/admin/quotes', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-navy text-slate-300">
      {/* Brand logo bar */}
      <div className="flex items-center space-x-2 px-6 py-6 bg-brand-navy-dark border-b border-slate-700/50">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red text-white shadow-md">
          <Truck className="h-4.5 w-4.5" />
        </div>
        <span className="font-black text-white text-base tracking-wider">ADMIN PORTAL</span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition duration-200 ${
                active
                  ? 'bg-brand-red text-white shadow-md'
                  : 'hover:bg-brand-navy-light hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Admin Profile & Logout section */}
      <div className="p-4 bg-brand-navy-dark border-t border-slate-700/50 flex flex-col space-y-3">
        <div className="flex items-center space-x-3 px-2">
          <div className="h-9 w-9 rounded-full bg-brand-navy-light flex items-center justify-center text-white border border-slate-600">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white leading-tight truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role || 'Admin'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-red-950/60 border border-brand-red/50 text-red-200 text-xs font-bold hover:bg-brand-red hover:text-white transition duration-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar (Left side panel) */}
      <aside className="hidden md:block w-64 flex-shrink-0 shadow-lg border-r border-slate-200">
        <SidebarContent />
      </aside>

      {/* Main Panel space */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center space-x-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-brand-navy hover:text-brand-red md:hidden focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-extrabold text-brand-navy">
              {menuItems.find((item) => isActive(item.path))?.name || 'Admin Panel'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-brand-red">
              Live Database Connected
            </span>
          </div>
        </header>

        {/* Content canvas */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100/60">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-brand-navy/60 backdrop-blur-sm">
          <div className="relative w-64 max-w-xs shadow-2xl flex flex-col h-full bg-brand-navy">
            {/* Close Mobile Drawer */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
            <SidebarContent />
          </div>
          <div className="flex-grow" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
