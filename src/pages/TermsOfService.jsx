import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
     const navigate = useNavigate();
  const sections = [
    {
      title: "Acceptance of Terms",
      text: "By accessing and using our website, you agree to follow these Terms of Service and comply with all applicable laws and regulations."
    },
    {
      title: "Website Usage",
      text: "Users must use this website only for lawful purposes. Any attempt to damage, misuse, or disrupt website functionality is strictly prohibited."
    },
    {
      title: "Our Services",
      text: "We provide logistics, transportation, freight management, warehousing, and manpower solutions. Service availability and details may change without prior notice."
    },
    {
      title: "Quote Requests & Enquiries",
      text: "Information submitted through contact forms, quote requests, or enquiry forms must be accurate and complete to allow proper communication."
    },
    {
      title: "Career Applications",
      text: "Applicants submitting career information are responsible for providing correct personal and professional details."
    },
    {
      title: "Intellectual Property",
      text: "All website content including text, graphics, images, design elements, and branding belongs to the company and cannot be copied without permission."
    },
    {
      title: "Limitation of Liability",
      text: "We are not responsible for any direct or indirect loss resulting from the use of information available on this website."
    },
    {
      title: "Changes to Terms",
      text: "We reserve the right to update these Terms of Service whenever required. Updated terms will be published on this page."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20">

      {/* Header */}
      <section className="bg-brand-navy py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Terms of Service
        </h1>

        <p className="text-slate-300 mt-4">
          Guidelines and policies for using our website and services
        </p>
      </section>


      <div className="max-w-5xl mx-auto px-5 py-12">

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

          <div className="flex justify-between items-center mb-8 border-b pb-5">

            <h2 className="text-2xl font-bold text-brand-navy">
              Terms & Conditions
            </h2>

            <span className="text-sm text-slate-500">
              Last Updated: 2026
            </span>

          </div>


          <div className="space-y-6">

            {sections.map((item,index)=>(
              <div
                key={index}
                className="p-5 rounded-2xl bg-slate-50 border hover:border-brand-red transition"
              >

                <h3 className="text-lg font-bold text-brand-navy mb-2">
                  {index + 1}. {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.text}
                </p>

              </div>
            ))}

          </div>


          {/* Contact Box */}

          <div className="mt-10 bg-brand-navy rounded-2xl p-6 text-center">

            <h3 className="text-xl font-bold text-white">
              Need More Information?
            </h3>

            <p className="text-slate-300 mt-2">
              Contact our team for any questions regarding these terms.
            </p>

            <button   onClick={() => navigate("/contact")}
            className="mt-5 bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
              Contact Us
            </button>

          </div>


        </div>

      </div>

    </div>
  );
};

export default TermsOfService;