import React, { useState, useEffect } from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { useAuth } from "../../Contextes/auth";

const PresentationPage = () => {
  const { t } = useTrans();
  const { home } = useAuth();
  return (
    <MDBContainer className="px-2">
      <MDBRow className="mx-auto mt-5 ml-5">
        <MDBCol lg="12">
          <h3 className="font-weight-bold mb-3 p-0">
            <strong>{home.presentation_title}</strong>
          </h3>
          <p>{home.presentation_content}</p>

          <MDBBtn href="/login" color="indigo" rounded>
            {t("login_title")}
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default PresentationPage;
