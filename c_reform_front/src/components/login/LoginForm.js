import React from "react";
import { useTrans } from "./../../Contextes/translation.js";
import {
  MDBCard,
  MDBCardBody,
  MDBNotification,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBView,
  MDBCardImage,
} from "mdbreact";

export default function LoginForm(props) {
  const { t } = useTrans();

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center mt-3 ">
        <MDBCol md="5" className="d-none d-md-block ">
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
              alt="food"
            />
          </MDBView>
        </MDBCol>
        <MDBCol md="5" className="pt-md-5">
          <MDBCard className="">
            <MDBCardBody className="m-4 ">
              <div className="text-center">
                <h3 className=" dark-grey-text text-center">
                  <strong>{t("login_title")}</strong>
                </h3>
              </div>
              <hr className="indigo py-1 mb-5" />
              {props.error && (
                <MDBNotification
                  style={{ "max-width": "100%" }}
                  show
                  fade
                  iconClassName="text-warning"
                  title="Error"
                  message={props.message}
                  text=""
                />
              )}
              <form
                className="needs-validation"
                onSubmit={(e) => {
                  props.submitHandlerLogin(e);
                }}
                noValidate
              >
                <MDBInput
                  icon="envelope"
                  name="email"
                  type="email"
                  value={props.email}
                  required
                  onChange={(e) => {
                    props.setEmail(e.target.value);
                  }}
                />
                <span className=" pb-5" />
                <MDBInput
                  className="mt-2"
                  value={props.password}
                  icon="key"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => {
                    props.setPassword(e.target.value);
                  }}
                />

                <div className="text-center mt-3 black-text">
                  <MDBBtn color="indigo" rounded type="submit">
                    {props.request && (
                      <MDBIcon
                        icon="sync"
                        spin
                        size="1x"
                        fixed
                        className="mr-1 white-text"
                      />
                    )}
                    {t("login_title")}
                    <MDBIcon
                      icon="paper-plane"
                      size="1x"
                      className="ml-2 white-text"
                    ></MDBIcon>
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
