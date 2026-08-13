import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "Information We Collect",
            text: "We may collect personal information such as your name, email address, phone number, company details, service requirements, and career application details submitted through our website forms."
        },
        {
            title: "How We Use Your Information",
            text: "The information collected is used to respond to enquiries, provide quotations, process service requests, manage career applications, and improve our website experience."
        },
        {
            title: "Contact & Quote Information",
            text: "Information submitted through contact forms, quote requests, or service enquiries is used only for business communication and providing requested assistance."
        },
        {
            title: "Career Application Data",
            text: "Candidate information submitted through career forms may be used for recruitment purposes and evaluating suitable employment opportunities."
        },
        {
            title: "Data Protection",
            text: "We implement appropriate security measures to protect your personal information from unauthorized access, misuse, alteration, or disclosure."
        },
        {
            title: "Cookies & Website Analytics",
            text: "Our website may use cookies and analytics tools to improve performance, understand user behavior, and enhance the overall user experience."
        },
        {
            title: "Third Party Services",
            text: "We may use trusted third-party services for communication, analytics, hosting, or other business operations. These services may have their own privacy policies."
        },
        {
            title: "Policy Updates",
            text: "We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the updated information."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-20">

            {/* Header */}
            <section className="bg-brand-navy py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Privacy Policy
                </h1>

                <p className="text-slate-300 mt-4">
                    Your privacy and data protection are important to us
                </p>
            </section>


            <div className="max-w-5xl mx-auto px-5 py-12">

                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">


                    {/* Title Section */}
                    <div className="flex justify-between items-center mb-8 border-b pb-5">

                        <h2 className="text-2xl font-bold text-brand-navy">
                            Privacy Information
                        </h2>

                        <span className="text-sm text-slate-500">
                            Last Updated: 2026
                        </span>

                    </div>


                    {/* Content Cards */}
                    <div className="space-y-6">

                        {sections.map((item, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-2xl bg-slate-50 border hover:border-brand-red transition duration-300"
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


                    {/* Contact CTA */}


                    <div
                        className="mt-10 bg-brand-navy rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl  transition-all duration-300"
                    >

                        <h3 className="text-xl md:text-2xl font-bold text-white">
                            Have Questions About Privacy?
                        </h3>

                        <p className="text-slate-300 mt-3 max-w-xl mx-auto">
                            Contact our team if you have any questions regarding your personal
                            information or data protection.
                        </p>


                        <Link
                            to="/contact"
                            className="
      inline-block
      mt-6
      bg-brand-red
      text-white
      px-8
      py-3
      rounded-xl
      font-semibold
      shadow-md
      hover:bg-red-700
      hover:scale-105
      transition-all
      duration-300
    "
                        >
                            Contact Us
                        </Link>

                    </div>


                </div>

            </div>

        </div>
    );
};

export default PrivacyPolicy;