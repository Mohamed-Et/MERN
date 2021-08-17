import React, { Fragment, useState } from "react";
import { useAuth } from "../../Contextes/auth";
import { useTrans } from "./../../Contextes/translation.js";
import {
  MDBCard,
  MDBCardBody,
  MDBCardUp,
  MDBAvatar,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import "./Profil.css";
import ProfilForm from "./ProfilForm";
const Profil = () => {
  const { t } = useTrans();
  const {
    avatar,
    setAvatar,
    email,
    nom,
    prenom,
    setNom,
    setPrenom,
  } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [avat, setAvat] = useState(avatar);

  if (!avat) {
    setAvat("http://localhost:3002/avatar/default.png");
  }
  // function to update profil
  return (
    <Fragment>
      <MDBCard testimonial className="m-0">
        <MDBCardUp className="indigo lighten-1" />
        <MDBAvatar className="mx-auto white">
          <img src={avat} alt="" />
        </MDBAvatar>
        <MDBCardBody>
          <h4 className="card-title">
            {nom} {prenom}
            <MDBIcon
              icon="pencil-alt "
              className="float-right indigo-text "
              onClick={(e) => {
                setOpenForm(!openForm);
              }}
            />
          </h4>
        </MDBCardBody>
      </MDBCard>
      {openForm && <ProfilForm nom={nom} prenom={prenom} />}
    </Fragment>
  );
};

export default Profil;
