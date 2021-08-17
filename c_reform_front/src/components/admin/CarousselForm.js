import React from "react";
import { useTrans } from "./../../Contextes/translation.js";
import {
  MDBCard,
  MDBCardBody,
  MDBNotification,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBFileInput,
  MDBCol,
  MDBIcon,
} from "mdbreact";

export default function CarousselForm(props) {
  const { t } = useTrans();

  return (
    <form
      className="needs-validation"
      onSubmit={(e) => {
        props.submitHandlerForm(e);
      }}
      encType="multipart/form-data"
    >
      <MDBRow className="caroussel-caption">
        <h4>Caroussel</h4>
        <MDBCol md="4">
          <MDBInput
            value={props.title}
            name="title"
            onChange=""
            type="text"
            id="materialFormRegisterNameEx"
            label="Title"
            required
            onChange={(e) => {
              props.setTitle(e.target.value);
            }}
          >
            <div className="valid-feedback">Looks good!</div>
          </MDBInput>
          <input
            name="img"
            type="file"
            onChange={(e) => {
              props.setImg(e.target.files[0]);
            }}
          />
        </MDBCol>
        <MDBCol md="4">
          <MDBInput
            value={props.desc}
            name="description"
            onChange={(e) => {
              props.setDesc(e.target.value);
            }}
            type="text"
            id="materialFormRegisterEmailEx2"
            label="Description"
            required
          >
            <div className="valid-feedback">Looks good!</div>
          </MDBInput>
          <MDBBtn color="success" type="submit">
            Submit Caroussel
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </form>
  );
}
