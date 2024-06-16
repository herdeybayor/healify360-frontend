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

export default function BookButton({ date }: { date?: DateRange | undefined }) {
  const [selectedDate, setDate] = React.useState<DateRange | undefined>(date);
  const [isDateSelected, setIsDateSelected] = React.useState(false);
  const [time, setTime] = React.useState<string | undefined>(undefined);
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
          {date && (
            <DialogDescription>
              In your local timezone (Africa/Lagos)
            </DialogDescription>
          )}
          {!date && (
            <DialogDescription>
              Choose a date that is most convenient for you.
            </DialogDescription>
          )}
        </DialogHeader>
        <>
          {(date || isDateSelected) && (
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
                          className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
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
                          className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
                          {time}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-base font-[500]'>🌞 Afternoon</p>
                  <div className='grid md:grid-cols-4 grid-cols-2 mt-2 gap-2'>
                    {['12:00', '01:00PM', '02:00PM', '03:00PM'].map((time) => (
                      <p
                        key={time}
                        onClick={() => {
                          setTime(time);
                        }}
                        className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
                        {time}
                      </p>
                    ))}
                    {['12:30PM', '01:30PM', '02:30PM', '03:30PM'].map(
                      (time) => (
                        <p
                          key={time}
                          onClick={() => {
                            setTime(time);
                          }}
                          className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
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
                          className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
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
                          className='border rounded-lg py-3 px-8 text-center text-[#64748B]'>
                          {time}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
              <Button
                className={`${!selectedDate && 'bg-[#F1F5F9] text-black'}`}>
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
      </DialogContent>
    </Dialog>
  );
}
