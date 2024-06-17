import Logo from '@/components/custom/logo';
import MenuIcon from '@/components/icons/MenuIcon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const routes = ['About Us', 'Services', 'How It Works', 'Contact Us'];

export default function Home() {
  return (
    <div className=''>
      <header className='max-w-[1400px] items-center mx-auto py-5 flex justify-between px-4'>
        <Logo />
        <nav>
          <ul className='items-center gap-8 lg:flex hidden'>
            {routes.map((item, index) => (
              <li key={index} className='text-[#64748B]'>
                <Link href={`#`}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href='/login'
          className='text-sm font-[500] border py-2 px-4 rounded-md hidden lg:block'>
          Login
        </Link>
        <div className='lg:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <ul className='space-y-3 mt-8'>
                {routes.map((item, index) => {
                  return (
                    <SheetTrigger asChild key={index}>
                      <Link href='#' className='block'>
                        <li
                          className={`flex items-center gap-3 py-2 px-3 rounded-lg`}>
                          {item}
                        </li>
                      </Link>
                    </SheetTrigger>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <div className='max-w-[1100px] mx-auto md:mt-16 mt-8 text-center px-4'>
          <Button
            variant='outline'
            className='text-sm mx-auto text-[#00AC30] font-semibold space-x-1'>
            Connect with a Doctor <ArrowRight />
          </Button>
          <h1 className='lg:text-5xl text-lg md:text-3xl font-semibold mt-4'>
            {
              'Revolutionising healthcare through seamless \ndoctor-patient connections'
            }
          </h1>
          <p className='text-[#475467]'>
            Healify 360 is on a mission to transform healthcare by connecting
            patients with certified doctors from partner hospitals. Experience
            convenient and streamlined healthcare like never before.
          </p>
        </div>
      </main>
    </div>
  );
}
