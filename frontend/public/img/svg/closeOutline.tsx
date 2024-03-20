import * as React from "react";
import { SVGProps } from "react";

const SVGCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 3.88906L8.88906 0L10 1.11094L6.11094 5L10 8.88906L8.88906 10L5 6.11094L1.11094 10L0 8.88906L3.88906 5L0 1.11094L1.11094 0L5 3.88906Z"
      fill="currentColor"
    />
  </svg>
);
export default SVGCloseIcon;
