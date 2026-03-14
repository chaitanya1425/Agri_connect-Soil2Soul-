import React from 'react';
import { ShieldCheck, Landmark, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const Schemes: React.FC = () => {
  const schemes = [
    { title: "PM-Kisan Samman Nidhi", desc: "Direct income support of ₹6,000 per year to all landholding farmer families.", subsidy: "₹6,000/year", link: "#" },
    { title: "Pradhan Mantri Fasal Bima Yojana", desc: "Crop insurance scheme for farmers against natural calamities.", subsidy: "Insurance Cover", link: "#" },
    { title: "Solar Pump Subsidy", desc: "90% subsidy on solar water pumps for irrigation.", subsidy: "90% Subsidy", link: "#" },
    { title: "Organic Farming Promotion", desc: "Financial assistance for cluster formation and certification.", subsidy: "₹50,000/ha", link: "#" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Government Schemes</h1>
          <p className="text-gray-500 mt-2">Explore subsidies, insurance, and benefits provided by the government.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schemes.map((scheme, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} 
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{scheme.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{scheme.desc}</p>
                <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold mb-8">
                  Benefit: {scheme.subsidy}
                </div>
              </div>
              <button 
                onClick={() => alert(`Application submitted for ${scheme.title}! Our team will contact you soon.`)}
                className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all"
              >
                Apply Now <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Banking: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Agri Finance & Banking</h1>
          <p className="text-gray-500 mt-2">Access loans, credit facilities, and financial advice from local banks.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-emerald-900 text-white p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Kisan Credit Card (KCC)</h2>
                <p className="text-emerald-100 opacity-80 mb-8">Get instant credit for your farming needs at lowest interest rates. Apply online through AgriConnect.</p>
                <button 
                  onClick={() => alert("KCC Application portal opened. Please fill in your land details.")}
                  className="px-8 py-4 bg-white text-emerald-900 rounded-full font-bold hover:bg-emerald-50 transition-all"
                >
                  Apply for KCC
                </button>
              </div>
              <div className="w-48 h-48 bg-emerald-800 rounded-full flex items-center justify-center">
                <Landmark size={80} className="text-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Tractor Loan", rate: "8.5%", bank: "SBI Agri" },
                { title: "Crop Loan", rate: "7.0%", bank: "NABARD" },
                { title: "Warehouse Loan", rate: "9.2%", bank: "HDFC Bank" },
                { title: "Irrigation Loan", rate: "7.5%", bank: "Bank of Baroda" },
              ].map((loan, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{loan.title}</h4>
                    <p className="text-sm text-gray-400">{loan.bank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-600 font-bold text-xl">{loan.rate}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Interest p.a.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info size={20} className="text-blue-500" />
              Financial Tips
            </h3>
            <div className="space-y-6">
              {[
                "Maintain a good credit score for lower interest rates.",
                "Always repay KCC loans within 12 months to get interest subvention.",
                "Keep your land records updated for faster loan processing.",
                "Consider crop insurance to protect your investment."
              ].map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">{i+1}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
