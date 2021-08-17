import React, { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../Contextes/auth";
import { useTrans } from "./../../Contextes/translation.js";
import axios from "axios";
import { MDBIcon, MDBInput, MDBBtn } from "mdbreact";

const ProfilForm = (props) => {
  const { t } = useTrans();
  const {
    avatar,
    setAvatar,
    email,
    nom,
    prenom,
    setAuthTokens,
    setNom,
    setPrenom,
    authTokens,
  } = useAuth();
  const updateProfil = (e) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}user/`, {
        email: email,
        nom: nom,
        prenom: prenom,
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          props.setUsers(response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    updateProfil();
    return () => {
      console.log("off");
    };
  }, {});
  return (
    <div>
      <form
        className="needs-validation"
        onSubmit={(e) => {
          updateProfil();
        }}
        noValidate
      >
        <MDBInput
          label={t("lastName")}
          name="nom"
          type="text"
          value={props.nom}
          required
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />
        <MDBInput
          value={props.prenom}
          label={t("firstName")}
          name="prenom"
          type="text"
          required
          onChange={(e) => {
            setPrenom(e.target.value);
          }}
        />

        <div className="text-center mt-3 black-text">
          <MDBBtn color="indigo" rounded type="submit">
            <MDBIcon icon="check" />
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

export default ProfilForm;
