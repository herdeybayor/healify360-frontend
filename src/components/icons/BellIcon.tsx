import * as React from 'react';
import { SVGProps, memo } from 'react';

const BellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path
      d='M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a1.999 1.999 0 0 1-3.46 0M2 8c0-2.2.7-4.3 2-6M22 8a10 10 0 0 0-2-6'
      stroke='#00AC30'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default memo(BellIcon);
