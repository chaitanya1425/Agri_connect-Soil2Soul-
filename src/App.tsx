import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Landmark, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  Package,
  Wallet,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import Marketplace from './components/Marketplace';
import Community from './components/Community';
import Dashboard from './components/Dashboard';
import Workshops from './components/Workshops';
import { Schemes, Banking } from './components/AgriServices';

// Pages (to be created)
const Home = () => (
  <div className="bg-white">
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover opacity-20"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold mb-6">
            <ShieldCheck size={16} />
            Verified Agriculture Ecosystem
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Empowering <span className="text-emerald-600 italic">Agriculture</span> Digitally.
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
            AgriConnect is the ultimate platform connecting farmers directly to customers, experts, and essential services. Join the revolution today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/auth" className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-emerald-200 flex items-center gap-2">
              Get Started <ChevronRight size={20} />
            </Link>
            <Link to="/marketplace" className="px-10 py-5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-2xl font-bold transition-all">
              Browse Market
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-gray-900">50k+</p>
              <p className="text-sm text-gray-500">Active Farmers</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-3xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">Agri Colleges</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-3xl font-bold text-gray-900">₹10Cr+</p>
              <p className="text-sm text-gray-500">Trade Volume</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80" 
              className="w-full aspect-[4/5] object-cover"
              alt="Farmer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 z-20 max-w-xs">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Market Price</p>
                <p className="text-lg font-bold text-gray-900">Wheat: +12.5%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Real-time market trends helping farmers get better prices.</p>
          </div>
          <div className="absolute -top-10 -right-10 bg-emerald-600 p-6 rounded-3xl shadow-xl z-20 text-white max-w-xs">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-white/70 font-bold uppercase">Community</p>
                <p className="text-lg font-bold">1,200+ Experts</p>
              </div>
            </div>
            <p className="text-sm text-white/80">Connect with scientists and experts from top colleges.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Ecosystem Section */}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">A Complete Ecosystem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">AgriConnect brings everyone together on one unified platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "For Farmers", desc: "Sell directly to customers, access loans, and get expert advice.", icon: Users, color: "bg-emerald-50 text-emerald-600" },
            { title: "For Customers", desc: "Buy fresh, organic produce directly from verified farms.", icon: ShoppingBag, color: "bg-orange-50 text-orange-600" },
            { title: "For Colleges", desc: "Share research, conduct workshops, and train the next generation.", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
            { title: "For Agencies", desc: "Manage logistics, supply seeds, and provide essential tools.", icon: Package, color: "bg-purple-50 text-purple-600" }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">{item.desc}</p>
              <Link to="/auth" className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all">
                Learn More <ChevronRight size={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to join the future of farming?</h2>
            <p className="text-xl text-emerald-100 opacity-80 mb-12 max-w-2xl mx-auto">Create your account today and start connecting with the agriculture community.</p>
            <Link to="/auth" className="px-12 py-6 bg-white text-emerald-900 rounded-full font-bold text-xl hover:bg-emerald-50 transition-all shadow-2xl">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Workshops', path: '/workshops', icon: BookOpen },
    { name: 'Schemes', path: '/schemes', icon: ShieldCheck },
    { name: 'Banking', path: '/banking', icon: Landmark },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">AgriConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all flex items-center gap-2"
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Bell size={20} />
                </button>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-all">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                    {profile?.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{profile?.displayName || 'Dashboard'}</span>
                </Link>
                <button 
                  onClick={() => { signOut(); navigate('/'); }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all shadow-lg shadow-emerald-200">
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={20} />
                    {link.name}
                  </div>
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium bg-emerald-600 text-white rounded-2xl text-center mt-4"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return user ? <>{children}</> : null;
};

const AuthPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('customer');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn(role);
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const roles: { id: UserRole; title: string; desc: string; icon: any }[] = [
    { id: 'farmer', title: 'Farmer', desc: 'Sell produce & get advice', icon: Users },
    { id: 'customer', title: 'Customer', desc: 'Buy fresh organic food', icon: ShoppingBag },
    { id: 'college', title: 'College', desc: 'Share research & training', icon: BookOpen },
    { id: 'agency', title: 'Agency', desc: 'Supply tools & logistics', icon: Package },
    { id: 'krushi_kendra', title: 'Krushi Kendra', desc: 'Local agri-input center', icon: Landmark },
    { id: 'seed_company', title: 'Seed Company', desc: 'High-quality seeds', icon: ShieldCheck },
    { id: 'bank', title: 'Bank', desc: 'Agri-loans & finance', icon: Wallet },
    { id: 'scheme_provider', title: 'Govt. Provider', desc: 'Subsidies & schemes', icon: FileText },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50 py-20">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join AgriConnect</h2>
          <p className="text-xl text-gray-600">Select your role to get started with the ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`p-8 rounded-[2.5rem] border-2 transition-all text-left flex flex-col h-full ${
                role === r.id 
                ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-100' 
                : 'border-white bg-white hover:border-emerald-200 shadow-sm'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                role === r.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <r.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{r.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
            </button>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <button 
            onClick={handleSignIn}
            disabled={isSigningIn}
            className={`w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-bold text-lg transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 ${isSigningIn ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSigningIn ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <UserIcon size={24} />
            )}
            {isSigningIn ? 'Connecting...' : 'Continue with Google'}
          </button>
          <p className="text-center text-sm text-gray-400 mt-6">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/banking" element={<Banking />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
