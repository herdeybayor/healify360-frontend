import SideBar from '@/components/custom/sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen md:grid grid-cols-[auto_1fr]'>
      <SideBar />
      {children}
    </div>
  );
}
