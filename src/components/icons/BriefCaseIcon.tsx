import * as React from 'react';
import { SVGProps, memo } from 'react';

const BriefCaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path
      d='M10.667 4.757c0-.62 0-.93-.069-1.185a2 2 0 0 0-1.414-1.414C8.93 2.09 8.62 2.09 8 2.09s-.93 0-1.184.068A2 2 0 0 0 5.4 3.572c-.068.255-.068.565-.068 1.185M3.467 14.09h9.066c.747 0 1.12 0 1.406-.145.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405V6.89c0-.747 0-1.12-.146-1.405a1.333 1.333 0 0 0-.582-.583c-.286-.145-.659-.145-1.406-.145H3.467c-.747 0-1.12 0-1.406.145-.25.128-.455.332-.582.583-.146.285-.146.658-.146 1.405v5.067c0 .746 0 1.12.146 1.405.127.251.331.455.582.583.286.145.659.145 1.406.145Z'
      stroke='#0F172A'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default memo(BriefCaseIcon);
