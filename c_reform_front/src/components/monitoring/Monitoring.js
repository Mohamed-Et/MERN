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
import MonitoringForm from "./MonitoringForm";
import axios from "axios";
const Monitoring = (props) => {
  const [openForm, setOpenForm] = useState(false);
  //const [users, setUsers] = useState([]);
  const [monitorings, setMonitorings] = useState(props.monitorings);
  const [monitoring, setMonitoring] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");
  //const { authTokens } = useAuth();
  const [index, setIndex] = useState(0);

  const { t } = useTrans();

  var pathArray = window.location.pathname.split("/");

  const OpenFormF = (e) => {
    if (e === "new") {
      setMonitoring("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const updateMonitoring = (index) => {
    var monitoringElement = monitorings[index];

    setMonitoring(monitoringElement);
    setIdToUpdate(monitoringElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  const deleteMonitoring = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}monitoring/${pathArray[6]}/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          monitorings.splice(index, 1);
          setMonitorings([...monitorings]);
        }
      });
  };

  const saveMonitoring = (event) => {
    if (monitoring === "") {
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
          .patch(`${process.env.REACT_APP_API_URL}monitoring/${idToUpdate}`, {
            information: monitoring.information,
            author: monitoring.author,
            date_monitoring: monitoring.date_monitoring
          })
          .then((response) => {
            if (response.status === 201) {
              monitorings[index] = response.data;
              setOpenForm(false);
              setMonitoring("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(`${process.env.REACT_APP_API_URL}monitoring/${pathArray[6]}`, {
            information: monitoring.information,
            author: monitoring.author,
            date_monitoring: monitoring.date_monitoring
          })
          .then((response) => {
            if (response.status === 200) {
              monitorings.push(response.data);
              //monitorings.unshift(response.data);
              setOpenForm(false);
              setMonitoring("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };
  //download pdf file
  const generateFile = e => {
    var fileDownload = require('js-file-download');
    axios({
      url: `http://localhost:3002/monitoring/generateHtml`,
      method: "GET",
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    }).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("File generated !");
          fileDownload(response.data, 'monitoring.pdf');
        }
      }, (onLoadError) => {
        console.log(onLoadError);
      }
    )
  }

  useEffect(() => {
    return () => {
      setMonitorings({});
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
            <MonitoringForm
              saveMonitoring={saveMonitoring}
              setMonitoring={setMonitoring}
              monitoring={monitoring}
            ></MonitoringForm>
          )}
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>information</td>
                <td>author</td>
                <td>date monitoring</td>
                <td>Modifier/Supprimer</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {monitorings.length === 0 ? (
                <h1>No monitoring</h1>
              ) : (
                  monitorings.map((monitoring, index) => {
                    return (
                      <tr key={index}>
                        <td>{monitoring.information} </td>
                        <td>{monitoring.author}</td>
                        <td>{monitoring.date_monitoring}</td>
                        <td>
                          <MDBIcon
                            icon="pencil-alt "
                            className="float-center indigo1-text"
                            onClick={(e) => {
                              updateMonitoring(index);

                            }}
                          />
                          <MDBIcon
                            far
                            className="float-center px-2 red-text"
                            icon="trash-alt"
                            color="indigo"
                            onClick={(e) => {
                              if (window.confirm(t("delete_confirm")))
                                deleteMonitoring(monitoring._id, index);
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

export default Monitoring;
