import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./../../Contextes/auth";
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




const SousCategoryDetails = () => {

    var pathArray = window.location.pathname.split("/");

    const [category, setCategory] = useState({});
    const { authTokens } = useAuth();

    const loadCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}category/${pathArray[4]}`, {
                headers: {
                    Authorization: `Basic ${authTokens}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setCategory(response.data);
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
            <div className="card">
                <h2>{category.title}</h2>
                <h5>{category.description}</h5>
            </div>

            {category && category.subCategory && category.subCategory.map((subcategory, index) => {
                return (
                    <div className=" card m-3" key={index}>
                        <div className="card-header ch-alt">
                            <h4>{subcategory.title}</h4>
                            <h5>Lead : {subcategory.workingGroup && subcategory.workingGroup.userFacilitator}</h5>
                            <h5>Ending Date : {subcategory.deadLine}</h5>
                            <h5>Tasks : </h5>
                        </div>

                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <td>title</td>
                                    <td>deadline</td>
                                    <td>persone in charge</td>
                                    <td>description</td>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {subcategory.task && subcategory.task.map((task, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{task.title}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.personInCharge}</td>
                                            <td>{task.description}</td>
                                        </tr>
                                    )
                                })}
                            </MDBTableBody>
                        </MDBTable>

                    </div>
                )
            })}
        </div>
    );
}

export default SousCategoryDetails;