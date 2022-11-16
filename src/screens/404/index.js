import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";

import TextareaAutosize from "react-autosize-textarea";

import Analytics from "src/components/Analytics";

@Analytics
@inject("store")
@observer
export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100hw",
        }}
      >
        <h3 className="mt-3 mb-3">Halaman tidak ditemukan</h3>
        <Link className="btn btn-primary" to="/">
          Kembali ke Home
        </Link>
      </div>
    );
  }
}
