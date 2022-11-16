import React from "react";
import { inject, observer } from "mobx-react";
import "./style.scss";
import { Link, useLocation, matchRoutes } from "react-router-dom";

import IconHome from "src/icons/auth/home";
import { useStores } from "src/functions/stores";

const NavItem = ({
  paths = [],
  className,
  style,
  linkStyle,
  to = "/",
  linkOnClick,
  linkClassName,
  children,
  ...rest
}) => {
  const location = useLocation();

  const isMatched = matchRoutes(
    paths.map((path) => {
      return { path };
    }),
    location
  );

  if (!isMatched) {
    return <></>;
  }

  return (
    <li className={"nav-item"} {...rest}>
      <Link
        style={linkStyle}
        onClick={(e) => {
          if (linkOnClick instanceof Function) {
            e.preventDefault();
            linkOnClick(e);
          }
        }}
        className={linkClassName ? linkClassName : "nav-link"}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

const LeftNavbar = () => {
  return (
    <>
      <NavItem paths={["*"]} to="/">
        <img
          src="https://res.cloudinary.com/farmaklik/image/upload/v1660174584/pos.farmaklik.com/logo.png"
          height={32}
        />
      </NavItem>

      <NavItem
        paths={["*"]}
        to="/"
        linkClassName={"btn btn-text d-none d-md-block"}
      >
        <div className="d-flex flex-direction-row navbar-text">
          <IconHome />
          <div style={{ marginLeft: 6 }}>ke Beranda</div>
        </div>
      </NavItem>
    </>
  );
};

const RightNavbar = observer(() => {
  const { store_v2 } = useStores();

  return (
    <>
      {store_v2.authenticated && (
        <>
          <NavItem
            paths={["/create_apotek"]}
            to="/choose_apotek"
            linkClassName={"btn btn-text"}
          >
            <div className="d-flex flex-direction-row navbar-text">
              <i className="fa fa-exchange-alt" />
              <div style={{ marginLeft: 6 }}>Pilih Apotek Lain</div>
            </div>
          </NavItem>

          <NavItem
            paths={["*"]}
            linkClassName="btn btn-green txt-white"
            linkOnClick={() => {
              store_v2.logout();
            }}
          >
            <i className="fa fa-sign-out-alt"></i> Keluar{" "}
          </NavItem>
        </>
      )}

      {!store_v2.authenticated && (
        <>
          <NavItem
            paths={["/login"]}
            to="/register"
            linkClassName={"btn btn-default"}
          >
            Daftar Sekarang
          </NavItem>
          <NavItem
            paths={["/register", "/passwordreset"]}
            to="/login"
            linkClassName={"btn btn-default"}
          >
            Masuk
          </NavItem>
        </>
      )}
    </>
  );
});

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <ul className="navbar-nav mr-auto d-flex flex-direction-row">
            <LeftNavbar />
          </ul>
          <ul className="navbar-nav">
            <RightNavbar />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
