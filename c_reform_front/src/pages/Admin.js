import React, { Fragment, useEffect } from "react";
import Navbar from "../components/header/Navbar";
import { useAuth } from "../Contextes/auth";
import ManageCaroussel from "../components/admin/manage_caroussel";
import Home from "../components/home/Home";

import SideNav from "../components/sidenav/SideNav";
import { MDBContainer, MDBRow, MDBCol, MDBNavbarToggler } from "mdbreact";
import Profil from "../components/user/Profil";
import ManageProfil from "../components/user/ManageProfil";
import ManageRepositores from "../components/repository/ManageRepositories";
import UserView from "../components/repository/UserView";
import MenuAdmin from "../components/menu/MenuAdmin";
import Spaces from "../components/space/Spaces";
import { useAlert } from "../Contextes/alertContext";

/* routers */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "../components/user/users";
import Alert from "../components/alert/Alert";
import NavbarLogin from "../components/header/navbarLogin";
import "./Admin.css";
import axios from "axios";
import UsersSpace from "../components/user/UsersSpace";
import UsersSpaceList from "../components/user/UsersSpaceList";
export default function Admin() {
  const { alertMessage, alertShow, AlertType } = useAlert();
  const { roles, home, setHome, avatar, setAvatar, setSpace } = useAuth();

  const loadHome = () => {
    axios.get(`${process.env.REACT_APP_API_URL}home`, {}).then((response) => {
      setHome(response.data);
    });
  };

  const loadCurrentUser = () => {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));

    axios
      .get(`${process.env.REACT_APP_API_URL}user/currentUser`, {
        headers: {
          Authorization: `Basic ${existingTokens}`,
        },
      })
      .then((resp) => {
        setAvatar(resp.data.avatar);
      });
  };
  useEffect(() => {
    if (!avatar) loadCurrentUser();
    if (!home._id) {
      loadHome();
    }
  });

  return (
    <div>
      <NavbarLogin></NavbarLogin>
      <div className="wrapper">
        <nav id="sidebar" className="indigo1 fixed">
          <MenuAdmin></MenuAdmin>
        </nav>

        <div id="content">
          {alertShow && (
            <Alert color={AlertType} message={alertMessage}></Alert>
          )}

          <Switch>
            <Route path="/admin/manageHome" component={Home} />
            <Route path="/admin/manageSpaces" component={Spaces} />
            <Route path="/admin/manageCaroussel" component={ManageCaroussel} />
            <Route path="/admin/manageUsers" component={Users} />
            <Route path="/admin/manageProfile" component={ManageProfil} />
            <Route path="/admin/manageRepositores" component={ManageRepositores} />
            <Route path="/admin/userView" component={UserView} />
            <Route
              path="/admin/manageUser/:spaceName"
              component={UsersSpaceList}
            />
            <Route path="*" component={Spaces} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
