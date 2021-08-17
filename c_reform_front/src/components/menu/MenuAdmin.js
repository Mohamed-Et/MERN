import React from "react";
import { Link } from "react-router-dom";
import { useTrans } from "./../../Contextes/translation.js";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
const MenuAdmin = () => {
  const { t, i18n } = useTrans();

  return (
    <MDBListGroup className="inline mt-2 menu">
      <MDBListGroupItem>
        <MDBIcon icon="home" size="1x" className="indigo-text pr-3" />
        <Link to="/admin/manageHome">{t("manage_home")} </Link>
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBIcon fab icon="artstation" className="indigo-text pr-3" />
        <Link to="/admin/manageSpaces">{t("manage_spaces")} </Link>
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBIcon icon="user-friends" className=" pr-3" />
        <Link to="/admin/manageUsers">{t("manage_users")} </Link>
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBIcon icon="user-cog" className=" pr-3"/>
        <Link to="/admin/manageProfile">Gestion du profile</Link>
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBIcon fab icon="whmcs" size="1x" className=" pr-3"/>
        <Link to="/admin/manageRepositores">Gestion du repositories</Link>
      </MDBListGroupItem>
    </MDBListGroup>
  );
};
export default MenuAdmin;
