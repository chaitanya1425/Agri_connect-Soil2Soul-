import React from 'react';
import { Play, FileText, Calendar, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Workshops: React.FC = () => {
  const workshops = [
    {
      title: "Modern Irrigation Techniques",
      college: "MPKV Agriculture College",
      date: "March 20, 2026",
      type: "Video Course",
      img: "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?auto=format&fit=crop&q=80"
    },
    {
      title: "Organic Pest Control",
      college: "PDKV Akola",
      date: "March 25, 2026",
      type: "PDF Guide",
      img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80"
    },
    {
      title: "Soil Health Management",
      college: "IARI New Delhi",
      date: "April 05, 2026",
      type: "Live Workshop",
      img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Workshops & Training</h1>
          <p className="text-gray-500 mt-2">Learn modern farming techniques from top agriculture experts and colleges.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((ws, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              onClick={() => alert(`Opening ${ws.title}...`)}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
            >
              <div className="relative h-56">
                <img src={ws.img} alt={ws.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  {ws.type === "Video Course" && <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"><Play fill="white" size={24} /></div>}
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {ws.type}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={16} />
                  {ws.date}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">{ws.title}</h3>
                <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-xs">
                    {ws.college.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{ws.college}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-emerald-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Are you an Agriculture Expert?</h2>
            <p className="text-emerald-100 opacity-80 text-lg">Join our ecosystem as a College or Agency to share your knowledge and help millions of farmers across the country.</p>
          </div>
          <button 
            onClick={() => alert("Expert registration form will open soon. Please keep your credentials ready.")}
            className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-950/20 flex items-center gap-3"
          >
            Register as Expert <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
