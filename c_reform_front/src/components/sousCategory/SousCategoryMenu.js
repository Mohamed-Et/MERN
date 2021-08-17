import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contextes/auth";

const SousCategoryMenu = (props) => {
  const { space } = useAuth();
  const [items, setItems] = useState({
    justified: "1",
  });

  const togglePills = (type, tab) => (e) => {
    e.preventDefault();
    if (items[type] !== tab) {
      setItems({ justified: tab });
    }
  };
  return (
    <MDBContainer>
      <MDBNav pills color="pink" className="nav-justified">
        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/description`,
              }}
            >
              Description
            </Link>
          </li>
        </MDBNavItem>
        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/tasks`,
              }}
            >
              Tasks
            </Link>
          </li>
        </MDBNavItem>
        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/meetings`,
              }}
            >
              Meetings
            </Link>
          </li>
        </MDBNavItem>

        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/monitoring`,
              }}
            >
              Monitoring
            </Link>
          </li>
        </MDBNavItem>
        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/documentation`,
              }}
            >
              Documentation
            </Link>
          </li>
        </MDBNavItem>
        <MDBNavItem>
          <li class="nav-item">
            <Link
              class="nav-link"
              to={{
                pathname: `/s/${space.name}/category/${props.category._id}/subCategory/${props.subCategory._id}/workinggroup`,
              }}
            >
              Working Group
            </Link>
          </li>
        </MDBNavItem>
      </MDBNav>
    </MDBContainer>
  );
};
export default SousCategoryMenu;
