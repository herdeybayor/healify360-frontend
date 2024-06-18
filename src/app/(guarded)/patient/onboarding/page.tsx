'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z
    .string({ message: 'FullName is required' })
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(255, { message: 'Full name must be at most 255 characters long' }),
  years: z.number({ message: 'Years of Experience has to be a number' }),

  address: z.string({ message: 'Home Address is required' }),
  gender: z.string({ message: 'Please select a gender' }),
});

function PatientOnboarding() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      years: 0,
      address: '',
      gender: 'Male',
    },
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    const payload = {
      first_name: data.fullName,
      last_name: data.years,
      email: data.address,
      gender: data.gender,
    };

    // toast.promise(register(payload), {
    //   loading: 'Registering...',
    //   success: 'Registration successful',
    //   error: (error) => error.response?.data.message || 'Registration failed',
    // });
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-8 flex flex-col'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Adio Aina' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='years'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input placeholder='05' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input placeholder='80, Wesbley Kingdom' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type='submit' className='mt-8 w-full'>
              Submit &rarr;
            </Button>
          </div>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-neutral-600 text-sm dark:text-neutral-300'>
            Already have an account?{' '}
            <Link href='/login' className='text-primary hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default PatientOnboarding;
