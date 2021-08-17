import React from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Editable from "../helper/Editable.js";

const CarousselEdit = () => {
  const [caroussels, setCaroussels] = useState([]);
  const inputRef = useRef();
  const { t } = useTrans();
  const [caroussel_title, setCaroussel_title] = useState("");
  const [caroussel_description, setCaroussel_description] = useState("");
  const [caroussel_image, setCaroussel_image] = useState("");
  const [caroussel_id, setCaroussel_id] = useState("");

  // load first time carrousel
  const loadHomeParams = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}caroussel`, {})
      .then((response) => {
        setCaroussels(response.data);
        /*  setPresentation_title(response.data.presentation_title);
        setPresentation_content(response.data.presentation_content); */
      });
  };

  const submitChange = (caroussel_id) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}caroussel/${caroussel_id}`, {
        title: caroussel_title,
        description: caroussel_description,
      })
      .then((response) => {
        console.log("Success", response.data);
      });
  };

  const handleCarousselTitle = (event, index) => {
    setCaroussel_title(
      caroussels.forEach((row, i) => {
        if (index === i) row.title = event.target.value;
      })
    );
  };

  useEffect(loadHomeParams, []);

  // in load component , loadHomeParams
  useEffect(loadHomeParams, {});

  return (
    <MDBContainer className="px-2">
      {caroussels.map((caroussel, index) => {
        return (
          <MDBRow key={index} className="mx-auto mt-5 ml-5">
            <MDBCol lg="12">
              <h3 className="font-weight-bold mb-3 p-0">
                <Editable
                  text={caroussel.title}
                  type="input"
                  childRef={inputRef}
                >
                  <input
                    data-id={caroussel._id}
                    type="text"
                    name={caroussel.title}
                    ref={inputRef}
                    placeholder={t("writeTitle")}
                    value={caroussel.title}
                    onChange={(event) => handleCarousselTitle(event, index)}
                  />
                </Editable>
              </h3>
              <p>
                <Editable
                  text={caroussel.description}
                  type="textarea"
                  childRef={inputRef}
                >
                  <textarea
                    type="text"
                    rows="5"
                    cols="50"
                    name={caroussel.description}
                    ref={inputRef}
                    placeholder={t("writeContent")}
                    value={caroussel.description}
                    onChange={(e) => {}}
                  />
                </Editable>
              </p>
            </MDBCol>
            <MDBBtn
              rounded
              onClick={(e) => {
                submitChange(caroussel._id);
              }}
            >
              Change
            </MDBBtn>
          </MDBRow>
        );
      })}
    </MDBContainer>
  );
};

export default CarousselEdit;
