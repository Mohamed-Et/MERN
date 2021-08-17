import React, { Fragment } from "react";
import Navbar from "../components/header/Navbar";
import Caroussel from "../components/caroussel/Carrousel";
import { MDBContainer, MDBBtn } from "mdbreact";
import FooterPage from "../components/footer/Footer";
import PresentationPage from "../components/presentation/Presentation";

const home = () => {
  return (
    <Fragment>
      <Navbar nvColor="white"></Navbar>
      <MDBContainer fluid className="m-0 p-0">
        <div style={{ height: "60vh" }} className="pb-3">
          <Caroussel></Caroussel>
        </div>
        <PresentationPage></PresentationPage>
        <FooterPage></FooterPage>
      </MDBContainer>
    </Fragment>
  );
};

export default home;
