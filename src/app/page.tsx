import CustomCarousel from '@/components/custom/CustomCarousel';
import Logo from '@/components/custom/logo';
import BellIcon from '@/components/icons/BellIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import MessageChatCodeIcon from '@/components/icons/MessageChatCodeIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight, FormInput, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const routes = ['About Us', 'Services', 'How It Works', 'Contact Us'];

export default function Home() {
  return (
    <div>
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
          <p className='text-[#475467] mt-4'>
            Healify 360 is on a mission to transform healthcare by connecting
            patients with certified doctors from partner hospitals. Experience
            convenient and streamlined healthcare like never before.
          </p>
          <Button className='mt-3 w-full lg:w-auto'>Sign Up</Button>
          <div className='max-w-[760px] md:mt-8 mt-5 mx-auto relative'>
            <Image
              src='/patient-dashboard.png'
              width={760}
              height={483}
              className='aspect-video'
              alt=''
            />
          </div>
        </div>
        <div className='max-w-[1400px] mx-auto py-4 px-4'>
          <h3 className='font-semibold text-base text-[#00AC30]'>Features</h3>
          <h1 className='lg:text-5xl text-lg md:text-3xl font-semibold mt-4 max-w-[760px]'>
            Transforming Healthcare with Innovative Solutions
          </h1>
          <p className='max-w-[760px] pt-5 text-[#475467]'>
            Healify 360 is a cutting-edge platform that simplifies healthcare by
            connecting patients with certified doctors, enabling easy
            appointment booking, secure patient-doctor communication, and access
            to a network of partner hospitals.
          </p>
        </div>
        <div className='md:mt-12 mt-6 relative'>
          <div className='max-w-[1400px] mx-auto md:grid grid-cols-2 items-center px-4'>
            <div>
              <div className='py-4 border-l-4 border-[#00AC30] md:pl-6 pl-4'>
                <h4 className='text-xl font-semibold'>Convenient</h4>
                <p className='text-base text-[#475467]'>
                  Easily book appointments with certified doctors from partner
                  hospitals, anytime and anywhere.
                </p>
              </div>
              <div className='py-4 border-l-4 md:pl-6 pl-4'>
                <h4 className='text-xl font-semibold'>Secure</h4>
                <p className='text-base text-[#475467]'>
                  Communicate with doctors securely and privately through our
                  encrypted messaging system.
                </p>
              </div>
              <div className='py-4 border-l-4 md:pl-6 pl-4'>
                <h4 className='text-xl font-semibold'>Efficient</h4>
                <p className='text-base text-[#475467]'>
                  Streamline the healthcare process and save time with our
                  user-friendly platform.
                </p>
              </div>
            </div>
            <div>
              <Image
                src='/patient-select-time.png'
                width={760}
                height={660}
                className='aspect-video hidden lg:block'
                alt=''
              />
              <Image
                src='/patient-select-time-mobile.png'
                width={760}
                height={660}
                className='aspect-video block md:hidden'
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='max-w-[1400px] mx-auto py-11 px-4'>
          <div className='lg:grid grid-cols-[65%_1fr] rounded-lg overflow-hidden'>
            <div className='bg-[#00AC30] relative'>
              <CustomCarousel className='lg:py-12 py-10'>
                {[
                  {
                    title:
                      'I couldn’t be happier with the care I received. The doctors were knowledgeable and attentive.',
                    name: 'Hilda Baci',
                    position: 'Chef, Hilda’s Kitchen',
                    imgSrc: '/nurse.png',
                  },
                  {
                    title:
                      'Healify 360 has greatly facilitated my healthcare journey. I wholeheartedly endorse its use.',
                    name: '— Adora Nwodo',
                    position: 'Software Engineer, SurrealDB',
                    imgSrc: '/mercy-awo.png',
                  },
                  {
                    title:
                      'Using Healify 360 made my healthcare journey so much easier. I highly recommend it.',
                    name: 'Tunde Awokoya',
                    position: 'Chess Player, Chess  Foundation',
                    imgSrc: '/tunde-awokoya.png',
                  },
                ].map((item, index) => (
                  <CarouselItem key={index}>
                    <div className='max-w-[85%] mx-auto text-white'>
                      <div className='flex items-center gap-1'>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            color='#FEC84B'
                            fill='#FEC84B'
                          />
                        ))}
                      </div>
                      <h3 className='lg:text-4xl text-2xl mt-4 lg:mt-6'>
                        {item.title}
                      </h3>
                      <p className='mt-8 text-lg font-semibold'>
                        — {item.name}
                      </p>
                      <p className='text-[#E9D7FE] text-base'>
                        {item.position}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CustomCarousel>
            </div>
            <div>
              <CustomCarousel
                className='flex-col h-[280px] lg:h-[460px]'
                opts={{
                  orientation: 'vertical',
                }}>
                <CarouselItem>
                  <Image
                    src='/nurse.png'
                    alt=''
                    height={460}
                    width={480}
                    className='w-full h-full'
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src='/mercy-awo.png'
                    alt=''
                    height={460}
                    width={480}
                    className='w-full h-full'
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src='/tunde-awokoya.png'
                    alt=''
                    height={460}
                    width={480}
                    className='w-full h-full'
                  />
                </CarouselItem>
              </CustomCarousel>
            </div>
          </div>
        </div>
        <div>
          <h3 className='lg:text-4xl text-3xl font-semibold mt-12 lg:mt-22 text-center px-4'>
            Discover Our Comprehensive Healthcare Services
          </h3>
          <div className='max-w-[760px] md:mt-8 mt-5 mx-auto relative'>
            <Image
              src='/doctor-dashboard.png'
              width={760}
              height={483}
              className='aspect-video'
              alt=''
            />
          </div>
          <div className='mt-12 flex flex-col lg:flex-row justify-between gap-12 max-w-[1400px] mx-auto px-8'>
            {[
              {
                title:
                  'Connect with Certified Doctors for Expert Consultations',
                description:
                  'Our platform offers a wide range of healthcare services, including doctor consultations and more.',
                icon: <MessageChatCodeIcon />,
              },
              {
                title:
                  'Access Convenient Healthcare Solutions Anytime, Anywhere',
                description:
                  'Experience the ease of accessing healthcare solutions at your fingertips.',
                icon: <ZapIcon />,
              },
              {
                title: 'Stay Informed with the Latest Medical Updates and News',
                description:
                  'Get access to the most recent medical updates and news to stay informed.',
                icon: <BellIcon />,
              },
            ].map((item, index) => (
              <div key={index} className='text-center'>
                <div className='flex justify-center p-3 mx-auto rounded-full bg-[#EBFFF1] w-fit'>
                  {item.icon}
                </div>
                <h4 className='text-xl font-semibold leading-8 mt-4 lg:mt-5'>
                  {item.title}
                </h4>
                <p className='mt-2 text-[#475467]'>{item.description}</p>
              </div>
            ))}
          </div>
          <div className='max-w-[1400px] mx-auto px-8 lg:mt-22 mt-12'>
            <div className='bg-[#00A32E] rounded-lg lg:p-16 py-10 px-6 lg:flex justify-between'>
              <div className='text-white'>
                <h4 className='text-3xl font-semibold'>
                  Revolutionize healthcare with Project X
                </h4>
                <p className='text-lg text-white mt-4'>
                  Connect with certified doctors for convenient and streamlined
                  healthcare.
                </p>
              </div>
              <div className='lg:space-x-3 space-x-0 mt-8 lg:mt-0'>
                <Button className='mt-3 w-full lg:w-auto bg-white text-black'>
                  Sign Up
                </Button>
                <Button className='mt-3 w-full lg:w-auto bg-[#0DC440]'>
                  Book Now
                </Button>
              </div>
            </div>
          </div>

          <div className='bg-[#EAECF0] px-8'>
            <div className='max-w-[1400px] flex flex-col md:flex-row justify-between mx-auto lg:mt-11 flex-wrap lg:py-11 py-6 mt-6'>
              <div>
                <Logo />
                <ul className='grid grid-cols-2 justify-between lg:flex gap-3 lg:gap-8 lg:justify-normal mt-8'>
                  {routes.map((item, index) => (
                    <li
                      key={index}
                      className='text-[#475467] text-base font-semibold'>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='md:mt-0 mt-12'>
                <h6 className='text-sm font-semibold'>Stay up to date</h6>
                <div className='gap-4 flex flex-col md:flex-row mt-4'>
                  <input
                    type='text'
                    placeholder='Enter your email'
                    className='h-full py-2 px-3 rounded-md border-2'
                  />
                  <Button className='w-full lg:w-auto'>Subscribe</Button>
                </div>
              </div>
              <div className='md:mt-16 mt-12 border-t w-full text-[#475467] flex justify-between lg:py-8'>
                <p>© 2024 Healify 360. All rights reserved.</p>
                <ul className='flex gap-4'>
                  {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                    <li key={index} className='text-base font-semibold'>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
