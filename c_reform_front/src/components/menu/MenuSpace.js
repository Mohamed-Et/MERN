import React from "react";
import { Link } from "react-router-dom";
import { useTrans } from "./../../Contextes/translation.js";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
const MenuSpace = (props) => {
  const { t, i18n } = useTrans();
  var pathArray = window.location.pathname.split("/");
  return (
    <MDBListGroup className="inline  menu">
      <MDBListGroupItem>
        <Link>
          <span class="text-lowercase">
            {" "}
            <MDBIcon fab icon="artstation" className="mr-1" />
            A5 Other measures to enhance impartiality
          </span>
        </Link>
      </MDBListGroupItem>

      <MDBListGroupItem>
        <MDBIcon icon="user-friends" className=" pr-3" />
        <Link
          to={{
            pathname: `/admin/manageUser/${pathArray[2]}`,
          }}
        >
          {t("manage_users")}{" "}
        </Link>
      </MDBListGroupItem>
    </MDBListGroup>
  );
};
export default MenuSpace;
