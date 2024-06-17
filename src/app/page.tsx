import Logo from '@/components/custom/logo';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <header className='max-w-[1400px] items-center mx-auto py-5 flex justify-between'>
        <Logo />
        <nav>
          <ul className='items-center gap-8 lg:flex hidden'>
            {['About Us', 'Services', 'How It Works', 'Contact Us'].map(
              (item, index) => (
                <li key={index} className='text-[#64748B]'>
                  <Link href={`#`}>{item}</Link>
                </li>
              )
            )}
          </ul>
        </nav>
        <Link
          href='/login'
          className='text-sm font-[500] border py-2 px-4 rounded-md'>
          Login
        </Link>
      </header>
    </main>
  );
}
