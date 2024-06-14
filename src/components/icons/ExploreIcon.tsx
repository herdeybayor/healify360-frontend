import * as React from 'react';
import { SVGProps, memo } from 'react';

const ExploreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    fill='none'
    {...props}>
    <path
      d='M10 3H3v9h7V3ZM21 3h-7v5h7V3ZM21 12h-7v9h7v-9ZM10 16H3v5h7v-5Z'
      stroke='#64748B'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default memo(ExploreIcon);
