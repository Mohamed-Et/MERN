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
import TaskForm from "./TaskFrom";
import axios from "axios";
const Tasks = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");
  const { authTokens } = useAuth();
  const [index, setIndex] = useState(0);

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
      setTask("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const updateTask = (index) => {
    var taskElement = tasks[index];

    setTask(taskElement);
    setIdToUpdate(taskElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  const saveTask = (event) => {
    if (task === "") {
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
          .patch(`${process.env.REACT_APP_API_URL}task/${idToUpdate}`, {
            title: task.title,
            deliverable: task.deliverable,
            deadline: task.deadline,
            implementation: task.implementation,
            personInCharge: task.personInCharge,
            description: task.description,
            startingDate: task.startingDate,
            endingDate: task.endingDate,
          })
          .then((response) => {
            if (response.status === 201) {
              tasks[index] = response.data;
              setOpenForm(false);
              setTask("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(`${process.env.REACT_APP_API_URL}task/${pathArray[6]}`, {
            title: task.title,
            deliverable: task.deliverable,
            deadline: task.deadline,
            implementation: task.implementation,
            personInCharge: task.personInCharge,
            description: task.description,
            startingDate: task.startingDate,
            endingDate: task.endingDate,
          })
          .then((response) => {
            if (response.status === 200) {
              tasks.push(response.data);
              setOpenForm(false);
              setTask("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };

  const deleteTask = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}task/${pathArray[6]}/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          tasks.splice(index, 1);
          setTasks([...tasks]);
        }
      });
  };

  useEffect(() => {
    loadUsers();
    return () => {
      setTasks({});
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
            <TaskForm
              saveTask={saveTask}
              setTask={setTask}
              task={task}
              users={users}
            ></TaskForm>
          )}
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>title</td>
                <td>deliverable</td>
                <td>deadline</td>
                <td>implementation</td>
                <td>persone in charge</td>
                <td>description</td>
                <td>starting date</td>
                <td>ending date</td>
                <td>Modifier/Supprimer</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {tasks.length === 0 ? (
                <h1>No task</h1>
              ) : (
                  tasks.map((task, index) => {
                    return (
                      <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.deliverable}</td>
                        <td>{task.deadline}</td>
                        <td>
                          <MDBIcon
                            icon={(task.implementation && "check-circle") || "times-circle"}
                            size="1x"
                            className="indigo1-text pr-3 mb-2 right text-right"
                          />
                        </td>
                        <td>{task.personInCharge}</td>
                        <td>{task.description}</td>
                        <td>{task.startingDate}</td>
                        <td>{task.endingDate}</td>
                        <td>
                          <MDBIcon
                            icon="pencil-alt "
                            className="float-center indigo1-text"
                            onClick={(e) => {
                              updateTask(index);
                            }}
                          />
                          <MDBIcon
                            far
                            className="float-center px-2 red-text"
                            icon="trash-alt"
                            color="indigo"
                            onClick={(e) => {
                              if (window.confirm(t("delete_confirm")))
                                deleteTask(task._id, index);
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

export default Tasks;
