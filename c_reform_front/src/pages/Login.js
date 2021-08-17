import React, { Fragment, useState } from "react";
import Navbar from "../components/header/Navbar";
import LoginForm from "../components/login/LoginForm";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useAuth } from "../Contextes/auth";
import { Redirect } from "react-router-dom";

import axios from "axios";

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
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

  if (isLoggedIn) {
    if (roles.includes("super_admin")) return <Redirect to="/admin" />;
    else {
      const url = `/s/${space.name}/categories`;
      return <Redirect to={url} />;
    }
  }

  const submitHandlerLogin = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      setRequest(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}user/login`, {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.status === 200) {
              setAvatar(response.data.avatar);
              setNom(response.data.nom);
              setPrenom(response.data.prenom);
              setEmailLogin(response.data.email);
              setAuthTokens(response.data.token);
              const arrayRoles = [];
              response.data.roles.forEach((role) => {
                arrayRoles.push(role.role);
              });
              setRoles(arrayRoles);
              if (response.data.spaces[0]) setSpace(response.data.spaces[0]);

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

      <LoginForm
        submitHandlerLogin={submitHandlerLogin}
        error={error}
        message={message}
        email={email}
        setEmail={setEmail}
        setPassword={setPassword}
        request={request}
      ></LoginForm>
    </Fragment>
  );
}
