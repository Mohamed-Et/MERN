import { useAuth } from "../../Contextes/auth";
import React, { Component, useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardBody, MDBCardImage, MDBBtn  } from "mdbreact";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import './repository.css'
import axios from "axios";
import UserView from "./UserView";
const ManageRepositores = (props) => {
   /*
    useEffect(() => {
        
    }, {});
    */
    return (
        <MDBContainer className="h-100">
            <MDBRow>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                            tag='div'
                        >
                            <h5>Indicators <span>number</span></h5>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <hr />
                            <div className='text-center'>
                                <MDBBtn color="cyan" className="button"> Add element</MDBBtn>
                                <MDBBtn color="mdb-color" className="button">View list</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                            tag='div'
                        >
                            <h5>Reforms <span>number</span></h5>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <hr />
                            <div className='text-center'>
                                <MDBBtn color="cyan" className="button"> Add element</MDBBtn>
                                <MDBBtn color="mdb-color" className="button">View list</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                            tag='div'
                        >
                            <h5>Organismes <span>number</span></h5>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <hr />
                            <div className='text-center'>
                                <MDBBtn color="cyan" className="button"> Add element</MDBBtn>
                                <MDBBtn color="mdb-color" className="button">View list</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                            tag='div'
                        >
                            <h5>Utilisateurs <span>number</span></h5>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <hr />
                            <div className='text-center'>
                                <MDBBtn color="cyan" className="button"> Add element</MDBBtn>
                                <Link to="/admin/userView">
                                    <MDBBtn color="mdb-color" className="button">View list</MDBBtn>
                                </Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );

};

export default ManageRepositores;


