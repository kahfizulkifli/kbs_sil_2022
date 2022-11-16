import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import "./style.scss";
import { Link, useOutletContext } from "react-router-dom";
import {
  IconProfile,
  IconChangeProfile,
  IconLogout,
} from "src/icons/navbar/navbarIcon";
import { Stores } from "src/functions/stores";

@observer
class TopNav extends Component {
  static contextType = Stores;
  
  constructor() {
    super();
    this.state = {
      showEmail: false,
      showNotification: false,
      showSettings: false,
      new_error: "",
      context:{
        userData:{
          name:'Muhamamd Rizal Muhaimin',
          username:'muhammad@gmail.com'

        }

      }

      
    };
  }

  renderLeftNavbar() {
    return (
      <Fragment>
        <li className="nav-item p-0 m-0 d-block d-lg-none">
          <button
            className="btn m-0 btn-outline btn-xs pl-1"
            onClick={() => {
              this.props.setShowSidebar(true);
            }}
          >
            <i className="fa fa-bars" /> Menu
          </button>
        </li>
        <li className="nav-item">
          <span className="topbar-title">{this.props.title}</span>
        </li>
      </Fragment>
    );
  }

  renderRightNavbar() {
    return (
      <>
        <div className="row">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="settingsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="d-inline">
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: "#101223" }}
                >
                  {'Muhamamd Rizal Muhaimin'}{" "}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>
                    (Owner)
                  </span>
                </span>
              </div>
            </div>

            <div
              className="dropdown-menu dropdown-menu-right animate slideDown "
              aria-labelledby="settingsDropdown"
            >
              {!this.context?.userClaims?.isCustomUser && (
                <Link to="/choose_apotek">
                  <button className="dropdown-item medium-body-reg px-2">
                    <IconProfile
                      style={{ height: 20, width: 20, marginRight: 10 }}
                    />
                    Pilih Apotek
                  </button>
                </Link>
              )}

              <Link to="">
                <button className="dropdown-item medium-body-reg px-2">
                  <IconChangeProfile
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  Ganti Password
                </button>
              </Link>

              {/* <Link to="">
                <button className="dropdown-item medium-body-reg px-2">
                  <IconLockUser
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  Kunci Layar / Ganti Pengguna
                </button>
              </Link>

              <Link to="">
                <button className="dropdown-item medium-body-reg  px-2">
                  <IconCloseShift
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  Keluar Shift
                </button>
              </Link>

              <Link to="">
                <button className="dropdown-item medium-body-reg  px-2">
                  <IconOutShift
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  Tutup Shift
                </button>
              </Link> */}

              <div>
                <button
                  className="dropdown-item medium-body-reg  px-2"
                  onClick={(e) => {
                    e.preventDefault();
                    this.context.logout();
                  }}
                  style={{ color: "#FF4949" }}
                >
                  <IconLogout
                    style={{ height: 20, width: 20, marginRight: 10 }}
                  />
                  Logout
                </button>
              </div>
            </div>
          </li>
        </div>
      </>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">{this.renderLeftNavbar()}</ul>
        <ul className="navbar-nav" style={{ marginRight: 50 }}>
          {this.renderRightNavbar()}
        </ul>
      </nav>
    );
  }
}

const HookWrapper = ({ title }) => {
  const { setShowSidebar } = useOutletContext();

  return <TopNav title={title} setShowSidebar={setShowSidebar} />;
};

export default HookWrapper;
