import * as React from "react";
import { SVGProps } from "react";

const SVGCheckMarkComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 25.6666C17.2217 25.6666 20.1383 24.3608 22.2496 22.2495C24.3609 20.1383 25.6667 17.2216 25.6667 14C25.6667 10.7783 24.3609 7.86168 22.2496 5.7504C20.1383 3.63915 17.2217 2.33331 14 2.33331C10.7784 2.33331 7.86174 3.63915 5.75046 5.7504C3.63921 7.86168 2.33337 10.7783 2.33337 14C2.33337 17.2216 3.63921 20.1383 5.75046 22.2495C7.86174 24.3608 10.7784 25.6666 14 25.6666Z"
      fill="none"
      stroke="#4F4F4F"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M9.33337 14L12.8334 17.5L19.8334 10.5"
      stroke="#4F4F4F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGCheckMarkComponent;
