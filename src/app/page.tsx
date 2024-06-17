import Logo from '@/components/custom/logo';
import { ModeToggle } from '@/components/custom/mode-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <header>
        <Logo />
        <nav></nav>
      </header>
    </main>
  );
}
