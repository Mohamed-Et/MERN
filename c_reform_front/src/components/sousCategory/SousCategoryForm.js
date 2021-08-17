import React, { useState } from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";
import { Editor, EditorState } from 'draft-js';
import RichTextEditor from "../RichText/RichTextEditor.js";

const SousCategoryForm = (props) => {


  const { t, i18n } = useTrans();

  return (
    <form
      onSubmit={(e) => {
        props.saveSubCategory(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="order"
        type="number"
        value={props.subCategory.order}
        required
        onChange={(e) => {
          props.setSubCategory({
            order: e.target.value,
            title: props.subCategory.title,
            category: props.subCategory.category,
            feasibility: props.subCategory.feasibility,
            status: props.subCategory.status,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            implementation: props.subCategory.implementation,
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
        value={props.subCategory.title}
        required
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: e.target.value,
            category: props.subCategory.category,
            feasibility: props.subCategory.feasibility,
            status: props.subCategory.status,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            implementation: props.subCategory.implementation,
          });
        }}
      />

      <select
        required
        containerClassName="mb-3 mt-0"
        className="browser-default custom-select mb-3"
        value={props.subCategory.category}
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: props.subCategory.title,
            category: e.target.value,
            feasibility: props.subCategory.feasibility,
            status: props.subCategory.status,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            implementation: props.subCategory.implementation,
          });
        }}
      >

        <option value="No Category">Choose Option</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <select
        required
        containerClassName="mb-3 mt-0"
        className="browser-default custom-select  mb-3"
        value={props.subCategory.feasibility}
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: props.subCategory.title,
            category: props.subCategory.category,
            feasibility: e.target.value,
            status: props.subCategory.status,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            implementation: props.subCategory.implementation,
          });
        }}
      >

        <option value="No Feasibility">Choose Option</option>
        <option value="Small Term">Small Term</option>
        <option value="Medium Term">Medium Term</option>
        <option value="Long Term">Long Term</option>
      </select>


      <select
        required
        containerClassName="mb-3 mt-0"
        className="browser-default custom-select mb-3"
        value={props.subCategory.status}
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: props.subCategory.title,
            category: props.subCategory.category,
            feasibility: props.subCategory.feasibility,
            status: e.target.value,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            implementation: props.subCategory.implementation,
          });
        }}
      >

        <option value="All">All</option>
        <option value="Approuved">Approuved</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Postponed">Postponed</option>
        <option value="Rejected">Rejected</option>
        <option value="Done">Done</option>
      </select>

      {/* <RichTextEditor editorState={props.setSubCategory.description} onChange={(e) => {
        props.setSubCategory({
          order: props.subCategory.order,
          title: props.subCategory.title,
          description: e.target.value,
          deadLine: props.subCategory.deadLine,
          implementation: props.subCategory.implementation,
        });
      }} />
 */}


      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="deadLine Format yyyy-mm-dd"
        type="date"
        value={props.subCategory.deadLine}
        required
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: props.subCategory.title,
            description: props.subCategory.description,
            deadLine: e.target.value,
            category: props.subCategory.category,
            feasibility: props.subCategory.feasibility,
            status: props.subCategory.status,
            implementation: props.subCategory.implementation,
          });
        }}
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="implementation"
        type="number"
        value={props.subCategory.implementation}
        required
        onChange={(e) => {
          props.setSubCategory({
            order: props.subCategory.order,
            title: props.subCategory.title,
            description: props.subCategory.description,
            deadLine: props.subCategory.deadLine,
            category: props.subCategory.category,
            feasibility: props.subCategory.feasibility,
            status: props.subCategory.status,
            implementation: e.target.value,
          });
        }}
      />
    </form >
  );
};
export default SousCategoryForm;
