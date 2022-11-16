import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

@withRouter
@inject("store")
@observer
export default class TopNav extends Component {
  collapseNavbar() {
    $(".navbar-collapse").collapse("hide");
  }

  renderLeftNavbar() {
    return (
      <Fragment>
        <li className="nav-item" style={{ lineHeight: "37px" }}>
          <Link
            style={{ padding: 0, marginRight: 10 }}
            onClick={() => {
              this.collapseNavbar();
            }}
            className="nav-link"
            to={this.props.store.authenticated ? "/" : "/"}
          >
            <img
              className="nav-icon"
              src="https://firebasestorage.googleapis.com/v0/b/farmaklik-id.appspot.com/o/images%2Flogo.png?alt=media&token=39e6be5e-2afa-487e-a8f2-222277d9bb0f"
              height="30"
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => {
              this.collapseNavbar();
            }}
            className="nav-link"
            to={this.props.store.authenticated ? "/" : "/"}
          >
            Beranda
          </Link>
        </li>
        {/*<li className="nav-item"><Link onClick={()=>{this.collapseNavbar()}} className="nav-link" to={(this.props.store.authenticated)?'/':'/'}>Harga dan Manfaat</Link></li>*/}
        {/*<li className="nav-item"><Link onClick={()=>{this.collapseNavbar()}} className="nav-link" to={(this.props.store.authenticated)?'/':'/'}>F.A.Q.</Link></li>*/}
      </Fragment>
    );
  }

  renderRightNavbar() {
    return (
      <Fragment>
        {!this.props.store.authenticated && (
          <Fragment>
            <li className="nav-item" style={{ lineHeight: "65px" }}>
              <Link
                onClick={() => {
                  this.collapseNavbar();
                }}
                to="/login"
                className="btn btn-default mr-2"
                style={{ fontWeight: "600" }}
              >
                Login
              </Link>
            </li>

            <li className="nav-item" style={{ lineHeight: "65px" }}>
              <Link
                onClick={() => {
                  this.collapseNavbar();
                }}
                to="/daftar"
                className="btn btn-green txt-white"
                style={{ fontWeight: "600", color: "#2CB34D" }}
              >
                Daftar Sekarang
              </Link>
            </li>
          </Fragment>
        )}

        {this.props.store.authenticated && (
          <Fragment>
            <li className="nav-item">
              <Link
                onClick={() => {
                  this.collapseNavbar();
                }}
                to={`/dashboard`}
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="settingsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pengaturan
              </a>
              <div
                className="dropdown-menu animate slideDown"
                aria-labelledby="settingsDropdown"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.store.logout();
                  }}
                  className="dropdown-item"
                >
                  Keluar
                </a>
              </div>
            </li>
          </Fragment>
        )}
      </Fragment>
    );
  }

  renderBrand() {
    return (
      <Link
        onClick={() => {
          this.collapseNavbar();
        }}
        to={this.props.store.authenticated ? "/dashboard" : "/"}
        className="navbar-brand"
        href="#"
        style={{ color: "#70DEA5", fontWeight: "900" }}
      >
        FARMA ITB
      </Link>
    );
  }

  render() {
    if (!this.props.isVisible) {
      return <div />;
    }
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <button
              className="navbar-toggler ml-1"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {this.renderLeftNavbar()}
              </ul>
              <ul className="navbar-nav">{this.renderRightNavbar()}</ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
