import React from "react";

const svg = () => {
  return (
    <svg
      width="40"
      height="40"
      style={{ padding: "0 4px 0 0 " }}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" width="10" height="40" rx="5" fill="#F3F8FE" />
      <rect
        y="25"
        width="10"
        height="40"
        rx="5"
        transform="rotate(-90 0 25)"
        fill="#F3F8FE"
      />
    </svg>
  );
};

export default svg;
