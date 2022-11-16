import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
