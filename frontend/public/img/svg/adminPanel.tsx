import * as React from "react";
import { SVGProps } from "react";

const SVGAdminPanel = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
    <path
      fill="currentColor"
      opacity={0.4}
      d="M285.5 162.1L27.4 377.1C10.1 391.6 0 413.1 0 435.7C0 477.8 34.1 512 76.3 512c22.6 0 44.1-10.1 58.6-27.4L350.7 225.6c-6.1-3.7-11.9-8.2-17.2-13.5l-38.1-38.1c-3.7-3.7-6.9-7.7-9.8-11.9z"
    />
    <path
      fill="currentColor"
      d="M333.5 212.1c21.8 21.8 51.9 30.2 80 25.4L431 255l-8 8c-9.4 9.4-9.4 24.6 0 33.9l24 24c9.4 9.4 24.6 9.4 33.9 0l88-88c9.4-9.4 9.4-24.6 0-33.9l-24-24c-9.4-9.4-24.6-9.4-33.9 0l-8 8-15.9-15.9c6.6-30.3-2.4-63.2-26.6-86l-44.6-42C389.2 14 353.9 0 317.2 0H299.2C279 0 259.1 4.2 240.7 12.4l-47.2 21c-5.6 2.5-9.2 7.9-9.5 14s3 11.8 8.3 14.7L272 105.5v12.1c0 21.1 8.4 41.4 23.3 56.3l38.1 38.1z"
    />
  </svg>
);

export default SVGAdminPanel;
