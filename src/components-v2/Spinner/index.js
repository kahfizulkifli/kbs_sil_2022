import "./style.scss";
import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner-holder"
      style={{ position: "absolute", top: 0, bottom: 0 }}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
