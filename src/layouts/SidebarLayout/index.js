import { observer } from "mobx-react-lite";
import React, { Suspense, useLayoutEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import { Outlet } from "react-router-dom";
import { useStores } from "src/functions/stores";

import Sidebar from "./Sidebar";

const Layout = observer(() => {
  const [showSidebar, setShowSidebar] = useState(true);
  const height = use100vh();

  useLayoutEffect(() => {
    setShowSidebar(true);
  }, []);

  return (
    <>
      <div style={{ height: "100%" }}>
        <Sidebar showSidebar={showSidebar} />
        <div
          onClick={() => {
            if (showSidebar) {
              setShowSidebar(false);
            }
          }}
          className={"page-container"}
          style={{ height: height }}
        >
          <Suspense>
            <Outlet context={{ setShowSidebar }} />
          </Suspense>
          <div className="sidebar-overlay" />
        </div>
      </div>
    </>
  );
});

export default Layout;
