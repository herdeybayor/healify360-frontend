import Image from 'next/image';
import { type ReactNode } from 'react';

function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='lg:grid grid-cols-2 h-screen'>
      <div className='p-5 flex flex-col items-center mt-14'>
        <div className='max-w-md'>
          <h1 className='font-semibold text-2xl'>Let&apos;s get you started</h1>
          <p className='mt-4'>
            Onboarding a patient involves collecting information to ensure their
            medical care is personalized and effective.
          </p>
          <div className='md:mt-8 mt-4'>{children}</div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Image
          alt=''
          src='/onboarding-desktop-bg.png'
          width={690}
          height={990}
          className=''
        />
      </div>
    </div>
  );
}

export default OnboardingLayout;
