'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function CustomCarousel({
  opts,
  children,
}: {
  opts?: CarouselProps;
  children: React.ReactNode;
}) {
  return (
    <Carousel
      {...opts}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
      }}>
      <CarouselContent>{children}</CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}