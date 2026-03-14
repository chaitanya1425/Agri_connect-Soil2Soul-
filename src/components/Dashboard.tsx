import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Calendar, 
  Plus, 
  ChevronRight, 
  MapPin, 
  BarChart3,
  MessageSquare,
  Award,
  FileText,
  Wallet,
  ShoppingBag,
  ShieldCheck,
  Landmark,
  LayoutDashboard,
  User as UserIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'customer';

  const renderFarmerDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sales', value: '₹1,24,500', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Orders', value: '12', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Followers', value: '842', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Market Trend', value: '+12%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Sales Analytics</h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-medium outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
          <div className="space-y-6">
            {[
              { name: 'Rahul Sharma', items: '5kg Wheat', price: '₹120', status: 'Pending' },
              { name: 'Priya Patel', items: '2kg Tomato', price: '₹80', status: 'Shipped' },
              { name: 'Amit Kumar', items: '10kg Rice', price: '₹450', status: 'Delivered' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {order.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{order.name}</p>
                    <p className="text-xs text-gray-500">{order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{order.price}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'text-emerald-600' : 
                    order.status === 'Shipped' ? 'text-blue-600' : 'text-orange-600'
                  }`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-emerald-600 font-bold text-sm border border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-all">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );

  const renderCustomerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Welcome Card */}
          <div className="bg-emerald-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Hello, {profile?.displayName || 'Friend'}!</h2>
              <p className="text-emerald-100 opacity-80 mb-8">You have 3 active orders arriving soon.</p>
              <button className="px-8 py-3 bg-white text-emerald-900 rounded-full font-bold hover:bg-emerald-50 transition-all">
                Track Orders
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          </div>

          {/* Favorite Farmers */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Your Family Farmers</h3>
              <button className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                Explore More <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Farmer Ramesh', location: 'Nashik, MH', crops: 'Grapes, Wheat', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef' },
                { name: 'Farmer Suresh', location: 'Nagpur, MH', crops: 'Oranges, Rice', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2' },
              ].map((farmer, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                  <img src={farmer.img} className="w-20 h-20 rounded-2xl object-cover" alt={farmer.name} referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-lg">{farmer.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={12} /> {farmer.location}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-2">Grows: {farmer.crops}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Market', icon: ShoppingBag, color: 'bg-orange-50 text-orange-600' },
                { label: 'Forum', icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
                { label: 'Schemes', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
                { label: 'Banks', icon: Landmark, color: 'bg-purple-50 text-purple-600' },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <action.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-600">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">Earn Badges</h3>
            <p className="text-sm text-emerald-700 mb-6">Support 5 local farmers to earn the 'Eco-Warrior' badge!</p>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700"><Award size={20} /></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400"><Award size={20} /></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400"><Award size={20} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericDashboard = () => (
    <div className="space-y-8">
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4 capitalize">{role} Portal</h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          Welcome to the specialized portal for {role}s. Here you can manage your operations, connect with the ecosystem, and access tailored tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Manage Profile', icon: UserIcon, color: 'bg-blue-50 text-blue-600' },
            { label: 'Analytics', icon: BarChart3, color: 'bg-purple-50 text-purple-600' },
            { label: 'Settings', icon: Package, color: 'bg-gray-50 text-gray-600' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => alert(`Opening ${item.label}...`)}
              className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-md transition-all flex flex-col items-center gap-4"
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center`}>
                <item.icon size={24} />
              </div>
              <span className="font-bold text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (role) {
      case 'farmer':
        return renderFarmerDashboard();
      case 'customer':
        return renderCustomerDashboard();
      default:
        return renderGenericDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 capitalize">{role} Dashboard</h1>
            <p className="text-gray-500 mt-2">Welcome back to your AgriConnect portal.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => alert("Generating latest reports...")}
              className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <FileText size={20} />
              Reports
            </button>
            <button 
              onClick={() => alert("Opening new action menu...")}
              className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
            >
              <Plus size={20} />
              New Action
            </button>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
