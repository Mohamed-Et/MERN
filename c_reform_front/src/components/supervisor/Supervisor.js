import React, { useState, useEffect } from "react";

import {
    MDBIcon,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText
} from "mdbreact";

import "./Supervisor.css"

import axios from "axios";
import { useTrans } from "./../../Contextes/translation.js";
import { useAuth } from "./../../Contextes/auth";
import { Link } from "react-router-dom";

const Supervisor = () => {

    const [categories, setCategories] = useState([]);
    const { authTokens } = useAuth();

    var pathArray = window.location.pathname.split("/");

    const loadCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}s/${pathArray[2]}/categories`, {
                headers: {
                    Authorization: `Basic ${authTokens}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setCategories(response.data);
                    console.log(response.data)
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    };

    useEffect(() => {
        loadCategories();
    }, {})

    return (

        <div className="container">
            <h5>TRADE FACILITATION REFORMS</h5>

            <div className="row ct">
                {categories && categories.map((categorie, index) => {
                    return (
                        <div className="col-lg-3 col-md-4 mb-2" key={index}>

                            <Link
                                class="nav-link"
                                to={{
                                    pathname: `/s/${pathArray[2]}/category/${categorie._id}/sub/details`,
                                    categoryId: {
                                        id: categorie.id
                                    }
                                }}
                            >
                                <MDBCard>
                                    <MDBCardImage
                                        className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded'
                                        tag='div'
                                    >
                                        <div className="same-height"><p className="f-20 m-t-5 m-b-5">{categorie.title}</p></div>
                                        <p className="m-t-5">{categorie.subCategory.length}</p>
                                        <p className="text-md">Reform On Going</p>

                                    </MDBCardImage>
                                    <MDBCardBody cascade className='text-center'>
                                        <MDBCardText>
                                            {categorie.description}
                                        </MDBCardText>
                                    </MDBCardBody>

                                </MDBCard>
                            </Link>


                        </div>)
                })}

            </div>

        </div>



    );
}

export default Supervisor;