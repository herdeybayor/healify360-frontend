import * as React from 'react';
import { SVGProps, memo } from 'react';

const GraduationHatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path
      d='M3.333 6.757v4.007c0 .24 0 .36.037.465a.667.667 0 0 0 .154.249c.078.08.185.133.399.24l3.6 1.8c.175.088.262.131.354.149a.664.664 0 0 0 .246 0c.092-.018.18-.061.354-.149l3.6-1.8c.214-.107.321-.16.4-.24a.667.667 0 0 0 .153-.25c.037-.105.037-.224.037-.464V6.757m-11.334-1 6.428-3.214a.725.725 0 0 1 .178-.075.333.333 0 0 1 .122 0c.046.01.09.03.178.075l6.428 3.214L8.239 8.97a.725.725 0 0 1-.178.074.333.333 0 0 1-.122 0c-.046-.009-.09-.03-.178-.074L1.333 5.757Z'
      stroke='#0F172A'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default memo(GraduationHatIcon);
