import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdbreact";
import { useAuth } from "../../Contextes/auth";
import SousCategoryForm from "./SousCategoryForm";

export default function SousCategoryWidget(props) {
  const [openSubForm, setOpenSubForm] = useState(false);
  const [subCategory, setSubCategory] = useState({});
  var pathArray = window.location.pathname.split("/");

  const saveSubCategory = (event) => {
    event.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_URL}subcategory/${pathArray[6]}`, {
        order: props.subCategory.order,
        title: props.subCategory.title,
        description: props.subCategory.description,
        category: props.subCategory.category,
        status: props.subCategory.status,
        feasibility: props.subCategory.feasibility,
        deadLine: props.subCategory.deadLine,
        implementation: props.subCategory.implementation,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
          props.category.subCategory.push(response.data);
          setOpenSubForm(false);
          setSubCategory("");
        }
      });
  };

  const OpenSubFormF = (e) => {
    if (e === "new") {
      setSubCategory("");
      setOpenSubForm(!openSubForm);
    }
  };
  //download pdf file
  const generateFile = e => {
    var fileDownload = require('js-file-download');
    axios({
      url: `${process.env.REACT_APP_API_URL}subcategory/htmlToPdf/${pathArray[6]}`,
      method: "GET",
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    }).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("File generated !");
          fileDownload(response.data, 'Section.pdf');
        }
      }, (onLoadError) => {
        console.log(onLoadError);
      }
    )
  }
  return (
    <MDBRow className="mr-1 ml-1 ">
      <MDBCol size="12">
        <MDBCard className="p-2">
          <MDBCardBody>
            <MDBCardTitle>{props.category.title} </MDBCardTitle>
            <MDBCardTitle>
              A-{props.subCategory.order} {props.subCategory.title}
              <MDBIcon
                icon="pencil-alt "
                className="float-right indigo1-text"
                onClick={(e) => {
                  setOpenSubForm(!openSubForm);
                }}
              /><MDBIcon 
                  icon="download" 
                  className="float-right indigo1-text"
                  onClick={(e)=>{
                    generateFile();
                  }}
              />
              {openSubForm && (
                <SousCategoryForm
                  subCategory={props.subCategory}
                  setSubCategory={props.setSubCategory}
                  saveSubCategory={saveSubCategory}
                ></SousCategoryForm>
              )}
            </MDBCardTitle>
            <hr />
            <MDBCardText>
              <MDBRow className="">
                <MDBCol>Order</MDBCol>
                <MDBCol>Title</MDBCol>
                <MDBCol>Implementation</MDBCol>
                <MDBCol>Deadline </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol>{props.subCategory.order}</MDBCol>
                <MDBCol>{props.subCategory.title}</MDBCol>
                <MDBCol>{props.subCategory.implementation}</MDBCol>
                <MDBCol>{props.subCategory.deadLine}</MDBCol>
              </MDBRow>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
