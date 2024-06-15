import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
            className='self-end hidden md:block'
          />
          <div className='flex flex-col md:items-center items-start self-center'>
            <h1 className='lg:text-4xl sm:text-xl z-30 md:text-center font-petchSans break-words'>
              {'Schedule Call with a\nprofessional doctors\ntoday'}
            </h1>
            <Button className='md:mt-3 mt-2 md:px-8 bg-[#334155]'>
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
    </div>
  );
}
