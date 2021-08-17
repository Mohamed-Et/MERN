import React, { useState, useEffect, Fragment } from "react";
import { useTrans } from "../../Contextes/translation.js";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
} from "mdbreact";
import axios from "axios";
const SpaceForm = (props) => {
  const { t, i18n } = useTrans();

  return (
    <form
      onSubmit={(e) => {
        props.saveSpace(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Name"
        type="text"
        value={props.space.name}
        required
        onChange={(e) => {
          props.setSpace({
            name: e.target.value,
            logo_text: props.space.logo_text,
          });
        }}
        append={
          <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
            <MDBIcon icon="check" />
          </MDBBtn>
        }
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Logo Text"
        type="text"
        value={props.space.logo_text}
        required
        onChange={(e) => {
          props.setSpace({ name: props.space.name, logo_text: e.target.value });
        }}
      />
    </form>
  );
};
export default SpaceForm;
