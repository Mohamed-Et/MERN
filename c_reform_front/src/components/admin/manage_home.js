import React, { Fragment } from "react";
import { MDBBtn, MDBInput, MDBRow, MDBCol, MDBContainer } from "mdbreact";
import PresentationPage from "../presentation/Presentation";
import { useAuth } from "../../Contextes/auth";
import PresentationEdit from "../presentation/PresentationEdit";
import CarousselEdit from "../caroussel/CarousselEdit";
const ManageHome = () => {
  return (
    <Fragment>
      <PresentationEdit></PresentationEdit>

      <hr></hr>
      <CarousselEdit></CarousselEdit>
    </Fragment>
  );
};

export default ManageHome;
