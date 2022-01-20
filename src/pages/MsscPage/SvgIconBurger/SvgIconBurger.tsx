import * as React from "react";

const SVGComponent = (props: any) => (
  <svg
    width="512px"
    height="512px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
  </svg>
);

export default SVGComponent;
