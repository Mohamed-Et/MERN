import React, { Fragment, useState } from "react";
import { MDBContainer } from "mdbreact";
import "./admin.css";
import axios from "axios";
import { useAuth } from "../../Contextes/auth";

const ManagePresentation = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [request, setRequest] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const formData = new FormData();

  const submitHandlerForm = (event) => {
    event.preventDefault();

    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      setRequest(true);
      axios({
        url: `${process.env.REACT_APP_API_URL}`,
        method: "POST",
        data: formData,
      })
        .then(
          (response) => {
            if (response.status === 200) {
              console.log("SUCCESS");
            }
          },
          (error) => {
            console.log("error");
            if (error.response.status === 400) {
              setMessage(
                "Incorrect Input. Please check your Information and try again"
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
    <MDBContainer>
      <div></div>
    </MDBContainer>
  );
};

export default ManagePresentation;
