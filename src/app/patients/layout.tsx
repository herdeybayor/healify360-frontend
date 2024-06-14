import SideBar from '@/components/custom/sidebar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='md:grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] divide-x-[1px]'>
      <div className='col-start-2 col-span-full md:border-l border-b flex items-center md:justify-end gap-4 py-5 px-14'>
        <Button className='bg-[#00AC30]'>Book a Session</Button>
        <div className='flex items-center gap-2'>
          <p className='p-4 rounded-full bg-[#E2E8F0]'>CN</p>
          <Select>
            <SelectTrigger className='p-0 outline-none border-none'>
              <SelectValue placeholder='' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='col-start-1 col-end-2 row-start-1 row-span-full'>
        <SideBar />
      </div>
      <div className='col-start-2 col-span-full'>{children}</div>
    </div>
  );
}
