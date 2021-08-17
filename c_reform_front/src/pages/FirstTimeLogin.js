import React, { Fragment, useState } from "react";
import Navbar from "../components/header/Navbar";
import PasswordForm from "../components/login/PasswordForm";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useAuth } from "../Contextes/auth";
import { Redirect, useLocation } from "react-router-dom";

import axios from "axios";

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isFirstTime, setFirstTime] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [request, setRequest] = useState(false);
  const {
    setNom,
    setPrenom,
    setEmailLogin,
    setAvatar,
    setAuthTokens,
    setRoles,
    roles,
    space,
    setIsAdmin,
    setSpace,
  } = useAuth();

  const queryString = require("query-string");
  var parsed = queryString.parse(window.location.search);

  if (isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const submitHandlerPassword = (event) => {
    event.preventDefault();

    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      setRequest(true);
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}user/password/${parsed.email}`,
          {
            password: password,
            confirmPassword: confirmPassword,
          }
        )
        .then(
          (response) => {
            console.log(response);
            if (response.status === 201) {
              setLoggedIn(true);
            }
          },
          (error) => {
            console.log("error");
            if (error.response.status === 400) {
              setPassword("");
              setError(true);
              setMessage(
                "Incorrect login information. Please check your credentials and try again"
              );
            } else {
              setError(true);
              setMessage("Please check and correct your input data.");
            }
          }
        )
        .then(function () {
          setRequest(false);
        });
    } else {
      console.log("form not valide");
    }
  };

  return (
    <Fragment>
      <Navbar nvColor="white"></Navbar>
      {isLoggedIn && <Redirect to="/login" />}
      <PasswordForm
        submitHandlerPassword={submitHandlerPassword}
        error={error}
        message={message}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        request={request}
      ></PasswordForm>
    </Fragment>
  );
}
