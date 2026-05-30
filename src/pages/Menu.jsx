import React, { useMemo, useState } from 'react';
import { useGetAllMenu } from '../hooks/MenuHook';
import {  Plus, ShoppingCart, Search, Filter } from 'lucide-react';
import BackHeader from '../components/layout/BackHeader';
import { useCartStore } from '../stores/cartStore';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="glass rounded-2xl shadow-2xl overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-surface/50"></div>
      <div className="p-6 space-y-4">
        <div className="h-8 bg-surface/50 rounded-lg w-3/4"></div>
        <div className="h-4 bg-surface/50 rounded-lg w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-surface/50 rounded-lg w-1/4"></div>
          <div className="h-6 bg-surface/50 rounded-lg w-1/4"></div>
        </div>
        <div className="h-4 bg-surface/50 rounded-lg w-full"></div>
        <div className="h-12 bg-surface/50 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: menu, isLoading } = useGetAllMenu({ search, category });

  const addToCart = useCartStore(state => state.addToCart);
  
  const totalCount = useCartStore((state) => state.getTotalCount());
  const handleAddToCart = (data)=>{
    toast.success(data.name + " Added to cart")
    addToCart(data);
  }


  const navigate = useNavigate();
  const RightComponent = useMemo(()=>{
    return <div onClick={() => navigate("/cart")}  className="cursor-pointer ml-auto relative"><ShoppingCart />
    { totalCount ? <span className="bg-orange-500 rounded-full text-xs font-semibold flex items-center justify-center absolute w-4 h-4 top-0 -translate-1/2  left-1/2">{totalCount}</span> : null}</div>
  },[totalCount, navigate])

  const categories = useMemo(() => {
    if (!menu?.data) return [];
    return [...new Set(menu.data.map(item => item.category))];
  }, [menu?.data]);

  return (
    <div className="min-h-screen pb-20">
      <BackHeader title="Delicious Menu" RightComponent={RightComponent} />

      <div className="p-6 max-w-[1400px] w-full mx-auto space-y-8">

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-2xl glass transition-all ${showFilters ? 'bg-primary/20 ring-2 ring-primary/50' : 'hover:bg-surface/50'}`}
          >
            <Filter className={`w-6 h-6 ${showFilters ? 'text-primary' : 'text-text'}`} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 p-1">
                <button
                  onClick={() => setCategory('')}
                  className={`px-6 py-2 rounded-xl glass transition-all ${category === '' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-surface/50'}`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2 rounded-xl glass transition-all capitalize ${category === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-surface/50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : menu?.data?.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {menu.data.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item._id}
                  className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 card-shadow"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-primary">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{item.name}</h2>
                      <p className="text-text-muted text-sm line-clamp-2 h-10">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-secondary">₹{item.price}</span>
                      {!item.isAvailable && (
                        <span className="text-xs font-bold text-red-400 uppercase">Out of Stock</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all duration-300
                        ${item.isAvailable
                          ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 glow-hover cursor-pointer"
                          : "bg-surface/50 text-text-muted cursor-not-allowed"}`}
                    >
                      {item.isAvailable ? (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Add to Cart
                        </>
                      ) : "Unavailable"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="p-6 glass rounded-full">
              <Search className="w-12 h-12 text-text-muted" />
            </div>
            <p className="text-xl font-semibold text-text-muted">No items found matching your criteria.</p>
            <button onClick={() => {setSearch(''); setCategory('');}} className="text-primary hover:underline font-bold">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
