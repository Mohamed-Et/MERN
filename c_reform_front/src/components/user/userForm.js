import React from "react";

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

const userForm = (props) => {
  return (
    <form
      onSubmit={(e) => {
        props.saveUser(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="prenom"
        type="text"
        value={props.user.prenom}
        required
        onChange={(e) => {
          props.setUser({
            prenom: e.target.value,
            email: props.user.email,
            nom: props.user.nom,
            password: props.user.password,
            spaces: props.user.spaces,
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
        hint="nom"
        type="text"
        value={props.user.nom}
        required
        onChange={(e) => {
          props.setUser({
            prenom: props.user.prenom,
            nom: e.target.value,
            email: props.user.email,
            password: props.user.password,
            spaces: props.user.spaces,
          });
        }}
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="email"
        type="email"
        value={props.user.email}
        required
        onChange={(e) => {
          props.setUser({
            prenom: props.user.prenom,
            nom: props.user.nom,
            email: e.target.value,
            password: props.user.password,
            spaces: props.user.spaces,
          });
        }}
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="password"
        type="text"
        value={props.user.password}
        required
        onChange={(e) => {
          props.setUser({
            prenom: props.user.prenom,
            nom: props.user.nom,
            email: props.user.email,
            password: e.target.value,
            spaces: props.user.spaces,
          });
        }}
      />

      <select
        className="browser-default custom-select"
        onChange={(e) => {
          props.setUser({
            prenom: props.user.prenom,
            nom: props.user.nom,
            email: props.user.email,
            password: props.user.password,
            spaces: e.target.value,
          });
        }}
      >
        <option>Choose the Space</option>
        {props.spaces.map((space, index) => {
          return (
            <option key={index} value={space._id}>
              {space.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
export default userForm;
