import React, { Fragment } from "react";
import { useTrans } from "../../Contextes/translation.js";
import { useAuth } from "../../Contextes/auth";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Editable from "../helper/Editable.js";

const PresentationEdit = () => {
  const inputRef = useRef();

  const [presentation_title, setPresentation_title] = useState("");
  const [navBarTitle, setNavBarTitle] = useState("");
  const [presentation_content, setPresentation_content] = useState("");
  const { t } = useTrans();

  const { home, setHome } = useAuth();

  const loadHomeParams = () => {
    axios.get(`${process.env.REACT_APP_API_URL}home`, {}).then((response) => {
      setPresentation_title(response.data.presentation_title);
      setPresentation_content(response.data.presentation_content);
      setNavBarTitle(response.data.navBarTitle);
    });
  };

  const submitChange = (event) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}home`, {
        _id: home._id,
        presentation_title: presentation_title,
        presentation_content: presentation_content,
        navBarTitle: navBarTitle,
      })
      .then((rep) => {
        setHome(rep.data);
      });
  };

  useEffect(loadHomeParams, {});

  return (
    <Fragment>
      <h3 className="font-weight-bold mb-3 p-0">
        <Editable text={home.navBarTitle} type="input" childRef={inputRef}>
          <input
            type="text"
            ref={inputRef}
            placeholder={t("writeTitle")}
            value={navBarTitle}
            onChange={(e) => setNavBarTitle(e.target.value)}
            onBlur={(e) => submitChange(e)}
          />
        </Editable>
      </h3>
      <h3 className="font-weight-bold mb-3 p-0">
        <Editable
          text={home.presentation_title}
          type="input"
          childRef={inputRef}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder={t("writeTitle")}
            value={presentation_title}
            onChange={(e) => setPresentation_title(e.target.value)}
            onBlur={(e) => submitChange(e)}
          />
        </Editable>
      </h3>
      <p>
        <Editable
          text={home.presentation_content}
          type="textarea"
          childRef={inputRef}
        >
          <textarea
            type="text"
            rows="5"
            cols="50"
            ref={inputRef}
            placeholder={t("writeContent")}
            value={presentation_content}
            onBlur={(e) => submitChange(e)}
            onChange={(e) => setPresentation_content(e.target.value)}
          />
        </Editable>
      </p>
    </Fragment>
  );
};

export default PresentationEdit;
