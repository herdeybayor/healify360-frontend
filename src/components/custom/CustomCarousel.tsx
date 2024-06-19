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
  className,
}: {
  opts?: CarouselProps;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Carousel
      {...opts}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        loop: true,
      }}>
      <CarouselContent className={className}>{children}</CarouselContent>
    </Carousel>
  );
}
