import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from "mdbreact";

export default function Navbar(props) {
  const { home, setHome } = useAuth();
  const { t, i18n } = useTrans();
  const [isOpen, setisOpen] = useState(false);

  const loadHome = () => {
    axios.get(`${process.env.REACT_APP_API_URL}home`, {}).then((response) => {
      setHome(response.data);
    });
  };

  useEffect(loadHome, {});

  const toggleCollapse = () => {
    setisOpen(!isOpen);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <MDBNavbar color={props.nvColor} dark expand="md" className="fixed-top">
      <MDBContainer className="mb-0 pb-0" fluid={props.fluid}>
        <MDBNavbarBrand>
          <strong className="black-text">{home.navBarTitle}</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem active>
              <select
                className="browser-default custom-select"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="fr">Fr</option>
                <option value="en" selected="selected">
                  En
                </option>
              </select>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
