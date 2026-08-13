import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import Reusable Layout items
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import ScrollToTop from './components/ScrollToTop';

// Import Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Industries from './pages/Industries';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';  // y add aaj
import TermsOfService from './pages/TermsOfService'; //y abhi

// Import Admin Dashboard Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardHome from './pages/admin/DashboardHome';
import ManageServices from './pages/admin/ManageServices';
import ManageGallery from './pages/admin/ManageGallery';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageCareers from './pages/admin/ManageCareers';
import ManageContacts from './pages/admin/ManageContacts';
import ManageQuotes from './pages/admin/ManageQuotes';
import ManageApplications from "./pages/admin/ManageApplications";

// Helper component to conditionally render client-facing layouts
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {!isAdminPath && <Navbar />}
      <main className={`flex-grow ${!isAdminPath ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <FloatingWhatsapp />}
      {!isAdminPath && <ScrollToTop />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Public Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-quote" element={<GetQuote />} />
{/* legal page */}

<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-of-service" element={<TermsOfService />} />



            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Portal Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminDashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="careers" element={<ManageCareers />} />
                <Route path="applications" element={<ManageApplications />} />
                <Route path="contacts" element={<ManageContacts />} />
                <Route path="quotes" element={<ManageQuotes />} />
              </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
