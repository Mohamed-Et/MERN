import React, { useEffect, useState } from "react";
import { MDBContainer, MDBAlert, MDBIcon, MDBCol, MDBRow, MDBInput } from "mdbreact";
import { useAuth } from "../../Contextes/auth";
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import axios from "axios";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import { useTrans } from "../../Contextes/translation";
import { Link } from "react-router-dom";

const Categories = (props) => {
  const { t } = useTrans();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");
  const [index, setIndex] = useState(0);
  const [searchInputTitle, setSearchInputTitle] = useState("");
  const [searchInputCategory, setSearchInputCategory] = useState("");
  const [searchInputFeasability, setSearchInputFeasability] = useState("");
  const [searchInputStatus, setSearchInputStatus] = useState("");
  

  const loadCAtegories = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}${window.location.pathname.substr(1)}`,
        {}
      )
      .then((response) => {
        setCategories(response.data);
      });
  };

  const OpenFormF = (e) => {
    if (e === "new") {
      setCategory("");
      setIdToUpdate("");
      setOpenForm(!openForm);
    }
  };

  const saveCategory = (event) => {
    if (category === "") {
      setOpenForm(false);
      return;
    }
    event.preventDefault();
    event.target.className += " was-validated";
    if (event.target.reportValidity()) {
      //alert(idToUpdate);
      if (idToUpdate !== "") {
        //update logic
        axios
          .patch(`${process.env.REACT_APP_API_URL}${idToUpdate}`, {
            order: category.order,
            title: category.title,
            description: category.description,
          })
          .then((response) => {
            if (response.status === 200) {
              categories[index] = response.data;
              setOpenForm(false);
              setCategory("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      } else {
        // add logic
        axios
          .post(
            `${process.env.REACT_APP_API_URL}${window.location.pathname.substr(
              1
            )}`,
            {
              order: category.order,
              title: category.title,
              description: category.description,
            }
          )
          .then((response) => {
            if (response.status === 201) {
              categories.push(response.data);
              setOpenForm(false);
              setCategory("");
              setIdToUpdate("");
              setIndex(0);
            }
          });
      }
    }
  };

  const deleteCategory = (id, index) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          //alert(index);
          categories.splice(index, 1);
          setCategories([...categories]);
        }
      });
  };

  const updateCategory = (index) => {
    var categoryElement = categories[index];

    setCategory(categoryElement);
    setIdToUpdate(categoryElement._id);
    setIndex(index);
    setOpenForm(true);
  };

  useEffect(() => {
    loadCAtegories();
    return () => {
      setCategories({});
    };
  }, {});

  return (
    <MDBContainer>
      <MDBIcon
        icon={(openForm && "minus-circle") || "plus-circle"}
        size="1x"
        className="indigo1-text pr-3 mb-2 right text-right"
        onClick={(e) => {
          OpenFormF("new");
        }}
      />
      <MDBRow>
        <MDBCol size="12">
          {openForm && (
            <CategoryForm
              category={category}
              setCategory={setCategory}
              saveCategory={saveCategory}
            ></CategoryForm>
          )}
          <MDBListGroup>
            <MDBRow>
              <MDBCol size="3">
            <MDBInput label="Filter by title" 
              size="sm"
              onChange={
                (e)=>{
                  setSearchInputTitle(e.target.value);
                }
              }
                />
                </MDBCol>
              <MDBCol size="3">
            <MDBInput label="Filter by category"
              size="sm"
              onChange={
                (e) => {
                  setSearchInputCategory(e.target.value);
                }
              }
              />
              </MDBCol>
              <MDBCol size="3">
            <MDBInput label="Filter by feasability"
              size="sm"
              onChange={
                (e) => {
                  setSearchInputFeasability(e.target.value);
                }
              }
            />
              </MDBCol>
              <MDBCol size="3">
            <MDBInput label="Filter by status"
              size="sm"
              onChange={
                (e) => {
                  setSearchInputStatus(e.target.value);
                }
              }
            />
              </MDBCol>
            </MDBRow>
            {categories.map((category, index) => {
              return (
                <MDBListGroupItem key={index}>
                  <MDBIcon
                    far
                    className="float-right px-2 red-text"
                    icon="trash-alt"
                    color="indigo"
                    onClick={(e) => {
                      if (window.confirm(t("delete_confirm")))
                        deleteCategory(category._id, index);
                    }}
                  />
                  <MDBIcon
                    icon="pencil-alt "
                    className="float-right indigo1-text"
                    onClick={(e) => {
                      updateCategory(index);
                    }}
                  />
                  <Category 
                  category={category}
                  searchInputTitle={searchInputTitle}
                  searchInputCategory={searchInputCategory}
                  searchInputFeasability={searchInputFeasability}
                  searchInputStatus={searchInputStatus}
                  ></Category>
                </MDBListGroupItem>
              );
            })}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Categories;
