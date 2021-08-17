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
import MeetingForm from "./MeetingForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Meetings = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState("");
  const [meeting, setMeeting] = useState("");
  const [meetings, setMeetings] = useState(props.meetings);
  const [idToUpdate, setIdToUpdate] = useState("");
  const { authTokens } = useAuth();
  const [index, setIndex] = useState(0);
  const { space } = useAuth();

  const { t } = useTrans();

  var pathArray = window.location.pathname.split("/");

  const loadUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/s/${pathArray[2]}`, {
        headers: {
          Authorization: `Basic ${authTokens}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const OpenFormF = (e) => {
    if (e === "new") {
      setMeeting("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const updateMeeting = (index) => {
    var meetingElement = meetings[index];
    setMeeting(meetingElement);
    console.log(meetingElement);
    setIdToUpdate(meetingElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  const saveMeeting = (event) => {
    if (meeting === "") {
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
          .patch(`${process.env.REACT_APP_API_URL}meeting/${idToUpdate}`, {
            title: meeting.title,
            description: meeting.description,
            meeting_date: meeting.meeting_date,
            participants: meeting.participants,
            tasks: meeting.tasks,
          })
          .then((response) => {
            if (response.status === 201) {
              console.log("salut" + response.data);
              meetings[index] = response.data;
              setOpenForm(false);
              setMeeting("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(`${process.env.REACT_APP_API_URL}meeting/${pathArray[6]}`, {
            title: meeting.title,
            description: meeting.description,
            meeting_date: meeting.meeting_date,
            participants: meeting.participants,
            tasks: meeting.tasks,
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              meetings.push(response.data);
              setOpenForm(false);
              setMeeting("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };

  const deleteMeeting = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}meeting/${pathArray[6]}/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          meetings.splice(index, 1);
          setMeetings([...meetings]);
        }
      });
  };

  useEffect(() => {
    loadUsers();
    return () => {
      setMeetings({});
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
            <MeetingForm
              saveMeeting={saveMeeting}
              setMeeting={setMeeting}
              tasks={tasks}
              users={users}
              meeting={meeting}
            ></MeetingForm>
          )}
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>Title</td>
                <td>Meeting date</td>
                <td>Modifier/Supprimer</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {meetings.length === 0 ? (
                <h1>No meetings</h1>
              ) : (
                  meetings.map((meeting, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            class="nav-link"
                            to={{
                              pathname: `/s/${space.name}/category/${pathArray[4]}/subCategory/${pathArray[6]}/meeting/${meeting._id}`,
                            }}
                          >
                            {meeting.title}
                          </Link>
                        </td>

                        <td>{meeting.meeting_date}</td>

                        <td>
                          <MDBIcon
                            icon="pencil-alt "
                            className="float-center indigo1-text"
                            onClick={(e) => {
                              updateMeeting(index);
                            }}
                          />
                          <MDBIcon
                            far
                            className="float-center px-2 red-text"
                            icon="trash-alt"
                            color="indigo"
                            onClick={(e) => {
                              if (window.confirm(t("delete_confirm")))
                                deleteMeeting(meeting._id, index);
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

export default Meetings;
