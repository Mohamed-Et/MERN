import { useAuth } from "../../Contextes/auth";
import React, { Component, useEffect, useState } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";
import {
    MDBAlert,
    MDBInput,
    MDBBtn
} from "mdbreact";
import axios from "axios";
const ManageProfil = (props) => {

    const { authTokens } = useAuth();
    const [user, setUser] = useState({});
    const [password, setPassword] = useState({});
    const [activeItemClassicTabs, setActiveItemClassicTabs] = useState("1");
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlert2, setOpenAlert2] = useState(false);

    const loadUser = () =>{
        axios({
            url: `${process.env.REACT_APP_API_URL}user/currentUser`,
            method: "GET",
            headers: {
                Authorization: `Basic ${authTokens}`,
                'Content-Type': 'application/json' }
        })
        .then((response)=>{
            setUser(response.data);
        });
    }

    const updateUser = () => {
        setOpenAlert(false);
        const data = new FormData();
        data.append('nom', user.nom);
        data.append('prenom', user.prenom);
        data.append('email', user.email); 
        axios({
            url: `${process.env.REACT_APP_API_URL}user/${user._id}`,
            method: "PATCH",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                if(response.status === 201){
                    console.log(response.data);
                    setOpenAlert(true);
                }
                
            });
    }
    const updatePassword = () => {
        setOpenAlert(false);
        setOpenAlert2(false);
        const pData = new FormData();
        //pData.append('password', password.current);
        //pData.append('new_password', password.new);
        //pData.append('new_password_confirmation', password.newVerif);
        axios({
            url: `${process.env.REACT_APP_API_URL}user/changePassword`,
            method: "POST",
            data: {
                password: password.current,
                new_password: password.new,
                new_password_confirmation: password.newVerif
            },
            headers: {
                Authorization: `Basic ${authTokens}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log(response.data);
                    setOpenAlert(true);
                } 
            },(error) => {
                console.log("error");
                if (error.response.status === 400) {
                    setOpenAlert2(true);
                } else {
                    setOpenAlert2(true);
                }
            }
            
        );
    }


    useEffect(() => {
        loadUser();
    }, {});

    return (
        <MDBContainer className="classic-tabs">
            <MDBNav classicTabs color="blue" className="mt-5">
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItemClassicTabs} onClick={() => { 
                        setActiveItemClassicTabs("1");
                        }} >
                        <MDBIcon icon="user" size="2x"/>
                        <br />
                        Profile
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItemClassicTabs} onClick={() => {
                        setActiveItemClassicTabs("2");
                        }} >
                        <MDBIcon icon="pencil-alt" size="2x"/>
                        <br />
                        Edit profil
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItemClassicTabs} onClick={() => { 
                        setActiveItemClassicTabs("3");
                        }} >
                        <MDBIcon icon="lock" size="2x"/>
                        <br />
                        Change password
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNav>
            <MDBTabContent
                className="card mb-5"
                activeItem={activeItemClassicTabs}
            >
                <MDBTabPane tabId="1">
                    <label htmlFor="">Nom</label>
                    <MDBInput label={user.nom} size="sm" disabled />
                    <label htmlFor="">Prenom</label>
                    <MDBInput label={user.prenom} size="sm" disabled/>
                    <label htmlFor="">Email</label>
                    <MDBInput label={user.email} size="sm" disabled/>
                    <label htmlFor="">Roles</label><br></br>
                    {user.roles && user.roles.lenght !== 0? (
                        user.roles && user.roles.map((single) => {
                            const name = single.role.split('_');
                            return (
                                <MDBInput label={name[0] + ' ' + name[1]} size="sm" disabled />
                            )
                        })
                    ) : (
                            <p>No roles available</p>
                        )}
                    <label htmlFor="">Spaces</label>
                    {user.spaces ? (
                            user.spaces && user.spaces.map((space) => {
                                return (
                                    <MDBInput label={space.name} size="sm" disabled />
                                )
                            })
                    ) : (
                        <p>No spaces available</p>
                    )}
                </MDBTabPane>

                <MDBTabPane tabId="2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateUser();
                        }}
                    >
                        {openAlert && (
                            <MDBAlert color="success" dismiss>
                                User updated successfully
                            </MDBAlert>
                        )}
                        <label htmlFor="">Nom</label>
                        <MDBInput label={user.nom} size="sm" 
                        onChange={(e) => {
                            setUser({
                                nom: e.target.value,
                                prenom: user.prenom,
                                email: user.email,
                                _id : user._id,
                                roles: user.roles,
                                spaces: user.spaces                      
                            });
                        }}
                        />
                        <label htmlFor="">Prenom</label>
                        <MDBInput label={user.prenom} size="sm"  
                            onChange={(e) => {
                                setUser({
                                    nom: user.nom,
                                    prenom: e.target.value,
                                    email: user.email,
                                    _id: user._id,
                                    roles: user.roles,
                                    spaces: user.spaces 
                                });
                            }}
                        />
                        <label htmlFor="">Email</label>
                        <MDBInput label={user.email} size="sm"  
                            onChange={(e) => {
                                setUser({
                                    nom: user.nom,
                                    prenom: user.prenom,
                                    email: e.target.value,
                                    _id: user._id,
                                    roles: user.roles,
                                    spaces: user.spaces 
                                });
                            }}
                        />
                        <MDBBtn color="indigo" type="submit">Update</MDBBtn>
                    </form>
                </MDBTabPane>
                <MDBTabPane tabId="3">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updatePassword();
                        }}
                    >
                        {openAlert && (
                            <MDBAlert color="success" dismiss>
                                Password updated successfully
                            </MDBAlert>
                        )}
                        {openAlert2 && (
                            <MDBAlert color="warning" dismiss>
                                Incorrect password or passwords don't match
                            </MDBAlert>
                        )}
                        <label htmlFor="">Current password</label>
                        <MDBInput label="enter password" size="sm" type="password"
                            onChange={(e) => {
                                setPassword({
                                    current: e.target.value,
                                    new: password.new,
                                    newVerif: password.newVerif
                                });
                            }}
                        />
                        <label htmlFor="">New password</label>
                        <MDBInput label="enter new password" size="sm" type="password"
                            onChange={(e) => {
                                setPassword({
                                    current: password.current,
                                    new: e.target.value,
                                    newVerif: password.newVerif
                                });
                            }}
                        />
                        <label htmlFor="">New Password verification</label>
                        <MDBInput label="enter new password verification" size="sm" type="password"
                            onChange={(e) => {
                                setPassword({
                                    current: password.current,
                                    new: password.new,
                                    newVerif: e.target.value
                                });
                            }}
                        />
                        <MDBBtn color="indigo" type="submit">Update</MDBBtn>
                    </form>
                </MDBTabPane>
            </MDBTabContent>
        </MDBContainer>
    );
   
};

export default ManageProfil;

    
