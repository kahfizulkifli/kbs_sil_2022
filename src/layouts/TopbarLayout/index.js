import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Layout = () => {
  const [title, setTitle] = useState("");

  return (
    <>
      <Navbar title={title} />
      <Outlet context={{ setTitle }} />
    </>
  );
};

export default Layout;
