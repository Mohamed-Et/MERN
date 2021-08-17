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
  MDBCard
} from "mdbreact";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import WorkingGroupForm from "./workingGroupForm"
import axios from "axios";


const WorkingGroup = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [userFacilitator, setUserFacilitator] = useState("");
  const [workinggroup, setWorkinggroup] = useState(props.workinggroup);
  const { authTokens } = useAuth();
  const [index, setIndex] = useState(0);

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
      setOpenForm(!openForm);
    }
  };

  const saveWorkinggroup = (event) => {


    event.preventDefault();
    event.target.className += " was-validated";
    if (event.target.reportValidity()) {

      axios
        .patch(`${process.env.REACT_APP_API_URL}workinggroup/${pathArray[6]}`, {
          userWorkers: workinggroup.userWorkers,
          userFacilitator: workinggroup.userFacilitator,
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload(false);
            console.log("salut", response.data);
            setWorkinggroup(response.data);
            setOpenForm(false);
            setIndex(0);
          }
        });

    }
  };

  useEffect(() => {
    loadUsers();

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
          {openForm && workinggroup && (
            <WorkingGroupForm
              saveWorkinggroup={saveWorkinggroup}
              setWorkinggroup={setWorkinggroup}
              workinggroup={workinggroup}
              users={users}
            ></WorkingGroupForm>
          )}

          <p>
            <h4>Facilitator : </h4>
            {workinggroup && workinggroup.userFacilitator}
          </p>

          <p><h4>
            Workers :
            </h4> {workinggroup && workinggroup.userWorkers.length > 0 && workinggroup.userWorkers.map((user, index) => {
            return <MDBCard key={index}>{user}</MDBCard>;
          })}</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default WorkingGroup;
