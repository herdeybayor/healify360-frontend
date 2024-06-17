'use client';
import BookButton from '@/components/custom/book-button';
import BriefCaseIcon from '@/components/icons/BriefCaseIcon';
import ExploreIcon from '@/components/icons/ExploreIcon';
import GraduationHatIcon from '@/components/icons/GraduationHatIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import VideoCallIcon from '@/components/icons/VideoCallIcon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const routes = [
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

export default function PatientDashboard() {
  const [date, setDate] = useState<undefined | DateRange>(undefined);

  return (
    <div className=''>
      <h1 className='md:text-2xl font-semibold'>Welcome Sheriff 🔥,</h1>
      <div>
        <div className='mt-6 bg-[#EFFFF4] rounded-lg grid grid-cols-[1fr_auto] min-h-44 md:grid-cols-[30%_1fr_30%] relative pt-3 md:px-0 px-3'>
          <Image
            src='/medical_equipment.svg'
            alt=''
            width={266}
            height={240}
            className='self-end absolute md:relative top-0 bottom-0 h-full -left-10 md:left-0'
          />
          <div className='flex flex-col md:items-center items-start self-center'>
            <h1 className='lg:text-4xl sm:text-xl z-30 md:text-center font-petchSans break-words max-w-56 text-center self-center md:max-w-none'>
              {'Schedule Call with a\nprofessional doctors\ntoday'}
            </h1>
            <Button className='md:mt-3 z-40 self-center mt-2 md:px-8 bg-[#334155]'>
              Explore
            </Button>
          </div>
          <Image
            src='/medical_supplies.svg'
            alt=''
            width={200}
            height={200}
            className='absolute z-20 md:right-0 lg:-top-5 top-0 bottom-0 h-full lg:h-auto -right-10'
          />
        </div>
      </div>
      <div className='md:mt-9 md:text-2xl text-xl mt-3 font-semibold'>
        <h2>Quick Links</h2>
        <div className='lg:flex md:mt-6 gap-x-8 mt-3'>
          <div className='flex-1'>
            <div className='flex gap-5 md:gap-8 overflow overflow-y-auto'>
              {routes.map((route, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-4 mb-3 md:mb-0 p-5 rounded-lg border w-full'>
                  <div className=''>{route.icon}</div>
                  <p className='text-base'>{route.label}</p>
                </div>
              ))}
            </div>
            <div className='mt-3 md:mt-5'>
              <h2>Top Rated Doctors</h2>
              <div className='flex flex-wrap md:mt-6 mt-3 gap-4'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className='border p-[14px] rounded-lg'>
                    <Image
                      src='/doctor.png'
                      alt=''
                      width={307}
                      height={235}
                      className='rounded-lg w-full'
                    />
                    <div className='space-y-2 mt-2'>
                      <p>Yinka Quadri</p>
                      <div className='flex items-center gap-2'>
                        <BriefCaseIcon className='text-base' />
                        <p className='font-normal text-sm'>Cardiology</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MessageIcon className='text-base' />
                        <p className='font-normal text-sm'>
                          62 sessions (33 reviews)
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <GraduationHatIcon className='text-base' />
                        <p className='font-normal text-sm'>
                          5 years experience
                        </p>
                      </div>
                      <BookButton date={date} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=''>
            <div className='w-fit rounded-md border hidden lg:block'>
              <Calendar
                mode='range'
                selected={date}
                onSelect={(date) => setDate(date)}
                className='mx-auto'
              />
              <div className='px-5 pb-6'>
                <Button className='w-full'>Book a Session</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
