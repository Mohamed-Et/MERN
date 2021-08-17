import React, { useEffect, useState } from "react";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBAlert,
  MDBIcon,
  MDBCol,
  MDBRow,
} from "mdbreact";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import DocForm from "./DocumentationForm";
import axios from "axios";
const Documentations = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [documents, setDocuments] = useState(props.documentations);
  const [document, setDocument] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");
  const { authTokens } = useAuth();
  const [index, setIndex] = useState(0);

  const { t } = useTrans();

  var pathArray = window.location.pathname.split("/");

  const data = new FormData();

  const OpenFormF = (e) => {
    if (e === "new") {
      setDocument("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const updateDocument = (index) => {
    var docElement = documents[index];

    setDocument(docElement);
    setIdToUpdate(docElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  const saveDocument = (event) => {
    if (document === "") {
      setOpenForm(false);
      return;
    }

    event.preventDefault();
    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      //data.append('files', document.files);
      data.append('title', document.title);
      data.append('desc', document.desc);
      data.append('date', document.date);
      for (var x = 0; x < document.files.length; x++) {
        data.append('files', document.files[x]);
      }
      //alert(idToUpdate);
      if (idToUpdate !== "") {
        //update logic
        axios({
          url: `${process.env.REACT_APP_API_URL}document/${idToUpdate}`,
          method: "PATCH",
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((response) => {
            if (response.status === 201) {
              //window.location.reload(false);
              documents[index] = response.data;
              setOpenForm(false);
              setDocument("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
          axios({
            url: `${process.env.REACT_APP_API_URL}document/${pathArray[6]}`,
            method: "POST",
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then((response) => {
            if (response.status === 200) {
              //window.location.reload(false);
              documents.push(response.data);
              console.log(response.data);
              setOpenForm(false);
              setDocument("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };

  const deleteDocument = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}document/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          documents.splice(index, 1);
          setDocuments([...documents]);
        }
      });
  };

  const getIcon = (extention) => {
    switch (extention) {
      case 'xlsx':
        return (<MDBIcon far icon="file-excel" size="2x"/>);
      case 'pdf':
        return (<MDBIcon far icon="file-pdf" size="2x"/>);
      case 'docx':
        return (<MDBIcon far icon="file-word" size="2x"/>);
      default:
        return (<MDBIcon far icon="file" size="2x"/>);
    }
  }

  useEffect(() => {
    return () => {
      setDocuments({});
    };
  }, {});

  return (
    <MDBContainer>
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
            <DocForm
              saveDocument={saveDocument}
              setDocument={setDocument}
              document={document}
            ></DocForm>
          )}
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>Title</td>
                <td>Desc</td>
                <td>Date</td>
                <td>Files</td>
                <td>Modifier/Supprimer</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {documents.length === 0 ? (
                <h1>No documents</h1>
              ) : (
                  documents.map((document, index) => {
                    return (
                      <tr key={index}>
                        <td>{document.title}</td>
                        <td>{document.desc}</td>
                        <td>{document.date}</td>
                        <td>
                          {document.files && document.files.map(file => {
                            const extention = file.url.split(".");
                            return (
                                <a 
                                  href={process.env.REACT_APP_API_URL + file.url}
                                  download="test.pdf"
                                  target="_blank"
                                  style={{ marginRight: '8px' }}>
                                {getIcon(extention[1])}
                                </a>
                            );
                          })}
                        </td>
                        <td style={{textAlign: 'right'}}>
                          <MDBIcon
                            icon="pencil-alt "
                            className="float-center indigo1-text"
                            onClick={(e) => {
                              updateDocument(index);
                            }}
                          />
                          <MDBIcon
                            far
                            className="float-center px-2 red-text"
                            icon="trash-alt"
                            color="indigo"
                            onClick={(e) => {
                              if (window.confirm(t("delete_confirm")))
                                deleteDocument(document._id, index);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Documentations;
