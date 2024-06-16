import DashboardIcon from '@/components/icons/DashboardIcon';
import ExploreIcon from '@/components/icons/ExploreIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import VideoCallIcon from '@/components/icons/VideoCallIcon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

export default function Page() {
  return (
    <div>
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
      <div className='md:mt-6 md:text-2xl text-xl mt-3 font-semibold'>
        <h2>Quick Links</h2>
        <div className='md:mt-6 mt-4'>
          <div className='flex gap-8 overflow overflow-y-auto'>
            {routes.map((route, index) => (
              <div
                key={index}
                className='flex flex-col gap-4 mb-3 md:mb-0 p-5 rounded-lg min-w-[210px] border'>
                <div className=''>{route.icon}</div>
                <p className='text-base'>{route.label}</p>
              </div>
            ))}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
