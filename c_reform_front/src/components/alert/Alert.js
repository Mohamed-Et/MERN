import React from "react";
import { MDBContainer, MDBAlert } from "mdbreact";

const Alert = (props) => {
  return (
    <MDBContainer>
      <MDBAlert color={props.color} dismiss>
        {props.message}
      </MDBAlert>
    </MDBContainer>
  );
};

export default Alert;
