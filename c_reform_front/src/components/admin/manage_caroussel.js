import React, { Fragment, useState } from "react";
import {
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBFileInput,
} from "mdbreact";
import "./admin.css";
import axios from "axios";
import CarousselForm from "./CarousselForm";

const ManageCaroussel = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [request, setRequest] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const formData = new FormData();

  const submitHandlerForm = (event) => {
    event.preventDefault();

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("img", img);

    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      setRequest(true);
      axios({
        url: `${process.env.REACT_APP_API_URL}caroussel`,
        method: "POST",
        data: formData,
      })
        .then(
          (response) => {
            console.log(response);
            if (response.status === 200) {
              console.log("SUUUUUUUCEEEESSSSS");
            }
          },
          (error) => {
            console.log("error");
            if (error.response.status === 400) {
              setTitle("");
              setDesc("");
              setImg("");
              setError(true);
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
      <div>
        <CarousselForm
          submitHandlerForm={submitHandlerForm}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          setImg={setImg}
          request={request}
        ></CarousselForm>
      </div>
    </MDBContainer>
  );
};

export default ManageCaroussel;
