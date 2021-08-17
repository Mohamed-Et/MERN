import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import { useAlert } from "./../../Contextes/alertContext";
import axios from "axios";
const UsersSpace = () => {
  const { t } = useTrans();
  const { setAlertMessage, setAlertShow, setAlertType } = useAlert();
  const [users, setUsers] = useState([]);
  const { authTokens } = useAuth();
  const loadUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/r/5ef2001dc27ace51d8e206ff`, {
        headers: {
          Authorization: `Basic ${authTokens}`,
        },
      })
      .then((response) => {
        console.log(response.data);

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

  useEffect(() => {
    loadUsers();
    return () => {
      console.log("off");
    };
  }, {});

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <td>{t("lastName")}</td>
          <td>{t("firstName")}</td>
          <td>{t("email")}</td>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
};
export default UsersSpace;
