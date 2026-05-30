import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const authRoutes = ["/", "/signup"];
const Layout = ({ children }) => {
  const location = useLocation();
  console.log(location.pathname)
  if (authRoutes.some((r) => r === location.pathname)) return children;
  return (
    <div className='flex min-h-screen bg-background selection:bg-primary selection:text-white'>
      <div className="flex flex-col w-full relative">
        <main className='w-full min-h-screen overflow-x-hidden'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout