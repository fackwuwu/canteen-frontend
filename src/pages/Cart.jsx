import React, { useState } from 'react'
import BackHeader from '../components/layout/BackHeader';
import { useCartStore } from '../stores/cartStore';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmCheckoutModel from '../components/modals/ConfirmCheckoutModel';
import { AnimatePresence, motion } from 'framer-motion';
import TokenCard from '../components/cart/TokenCard';

const Cart = () => {
  const CartItems = useCartStore(state => state.cartItems);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  
  const navigate = useNavigate();
  const CartIsEmpty = CartItems.length===0;
  const length = CartIsEmpty? "" : " ("+CartItems.length+")";
  const [ showConfirmModel , setShowConfirmModel ] = useState(false);
  const [ tokenNumber, setTokenNumber ] = useState(null);

  const handleCartClose = (data)=>{
    setShowConfirmModel(false);
    if(!data?.data?.tokenNumber) return;
    clearCart();
    setTokenNumber(data.data.tokenNumber)
  }

  if(tokenNumber)
    return <TokenCard data={tokenNumber} />

  return (
    <div className="min-h-screen pb-40">
        <BackHeader title={"My Cart"+length} />
        <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {CartItems.map((item, index) => (
              <CartItem data={item} key={item._id} index={index} />
            ))}
          </AnimatePresence>

          {CartIsEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center space-y-6 py-20 text-center"
            >
              <div className="p-8 glass rounded-full relative">
                <ShoppingBag className="w-24 h-24 text-text-muted opacity-20" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ShoppingBag className="w-16 h-16 text-primary" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Your cart is empty</h2>
                <p className="text-text-muted text-lg">Looks like you haven't added anything yet.</p>
              </div>
              <button
                onClick={() => navigate("/menu")}
                className="cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 glow"
              >
                Browse Our Menu
              </button>
            </motion.div>
          )}
        </div>

        {!CartIsEmpty && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-6 z-40 backdrop-blur-2xl"
          >
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <p className="text-text-muted font-bold uppercase tracking-wider">Total Amount</p>
                <span className="text-4xl font-black text-secondary">₹{getTotalPrice()}</span>
              </div>
              <button
                onClick={()=> setShowConfirmModel(true)}
                className="group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 glow"
              >
                Checkout Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

      <AnimatePresence>
        {showConfirmModel && (
          <ConfirmCheckoutModel onClose={handleCartClose}/>
        )}
      </AnimatePresence>
    </div>
  )
}

const CartItem = ({data, index})=>{
  const totalPrice = data.price * data.quantity;
  
  const increaseQty = useCartStore(state => state.increaseQty);
  const decreaseQty = useCartStore(state => state.decreaseQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-white/5 shadow-xl hover:border-primary/20 transition-all group"
    >
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
        <img className="rounded-2xl h-full w-full object-cover shadow-lg" src={data.image} alt={data.name} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex flex-col w-full space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-black text-2xl tracking-tight group-hover:text-primary transition-colors">{data.name}</h1>
            <span className="text-secondary font-black text-xl">₹{data.price}</span>
          </div>
          <button
            onClick={() => removeFromCart(data._id)}
            className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className='flex items-center glass rounded-xl p-1 border border-white/10'>
            <button
              onClick={() => decreaseQty(data._id)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text/70"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-black text-lg">{data.quantity}</span>
            <button
              onClick={() => increaseQty(data._id)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text/70"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1 opacity-50">Subtotal</p>
            <span className="text-3xl font-black">₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default Cart