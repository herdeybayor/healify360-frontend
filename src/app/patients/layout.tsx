import { MobileNav } from '@/components/custom/mobile-sidebar';
import SideBar from '@/components/custom/sidebar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import Image from 'next/image';

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='md:grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] divide-x-[1px] max-w-[1400px] mx-auto'>
      <div className='col-start-2 col-span-full md:border-l border-b flex items-center md:justify-end justify-between gap-4 md:py-5 md:px-14 p-4'>
        <div className='items-center gap-3 flex md:hidden'>
          <Image
            src='/logo.png'
            alt='logo'
            width={32}
            height={32}
            className=''
          />
          <h1 className='font-caveatSans text-2xl text-[#008037]'>Projectxx</h1>
        </div>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:flex items-center gap-4'>
          <Button className='bg-[#00AC30]'>Book a Session</Button>
          <div className='flex items-center gap-2'>
            <p className='p-4 rounded-full bg-[#E2E8F0]'>CN</p>
            <Select>
              <SelectTrigger className='p-0 outline-none border-none'></SelectTrigger>
              <SelectContent className='font-semibold text-[#334155]'>
                <p className='p-2'>My Settings</p>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='col-start-1 col-end-2 row-start-1 row-span-full'>
        <SideBar />
      </div>
      <div className='col-start-2 col-span-full md:px-11 md:py-8 p-4'>
        {children}
      </div>
    </div>
  );
}
