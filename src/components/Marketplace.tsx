import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { Product } from '../types';
import { ShoppingCart, Search, Filter, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = category === 'all' 
          ? query(collection(db, 'products'), limit(20))
          : query(collection(db, 'products'), where('category', '==', category), limit(20));
        
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        // Add some mock data if empty for demo
        if (productsData.length === 0) {
          const mockProducts: Product[] = [
            { id: '1', name: 'Organic Wheat', price: 2400, category: 'produce', stock: 500, unit: 'Quintal', sellerId: 's1', sellerName: 'Farmer Ramesh', description: 'High quality organic wheat directly from farm.', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80', createdAt: new Date() },
            { id: '2', name: 'Premium Basmati Rice', price: 1800, category: 'produce', stock: 200, unit: 'Quintal', sellerId: 's2', sellerName: 'Farmer Suresh', description: 'Long grain aromatic basmati rice.', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80', createdAt: new Date() },
            { id: '3', name: 'Hybrid Tomato Seeds', price: 450, category: 'seeds', stock: 100, unit: 'Packet', sellerId: 'c1', sellerName: 'SeedCo India', description: 'High yield tomato seeds.', imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80', createdAt: new Date() },
            { id: '4', name: 'NPK Fertilizer', price: 1200, category: 'fertilizers', stock: 50, unit: 'Bag', sellerId: 'c2', sellerName: 'AgroChem', description: 'Balanced NPK fertilizer for all crops.', imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80', createdAt: new Date() },
            { id: '5', name: 'Modern Tractor', price: 850000, category: 'machinery', stock: 5, unit: 'Unit', sellerId: 'c3', sellerName: 'Mahindra Tools', description: 'Powerful tractor for large scale farming.', imageUrl: 'https://images.unsplash.com/photo-1594488651083-29118fca4a62?auto=format&fit=crop&q=80', createdAt: new Date() },
          ];
          setProducts(mockProducts);
        } else {
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-emerald-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Agri Marketplace</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Buy fresh produce, seeds, fertilizers, and tools directly from verified sellers.</p>
          
          <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for crops, seeds, or tools..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all">
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {['all', 'produce', 'seeds', 'fertilizers', 'tools', 'machinery'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all shadow-sm ${
                category === cat 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100"></div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-700">
                      {product.sellerName?.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-400">By {product.sellerName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-gray-400 text-sm ml-1">/ {product.unit}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => alert(`${product.name} added to cart!`)}
                        className="p-3 bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button 
                        onClick={() => alert(`Proceeding to buy ${product.name}...`)}
                        className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-100"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
