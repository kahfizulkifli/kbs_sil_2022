import "./style.scss";
import React, { Suspense, useEffect } from "react";
import {
  Link,
  useLocation,
  matchRoutes,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "src/functions/stores";

const TabItem = ({ path, title, setTitle, mainTitle }) => {
  const location = useLocation();

  const isMatched = matchRoutes([{ path }], location);

  useEffect(() => {
    if (isMatched) {
      setTitle(`${mainTitle} > ${title}`);
    }

    return () => {
      setTitle("");
    };
  }, [setTitle, isMatched, title, mainTitle]);

  return (
    <Link className={`tab-item${isMatched ? " active" : ""}`} to={path}>
      {title}
    </Link>
  );
};

const Tabs = observer(({ tabs = [], mainTitle, setTitle }) => {
  const { store_v2 } = useStores();

  return (
    <div>
      <div className="tabs-holder">
        {tabs
          .filter((tab) => {
            if (!tab.permission) {
              return true;
            }

            return Object.keys(store_v2.permissions.pages).includes(
              tab.permission?.value
            );
          })
          .map((tab, i) => {
            return (
              <TabItem
                key={i}
                {...tab}
                mainTitle={mainTitle}
                setTitle={setTitle}
              />
            );
          })}
      </div>
    </div>
  );
});

const Layout = ({ title, tabs = [] }) => {
  const { setTitle } = useOutletContext();

  return (
    <>
      <Tabs tabs={tabs} mainTitle={title} setTitle={setTitle} />
      <Suspense>
        <Outlet context={{ setTitle: () => {} }} />
      </Suspense>
    </>
  );
};

export default Layout;
