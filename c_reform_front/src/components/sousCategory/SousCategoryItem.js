import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contextes/auth";
import { useTrans } from "../../Contextes/translation.js";
import axios from "axios";
export default function SousCategoryItem(props) {
  const { space } = useAuth();
  const { t } = useTrans();
  //const [subCategory, setSubCategory] = useState({});
  /*
  const loadSubCategory = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}subCategory/${props.subCategory_id}`,
        {}
      )
      .then((response) => {
        setSubCategory(response.data);
      });
  };
*/

  const deleteSub = (idCat, idSub) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}subcategory/${idCat}/${idSub}`, {})
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
          props.subCategories.splice(props.index, 1);
          props.setSubCategories([...props.subCategories]);
        }
      });
  };
  /*
  useEffect(() => {
    loadSubCategory();
  }, {});
*/


  return (
    <MDBRow>
      <MDBCol>{props.subCategory.order}</MDBCol>
      <MDBCol>
        <Link
          to={{
            pathname: `/s/${space.name}/category/${props.category_id}/subCategory/${props.subCategory._id}/tasks`,
          }}
        >
          {props.subCategory.title}
        </Link>
      </MDBCol>
      <MDBCol> {props.subCategory.category} </MDBCol>
      <MDBCol> {props.subCategory.feasibility}</MDBCol>
      <MDBCol> {props.subCategory.status} </MDBCol>
      <MDBCol>{props.subCategory.deadLine}</MDBCol>
      <MDBCol>{props.subCategory.implementation} </MDBCol>
      <MDBCol>
        <MDBIcon
          far
          className="px-2 red-text"
          icon="trash-alt"
          color="indigo"
          onClick={(e) => {
            if (window.confirm("delete_confirm"))
              deleteSub(props.category_id, props.subCategory._id);
          }}
        />
      </MDBCol>
    </MDBRow>
  );
}
