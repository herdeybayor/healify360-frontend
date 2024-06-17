import Logo from '@/components/custom/logo';
import MenuIcon from '@/components/icons/MenuIcon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';

const routes = ['About Us', 'Services', 'How It Works', 'Contact Us'];

export default function Home() {
  return (
    <main className=''>
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
    </main>
  );
}
