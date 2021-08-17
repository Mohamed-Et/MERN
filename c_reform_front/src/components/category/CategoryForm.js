import React from "react";
import { useTrans } from "../../Contextes/translation.js";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
} from "mdbreact";
import axios from "axios";
const CategoryForm = (props) => {
  const { t, i18n } = useTrans();

  return (
    <form
      onSubmit={(e) => {
        props.saveCategory(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="order"
        type="number"
        value={props.category.order}
        required
        onChange={(e) => {
          props.setCategory({
            order: e.target.value,
            title: props.category.title,
            description: props.category.description,
            space: props.category.space_id,
            user: props.category.user_id,
          });
        }}
        append={
          <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
            <MDBIcon icon="check" />
          </MDBBtn>
        }
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Title"
        type="text"
        value={props.category.title}
        required
        onChange={(e) => {
          props.setCategory({
            order: props.category.order,
            title: e.target.value,
            description: props.category.description,
            space: props.category.space_id,
            user: props.category.user_id,
          });
        }}
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="descritpion"
        type="textarea"
        value={props.category.description}
        required
        onChange={(e) => {
          props.setCategory({
            order: props.category.order,
            title: props.category.title,
            description: e.target.value,
            space: props.category.space_id,
            user: props.category.user_id,
          });
        }}
      />
    </form>
  );
};
export default CategoryForm;
