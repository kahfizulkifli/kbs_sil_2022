import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { generateColor, generateName } from "src/functions/Etc";

import { Stores } from "src/functions/stores";

@withRouter
@observer
export default class TopNav extends Component {
  static contextType = Stores;

  constructor() {
    super();
    this.state = {
      showEmail: false,
      showNotification: false,
      showSettings: false,
      new_error: "",
    };
  }

  componentDidMount() {
    document.addEventListener("click", () => {
      this.handleCloseDropdown();
    });
    document.body.addEventListener("click", () => {
      this.handleCloseDropdown();
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click", () => {
      this.handleCloseDropdown();
    });
    document.body.removeEventListener("click", () => {
      this.handleCloseDropdown();
    });
  }

  handleCloseDropdown() {
    this.setState({
      showEmail: false,
      showNotification: false,
      showSettings: false,
    });
  }

  renderNotification() {
    return (
      <li className="notifications dropdown">
        <span className="counter bgc-red">3</span>
        <a href="#" className="dropdown-toggle no-after" data-toggle="dropdown">
          <i className="fa fa-bell" />
        </a>
        <ul className="dropdown-menu" style={{ marginTop: -10 }}>
          <li className="pX-20 pY-15 bdB">
            <i className="fa fa-bell pR-10" />
            <span className="fsz-sm fw-600 c-grey-900">Notifications</span>
          </li>
          <li>
            <ul className="ovY-a pos-r scrollable lis-n p-0 m-0 fsz-sm">
              <li>
                <a
                  href="#"
                  className="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100"
                >
                  <div className="peer mR-15">
                    <img
                      className="w-3r bdrs-50p"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <div className="peer peer-greed">
                    <span>
                      <span className="fw-500">John Doe</span>
                      <span className="c-grey-600">
                        liked your <span className="text-dark">post</span>
                      </span>
                    </span>
                    <p className="m-0">
                      <small className="fsz-xs">5 mins ago</small>
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100"
                >
                  <div className="peer mR-15">
                    <img
                      className="w-3r bdrs-50p"
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                    />
                  </div>
                  <div className="peer peer-greed">
                    <span>
                      <span className="fw-500">Moo Doe</span>
                      <span className="c-grey-600">
                        liked your{" "}
                        <span className="text-dark">cover image</span>
                      </span>
                    </span>
                    <p className="m-0">
                      <small className="fsz-xs">7 mins ago</small>
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100"
                >
                  <div className="peer mR-15">
                    <img
                      className="w-3r bdrs-50p"
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                    />
                  </div>
                  <div className="peer peer-greed">
                    <span>
                      <span className="fw-500">Lee Doe</span>
                      <span className="c-grey-600">
                        commented on your{" "}
                        <span className="text-dark">video</span>
                      </span>
                    </span>
                    <p className="m-0">
                      <small className="fsz-xs">10 mins ago</small>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li className="pX-20 pY-15 ta-c bdT">
            <span>
              <a href="#" className="c-grey-600 cH-blue fsz-sm td-n">
                View All Notifications{" "}
                <i className="ti-angle-right fsz-xs mL-10" />
              </a>
            </span>
          </li>
        </ul>
      </li>
    );
  }

  renderSignedInMenu() {
    return (
      <Fragment>
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle no-after peers fxw-nw ai-c lh-1"
            data-toggle="dropdown"
          >
            {this.context.store_v2.userData && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  maxWidth: 100,
                }}
              >
                <div
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: 120,
                    marginBottom: 4,
                  }}
                >
                  <strong>{this.context.store_v2.userData.name}</strong>
                </div>
                {!this.context.store_v2.userData.isCustomUser && (
                  <div>{this.context.store_v2.userData.email}</div>
                )}
                {this.context.store_v2.userData.username && (
                  <div>{this.context.store_v2.userData.username}</div>
                )}
              </div>
            )}
            {(!this.context.store_v2.userData ||
              !this.context.store_v2.userData.photoURL) && (
              <div
                style={{
                  backgroundColor: "#333333",
                  color: "#fff",
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <i className="fa fa-user" style={{ fontSize: 16 }} />
              </div>
            )}
            {this.context.store_v2.userData &&
              this.context.store_v2.userData.photoURL && (
                <img
                  src={this.context.store_v2.userData.photoURL}
                  style={{
                    backgroundColor: "#333333",
                    color: "#fff",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                ></img>
              )}
          </a>
          <ul className="dropdown-menu fsz-sm" style={{ marginTop: -10 }}>
            <li>
              <Link
                to="/profile"
                href
                className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
              >
                <i className="ti-user mR-10" />
                <span>Profil</span>
              </Link>
            </li>
            <li role="separator" className="divider" />
            <li>
              <a
                href="#"
                onClick={() => {
                  this.context.store.logout().then(() => {
                    this.props.history.push("/login");
                  });
                }}
                className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
              >
                <i className="ti-power-off mR-10" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </li>
      </Fragment>
    );
  }

  render() {
    if (!this.props.isVisible) {
      return <div />;
    }

    return (
      <div
        className={
          "header navbar" + (this.props.hasSideBar ? "" : " full-width")
        }
      >
        <div className="header-container">
          <ul className="nav-left">
            {this.props.hasSideBar && (
              <li className="d-block d-lg-none">
                <a id="sidebar-toggle" className="sidebar-toggle">
                  <i className="fa fa-bars" />
                </a>
              </li>
            )}
            {!this.props.hasSideBar && <Link to="/"></Link>}
          </ul>
          <ul className="nav-right">
            {false &&
              this.context.store_v2.authenticated &&
              this.renderNotification()}
            {this.context.store_v2.authenticated && this.renderSignedInMenu()}
            {!this.context.store_v2.authenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
