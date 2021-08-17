import { useAuth } from "../../Contextes/auth";
import React, { Component, useEffect, useState } from "react";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from "mdbreact";
import axios from "axios";
import userForm from "../user/userForm";
import Users from "../user/users";

const UserView = (props) => {
    const { authTokens } = useAuth();
    const [users, setUsers] = useState([]);

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
            });
    };
    return (
        <MDBContainer className="classic-tabs">
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map((user, index)=>{
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.avatar}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
        </MDBContainer>
           
    );

};

export default UserView;


