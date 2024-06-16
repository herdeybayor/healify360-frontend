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
import { DateRange } from 'react-day-picker';
import { Calendar } from '../ui/calendar';
import { Textarea } from '../ui/textarea';
import { CalendarIcon, HourglassIcon } from 'lucide-react';

export default function BookButton({ date }: { date?: DateRange | undefined }) {
  const [selectedDate, setDate] = React.useState<DateRange | undefined>(date);
  const [isDateSelected, setIsDateSelected] = React.useState(false);
  const [timeSelected, setTime] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>('');
  const [isTimeSelected, setIsTimeSelected] = React.useState(false);
  const [isBooked, setIsBooked] = React.useState(false);

  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <Button className='w-full block' asChild>
          <p>Book a Session</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {!isTimeSelected && (
            <DialogTitle className='md:text-2xl font-bold'>
              Select available time
            </DialogTitle>
          )}
          {timeSelected && !isBooked && isTimeSelected && (
            <DialogTitle className='md:text-2xl font-bold'>
              Confirm your booking
            </DialogTitle>
          )}
          {date && (
            <DialogDescription>
              In your local timezone (Africa/Lagos)
            </DialogDescription>
          )}
          {!date && !isDateSelected && (
            <DialogDescription>
              Choose a date that is most convenient for you.
            </DialogDescription>
          )}
          {timeSelected && !isBooked && isTimeSelected && (
            <>
              <DialogDescription className='text-base'>
                Session with
                <span className='text-[#00AC30]'>Dr. Dekunle Emmanuel</span>
              </DialogDescription>
              <p className='md:mt-6 mt-3 text-sm font-[500]'>
                Describe your health issues
              </p>
            </>
          )}
          {isBooked && (
            <DialogTitle className='md:text-2xl mt-4 font-bold text-center'>
              Your appointment has been booked
            </DialogTitle>
          )}
        </DialogHeader>
        <>
          {((date && !isTimeSelected) ||
            (isDateSelected && !isTimeSelected)) && (
            <>
              <div className='md:space-y-6 space-y-4'>
                <div>
                  <p className='text-base font-[500]'>🌅 Morning</p>
                  <div className='grid md:grid-cols-4 grid-cols-2 mt-2 gap-2'>
                    {['08:00AM', '09:00AM', '10:00AM', '11:00AM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                    {['08:30AM', '09:30AM', '10:30AM', '11:30AM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-base font-[500]'>🌞 Afternoon</p>
                  <div className='grid md:grid-cols-4 grid-cols-2 mt-2 gap-2'>
                    {['12:00PM', '01:00PM', '02:00PM', '03:00PM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                    {['12:30PM', '01:30PM', '02:30PM', '03:30PM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-base font-[500]'>🌑 Evening</p>
                  <div className='grid md:grid-cols-4 grid-cols-2 mt-2 gap-2'>
                    {['04:00PM', '05:00PM', '06:00PM', '07:00PM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                    {['04:30PM', '05:30PM', '06:30PM', '07:30PM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${
                            timeSelected === time &&
                            'border text-[#00AC30] border-[#00AC30]'
                          }`}>
                          {time}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsTimeSelected(true)}
                className={`${!timeSelected && 'bg-[#F1F5F9] text-black'}`}>
                Continue
              </Button>
            </>
          )}
        </>
        {!date && !isDateSelected && (
          <>
            <Calendar
              mode='range'
              selected={selectedDate}
              onSelect={(date) => setDate(date)}
              className='mx-auto'
            />
            <Button
              disabled={!selectedDate}
              onClick={() => setIsDateSelected(true)}
              className={`${!selectedDate && 'bg-[#F1F5F9] text-black'}`}>
              Continue
            </Button>
          </>
        )}
        {timeSelected && isTimeSelected && !isBooked && (
          <>
            <Textarea
              placeholder='Description of issues'
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className='w-full'
            />
            <Button
              disabled={!description}
              className='w-full'
              onClick={() => {
                setIsBooked(true);
              }}>
              Confirm Booking
            </Button>
          </>
        )}
        {isBooked && (
          <div>
            <p className='text-sm font-semibold text-[#475569]'>
              Booking session with
            </p>
            <div className='bg-[#E2E8F0] p-2 rounded-2xl mt-2'>
              <div className='text-[#475569] border-l-4 border-[#00AC30] pl-2'>
                <p>Dr Adekunle Sheriff</p>
                <div className='flex gap-2 items-center mt-2'>
                  <p className='flex items-center gap-2'>
                    <CalendarIcon size={20} /> <span>Wed, 24, July</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <HourglassIcon size={20} /> <span>Wed, 24, July</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='md:mt-6 mt-3 md:gap-6 gap-4 flex flex-col'>
              <DialogTrigger className='w-full'>
                <Button className='w-full'>Done</Button>
              </DialogTrigger>
              <Button className='bg-[#F1F5F9] text-black'>Reschedule</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
