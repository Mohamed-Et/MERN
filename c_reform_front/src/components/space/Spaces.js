import React, { useState, useEffect } from "react";
import { useTrans } from "./../../Contextes/translation.js";
import SpaceForm from "./SpaceForm.js";
import { Link } from "react-router-dom";

import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
} from "mdbreact";
import axios from "axios";

const Spaces = () => {
  const { t, i18n } = useTrans();

  const [spaces, setSpaces] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [space, setSpace] = useState({});
  const [idToUpdate, setIdToUpdate] = useState("");
  const [index, setIndex] = useState(0);

  const loadSpaces = () => {
    axios.get(`${process.env.REACT_APP_API_URL}space`, {}).then((response) => {
      setSpaces(response.data);
    });
  };
  // function to open form
  const OpenFormF = (e) => {
    if (e === "new") {
      setSpace("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };
  // function to save new space or update
  const saveSpace = (event) => {
    if (space === "") {
      setOpenForm(false);
      return;
    }

    event.preventDefault();
    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      //alert(idToUpdate);
      if (idToUpdate !== "") {
        //update logic
        axios
          .patch(`${process.env.REACT_APP_API_URL}space/${idToUpdate}`, {
            name: space.name,
            logo_text: space.logo_text,
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              spaces[index] = response.data;
              setOpenForm(false);
              setSpace("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(`${process.env.REACT_APP_API_URL}space`, {
            name: space.name,
            logo_text: space.logo_text,
          })
          .then((response) => {
            if (response.status === 201) {
              spaces.push(response.data);
              setOpenForm(false);
              setSpace("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };
  // function to delete space
  const deleteSpace = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}space/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          spaces.splice(index, 1);
          setSpaces([...spaces]);
        }
      });
  };

  //update function
  const updateSpace = (index) => {
    var spaceElement = spaces[index];

    setSpace(spaceElement);
    setIdToUpdate(spaceElement._id);
    setIndex(index);
    setOpenForm(true);
  };
  useEffect(() => {
    loadSpaces();
    return () => {
      setSpace({});
    };
  }, {});

  return (
    <MDBContainer className="">
      <MDBIcon
        icon={(openForm && "minus-circle") || "plus-circle"}
        size="1x"
        className="indigo1-text pr-3 mb-2 right text-right"
        onClick={(e) => {
          OpenFormF("new");
        }}
      />
      <MDBRow>
        <MDBCol size="12">
          {openForm && (
            <SpaceForm
              space={space}
              setSpace={setSpace}
              saveSpace={saveSpace}
            ></SpaceForm>
          )}
          <MDBListGroup className="inline" style={{ width: "40em" }}>
            {spaces.map((space, index) => {
              return (
                <MDBListGroupItem key={index}>
                  <MDBIcon
                    far
                    className="float-right px-2 red-text"
                    icon="trash-alt"
                    color="indigo"
                    onClick={(e) => {
                      if (window.confirm(t("delete_confirm")))
                        deleteSpace(space._id, index);
                    }}
                  />
                  <MDBIcon
                    icon="pencil-alt "
                    className="float-right indigo1-text"
                    onClick={(e) => {
                      updateSpace(index);
                    }}
                  />
                  <Link
                    className="indigo1-text"
                    to={{
                      pathname: `/s/${space.name}/categories`,
                    }}
                  >
                    {space.name}
                  </Link>
                  <br></br>
                  <span>{space.logo_text}</span>
                </MDBListGroupItem>
              );
            })}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Spaces;
