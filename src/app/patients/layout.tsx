import SideBar from '@/components/custom/sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  );
}
