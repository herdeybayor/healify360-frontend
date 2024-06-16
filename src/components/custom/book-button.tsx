'use client';
import React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function BookButton() {
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <Button className='w-full'>Book a Session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='md:text-2xl font-bold'>
            Select available time
          </DialogTitle>
          <DialogDescription>
            In your local timezone (Africa/Lagos)
          </DialogDescription>
        </DialogHeader>

        <div>
          <div>
            <p className='text-base font-[500]'>🌅 Morning</p>
            <div className='flex gap-2'>
              {['08:00AM', '09:00AM', '10:00AM', '11:00AM', '12:00PM'].map(
                (time) => (
                  <p
                    key={time}
                    className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
                    {time}
                  </p>
                )
              )}
              {['08:30AM', '09:30AM', '10:30AM', '11:30AM', '12:30PM'].map(
                (time) => (
                  <p
                    key={time}
                    className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
                    {time}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
