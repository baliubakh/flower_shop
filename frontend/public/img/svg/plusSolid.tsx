import * as React from "react";
import { SVGProps } from "react";

const SVGPlusSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.8 5.9C11.8 6.40178 11.3935 6.80798 10.8923 6.80798H6.80769V10.8926C6.80769 11.3944 6.40122 11.8 5.9 11.8C5.39878 11.8 4.99231 11.3944 4.99231 10.8926V6.80798H0.907692C0.406476 6.80798 0 6.40178 0 5.9C0 5.39822 0.406476 4.99259 0.907692 4.99259H4.99231V0.907976C4.99231 0.406192 5.39878 0 5.9 0C6.40122 0 6.80769 0.406192 6.80769 0.907976V4.99259H10.8923C11.3944 4.99231 11.8 5.39793 11.8 5.9Z"
      fill="currentColor"
    />
  </svg>
);
export default SVGPlusSolid;
