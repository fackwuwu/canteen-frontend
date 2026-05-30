import React from 'react'
import { useGetUser } from '../../hooks/AuthHook'
import { ShieldUser, UtensilsCrossed } from 'lucide-react';
import ProfileDropDown from '../common/ProfileDropDown';

const Header = () => {
  const { data } = useGetUser();
  const isAdmin = data?.user?.role === "admin";

  return (
    <div className="sticky top-0 z-50 glass border-b border-white/10 shadow-2xl backdrop-blur-2xl px-6">
      <div className="flex items-center justify-between max-w-[1400px] w-full mx-auto h-20">
        {isAdmin ?
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <ShieldUser className="text-primary w-8 h-8" />
            </div>
            <h2 className="font-black text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">
              Admin Console
            </h2>
          </div>
          :
          <div className="flex items-center gap-3 group">
            <div className="p-3 bg-secondary/10 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
              <UtensilsCrossed className="text-secondary w-8 h-8" />
            </div>
            <h1 className="font-black text-3xl tracking-tighter bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              FOODIE
            </h1>
          </div>
        }
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default Header