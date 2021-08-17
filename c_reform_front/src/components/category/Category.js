import React, { Fragment, useState, useEffect } from "react";
import { MDBListGroupItem, MDBCol, MDBRow, MDBIcon } from "mdbreact";
import SousCategoryItem from "../sousCategory/SousCategoryItem";
import SousCategoryForm from "../sousCategory/SousCategoryForm";
import { useAuth } from "../../Contextes/auth";
import axios from "axios";

export default function Category(props) {
  const [openSubForm, setOpenSubForm] = useState(false);
  const [subCategory, setSubCategory] = useState({});
  const [subCategories, setSubCategories] = useState(
    props.category.subCategory
  );

  const saveSubCategory = (event) => {
    event.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}${props.category._id}/subcategory`,
        {
          subOrder: subCategory.order,
          subTitle: subCategory.title,
          subDescription: subCategory.description,
          deadLine: subCategory.deadLine,
          category: subCategory.category,
          status: subCategory.status,
          feasibility: subCategory.feasibility,
          implementation: subCategory.implementation,
        }
      )
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
  
  let filteredSubCategories = subCategories.filter(
    (subCat)=>{
      return (
        subCat.title.toLowerCase().includes(props.searchInputTitle.toLowerCase())
        && subCat.status && subCat.category && subCat.feasibility && subCat.title 
        && subCat.category.toLowerCase().includes(props.searchInputCategory.toLowerCase())
        && subCat.feasibility.toLowerCase().includes(props.searchInputFeasability.toLowerCase())
        && subCat.status.toLowerCase().includes(props.searchInputStatus.toLowerCase())
        );
    }
  )
  
  return (
    <Fragment>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1"> {props.category.title} </h5>
      </div>
      <MDBRow>
        <MDBCol> ORDER </MDBCol>
        <MDBCol> TITLE </MDBCol>
        <MDBCol> CATEGORY </MDBCol>
        <MDBCol> FEASIBILITY </MDBCol>
        <MDBCol> STATUS </MDBCol>
        <MDBCol> DEADLINE </MDBCol>
        <MDBCol> IMPLEMENTATION </MDBCol>
        <MDBCol> SUPPRESSION </MDBCol>
      </MDBRow>
      {filteredSubCategories.map((subCategory, index) => {
        return (
          <Fragment>
            <SousCategoryItem
              category_id={props.category._id}
              subCategory={subCategory}
              index={index}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
            ></SousCategoryItem>

          </Fragment>
        );
      })}
      <MDBIcon
        icon={(openSubForm && "minus-circle") || "plus-circle"}
        size="1x"
        className="indigo1-text pr-3 mb-2 right text-right"
        onClick={(e, index) => {
          OpenSubFormF("new");
        }}
      />
      {openSubForm && (
        <SousCategoryForm
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          saveSubCategory={saveSubCategory}
        ></SousCategoryForm>
      )}
    </Fragment>
  );
}
