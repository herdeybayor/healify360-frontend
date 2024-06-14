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

  console.log(pathname);
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
        <SelectTrigger className='p-0 outline-none border-none'>
          <SelectValue>
            <p className='p-4 rounded-full bg-[#E2E8F0]'>CN</p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='font-semibold text-[#334155]'>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
