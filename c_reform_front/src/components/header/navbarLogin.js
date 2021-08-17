import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdbreact";
import { useAuth } from "../../Contextes/auth";
import { Redirect, NavLink } from "react-router-dom";
export default function NavbarLogin() {
  const { avatar, home } = useAuth();
  return (
    <nav
      id="nav"
      className="navbar navbar-dark indigo1 p-1
     fixed-top
    "
    >
      <span className="navbar-text white-text pl-3">{home.navBarTitle}</span>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">Home</li>
        </ul>
      </div>
      <div className="navbar-nav ml-auto">
        <ul className="navbar-nav mr-auto d-inline">
          <li className="nav-item  d-inline  mx-2">
            <img
              style={{ height: "2rem" }}
              src={avatar}
              alt="sss"
              className="rounded-circle z-depth-0 "
            ></img>
          </li>
          <li className="nav-item  d-inline  mx-2">
            <NavLink to="/">
              <MDBIcon icon="sign-out-alt white-text"></MDBIcon>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
