import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contextes/auth";
import {
  MDBIcon,
  MDBBtn,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { Redirect, NavLink } from "react-router-dom";
export default function NavBarSpace(props) {
  const { avatar, space } = useAuth();

  const openMenu = () => {
    props.setMenu(!props.menu);
  }

  return (
    <nav
      id="nav"
      className="navbar navbar-dark indigo1 p-1
     fixed-top
    "
    >
      <MDBIcon className="navbar-text white-text pl-3" icon="bars" onClick={() => {
        openMenu();
      }} />
      <span className="navbar-text white-text pl-3">{props.logo_text}</span>

      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink className="waves-effect waves-light in-line" to={{
            pathname: `/s/${space.name}/public`,
          }}>
            PUBLIC SITE
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            className="waves-effect waves-light"
            to={{
              pathname: `/s/${space.name}/categories`,
            }}
          >
            FTA REFORMS
          </MDBNavLink>



        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            className="waves-effect waves-light"
            to={{
              pathname: `/s/${space.name}/users`,
            }}
          >
            <MDBIcon icon="user-friends" className="white-text" />
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink
            className="waves-effect waves-light"
            to={{
              pathname: `/s/${space.name}/supervisor`,
            }}
          >
            SUPERVISOR
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <img
                style={{ height: "2rem" }}
                src={avatar}
                alt="sss"
                className="rounded-circle z-depth-0 "
              ></img>
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
              <MDBDropdownItem href="/">Logout</MDBDropdownItem>
              <MDBDropdownItem href="/admin">admin</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      </MDBNavbarNav>
    </nav>
  );
}
