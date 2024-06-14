'use client';

import Link from 'next/link';
import DashboardIcon from '../icons/DashboardIcon';
import ExploreIcon from '../icons/ExploreIcon';
import MessageIcon from '../icons/MessageIcon';
import VideoCallIcon from '../icons/VideoCallIcon';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';

const routes = [
  {
    label: 'Dashboard',
    url: '/patients',
    icon: <DashboardIcon />,
  },
  {
    label: 'Explore',
    url: '/patients/explore',
    icon: <ExploreIcon />,
  },
  {
    label: 'Book Session',
    url: '/patients/session',
    icon: <VideoCallIcon />,
  },
  {
    label: 'Message',
    url: '/patients/message',
    icon: <MessageIcon />,
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(routes[0]);

  const isActive = function (href: string) {
    if (pathname === href) return true;
    else return false;
  };

  return (
    <div className='p-4'>
      <div className='mt-8 mb-6  items-center gap-3 hidden md:flex'>
        <Image src='/logo.png' alt='logo' width={32} height={32} className='' />
        <h1 className='font-caveatSans text-2xl text-[#008037]'>Projectxx</h1>
      </div>

      <ul className='space-y-3 hidden md:block'>
        {routes.map((item, index) => {
          return (
            <li
              key={index}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg  ${
                isActive(item.url) ? 'bg-[#00AC30] text-white' : 'text-black'
              }`}>
              {item.icon}
              <Link href={item.url}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
      <Select>
        <SelectTrigger className='p-0 outline-none px-2'>
          <SelectValue
            onChange={() => {
              console.log('changed');
            }}>
            <div className='flex items-center gap-2 text-[#64748B]'>
              {currentPath.icon}
              {currentPath.label}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='font-semibold w-full text-[#334155]'>
          {routes.map((item, index) => {
            return (
              <SelectItem key={index} value={item.url}>
                <div className='flex items-center gap-2 text-[#64748B]'>
                  {item.icon}
                  {item.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
