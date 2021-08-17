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
import { useAlert } from "./../../Contextes/alertContext";
import UserForm from "./userForm";
import axios from "axios";
const Users = () => {
  const { t } = useTrans();
  const { setAlertMessage, setAlertShow, setAlertType } = useAlert();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");
  const [index, setIndex] = useState(0);
  const { authTokens } = useAuth();
  const [spaces, setSpaces] = useState([]);

  const loadUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/`, {
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
        setAlertShow(true);
        setAlertMessage("Anauthorized");
        setAlertType("success");
      });
  };

  const loadSpaces = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}space/`, {
        headers: {
          Authorization: `Basic ${authTokens}`,
        },
      })
      .then((response) => {
        setSpaces(response.data);
      });
  };

  const OpenFormF = (e) => {
    if (e === "new") {
      setUser("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const saveUser = (event) => {
    if (user === "") {
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
          .patch(`${process.env.REACT_APP_API_URL}user/${idToUpdate}`, {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            roles: "5ef2001dc27ace51d8e206ff",
            spaces: user.spaces,
          })
          .then((response) => {
            if (response.status === 201) {
              users[index] = response.data;
              setOpenForm(false);
              setUser("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(`${process.env.REACT_APP_API_URL}user/signup`, {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            password: user.password,
            roles: "5ef2001dc27ace51d8e206ff",
            spaces: user.spaces,
          })
          .then((response) => {
            if (response.status === 201) {
              users.push(response.data);

              setOpenForm(false);
              setUser("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };

  const deleteUser = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}user/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          users.splice(index, 1);
          setUsers([...users]);
        }
      });
  };

  const updateUser = (index) => {
    var userElement = users[index];

    setUser(userElement);
    setIdToUpdate(userElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  useEffect(() => {
    loadUsers();
    loadSpaces();
    return () => {
      setUsers({});
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
            <UserForm
              user={user}
              setUser={setUser}
              saveUser={saveUser}
              spaces={spaces}
            ></UserForm>
          )}
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>avatar</td>
                <td>{t("lastName")}</td>
                <td>{t("firstName")}</td>
                <td>{t("email")}</td>
                <td>space</td>
                <td>Modifier/Supprimer</td>
                <td>role</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        style={{ width: "50px" }}
                        className="d-block"
                        src={user.avatar}
                        alt="avatar"
                      />
                    </td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.spaces.map((space, index1) => {
                        return (
                          <p>
                            <span key={index1}>{space.name}</span>
                          </p>
                        );
                      })}
                    </td>
                    <td>
                      <MDBIcon
                        icon="pencil-alt "
                        className="float-center indigo1-text"
                        onClick={(e) => {
                          updateUser(index);
                        }}
                      />
                      <MDBIcon
                        far
                        className="float-center px-2 red-text"
                        icon="trash-alt"
                        color="indigo"
                        onClick={(e) => {
                          if (window.confirm(t("delete_confirm")))
                            deleteUser(user._id, index);
                        }}
                      />
                    </td>
                    <td>
                      {user.roles.map((role, index1) => {
                        return (
                          <p>
                            <span key={index1}>{role.role}</span>
                          </p>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Users;
