import React, { useMemo } from 'react'
import { useGetUser } from '../../hooks/AuthHook';
import { History, ListOrdered, ShoppingBag, UtensilsCrossed, UtensilsCrossedIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Statics } from "../../constants/DashboardStatics";
import { useGetAllOrders } from '../../hooks/adminHook';
import { motion } from 'framer-motion';


const Dashboard = () => {
  const { data } = useGetUser();
  const isAdmin = data?.user?.role === "admin";
  const navigate = useNavigate();
  const {data: orders, isLoading } = useGetAllOrders();

    const statics = useMemo(()=>{
          if(isLoading || !orders?.orders) return {};
          return orders.orders.reduce((countMap, currentItem) => {
              const status = currentItem.status.toLowerCase();
              countMap[status] = (countMap[status] || 0) + 1;
              return countMap;
            }, {});
      },[orders, isLoading]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="p-6 w-full max-w-[1400px] mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl w-full glass border border-white/10 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24 text-primary" />
          </div>
          <h1 className='font-black text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
            Welcome back, {data?.user?.name}!
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            {isAdmin ? "Your canteen operations are running smoothly. Here's your overview for today." : "Hungry? We've got fresh meals waiting for you. Explore the menu and satisfy your cravings!"}
          </p>
        </motion.div>

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          >
            {Statics.map((item, index) => (
              <StaticsCard
                key={item.heading}
                heading={item.heading}
                statics={statics[item.for.toLowerCase()] ?? 0}
                icon={item.icon}
                index={index}
              />
            ))}
          </motion.div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
          {(isAdmin ? cardDataAdmin : cardData).map((item, index) => (
            <Card key={item.label} data={item} index={index} />
          ))}
        </div>

        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 rounded-3xl p-10 justify-center flex-col glass border border-white/10 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
            <div className="p-4 bg-primary/10 rounded-full">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="font-black text-3xl">Ready to Order?</h2>
              <p className="text-text-muted text-lg">Browse our delicious menu and place your order in seconds.</p>
            </div>
            <button
              onClick={() => navigate("/menu")}
              className="cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 glow"
            >
              Explore Menu
            </button>
          </motion.div>
        )}
      </div>
    </div>

  )
}

export default Dashboard


const StaticsCard = ({ heading, statics, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="p-6 glass rounded-3xl w-full flex items-center border border-white/5 shadow-xl hover:border-primary/30 transition-all group"
    >
      <div className="flex flex-col">
        <p className="text-text-muted font-medium uppercase tracking-wider text-xs mb-1">{heading}</p>
        <span className="text-4xl font-black text-text">{statics}</span>
      </div>
      <div className={`ml-auto p-4 rounded-2xl bg-${icon.color}-500/10 group-hover:scale-110 transition-transform`}>
        <icon.icon className={`size-8 text-${icon.color}-500`} />
      </div>
    </motion.div>
  );
}


const cardDataAdmin = [
  {
    icon: <ListOrdered className="bg-blue-300/50 text-blue-600 rounded-full w-14 h-14 p-3" />,
    label: "Order Queue",
    description: "Manage live orders",
    link: "/order-queue"
  },
  {
    icon: <UtensilsCrossed className="bg-orange-300/50 text-orange-600 rounded-full w-14 h-14 p-3 " />,
    label: "Menu Management",
    description: "Add, edit or remove items",
    link: "/menu-managment"
  }
]

const cardData = [
  {
    icon: <UtensilsCrossedIcon className="bg-orange-300/50 text-orange-600 rounded-full w-14 h-14 p-3 " />,
    label: "Browse Menu",
    description: "View available items",
    link: "/menu"
  }, {
    icon: <History className="bg-blue-300/50 text-blue-600 rounded-full w-14 h-14 p-3" />,
    label: "Order History",
    description: "live Order Track",
    link: "/order-history"
  }
]


const Card = ({ data, index }) => {

  const { icon, label, description, link } = data;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + (0.1 * index) }}
      onClick={handleNavigate}
      className="flex rounded-3xl gap-6 items-center p-6 glass border border-white/5 cursor-pointer hover:shadow-2xl hover:border-primary/30 transition-all group"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="font-black text-xl group-hover:text-primary transition-colors">{label}</p>
        <p className="text-text-muted">{description}</p>
      </div>
    </motion.div>
  )
}