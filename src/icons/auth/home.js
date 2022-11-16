import React from "react";

const svg = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.707.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L2 8.414V15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8.414l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z"
      fill="#2CB34D"
    />
  </svg>
)

export default svg;
