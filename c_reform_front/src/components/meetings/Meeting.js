import React, { useState, useEffect } from "react";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBAlert,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
} from "mdbreact";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import MeetingForm from "./MeetingForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Meeting = () => {
  const [users, setUsers] = useState([]);
  const { authTokens } = useAuth();
  const [meeting, setMeeting] = useState("");

  const { t } = useTrans();

  var pathArray = window.location.pathname.split("/");

  const loadMeeting = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}meeting/${pathArray[8]}`, {
        headers: {
          Authorization: `Basic ${authTokens}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMeeting(response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(
    () => {
      loadMeeting();
    },
    { meeting }
  );

  return (
    <MDBContainer>
      <MDBCard>
        <h2>Meeting : {meeting.title}</h2> Meeting Date : {meeting.meeting_date}
      </MDBCard>
      <br></br>
      <MDBCard>
        <MDBCardTitle>Report</MDBCardTitle>
        <MDBCardBody>{meeting.description}</MDBCardBody>
      </MDBCard>
      <br></br>
      <MDBCard>
        <MDBCardTitle>Tasks</MDBCardTitle>
        <MDBCardBody>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>TITLE</td>
                <td>DELIVERABLE</td>
                <td>PERSON IN CHARGE</td>
                <td>DEADLINE</td>
                <td>IMPLEMENTATION</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {meeting &&
                meeting.tasks.length > 0 &&
                meeting.tasks.map((task, index) => {
                  return (
                    <tr key={index}>
                      <td>{task.title}</td>
                      <td>{task.deliverable}</td>
                      <td>{task.personInCharge}</td>
                      <td>{task.endingDate}</td>
                      <td>{task.implementation}</td>
                    </tr>
                  );
                })}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <br></br>
      <MDBCard>
        <MDBCardTitle>Participants</MDBCardTitle>
        {meeting &&
          meeting.participants.length > 0 &&
          meeting.participants.map((user, index) => {
            return <MDBCard key={index}>{user}</MDBCard>;
          })}
      </MDBCard>
      <br></br>
    </MDBContainer>
  );
};

export default Meeting;
