import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" to={"/"}>
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1100748499/thumb/12.jpg?ip=x480"
            alt=""
            height={60}
          />
          <h2 style={{ marginLeft: "-25px", marginTop: "10px" }}>
            <b>
              Movie<span className="clr">Tic</span>{" "}
            </b>
          </h2>
        </Link>
        <div className="float-right">
            <Link className="custBtn px-4" to={'/signin'}><b>SIGN IN</b></Link>
        </div>
      </div>
    </nav>
  );
}
