import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
import Home from "../../components/home/Home";
import Hi1 from "../test/hi1";
import hi2 from "../test/hi2";
import hi3 from "../test/hi3";
import hi4 from "../test/hi4";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SousCategoryWidget from "./SousCategoryWidget";
import SousCategoryMenu from "./SousCategoryMenu";
import { useAuth } from "../../Contextes/auth";
import axios from "axios";
import Description from "../description/Description";
import Tasks from "../tasks/Tasks";
import Meetings from "../meetings/Meetings";
import Monitoring from "../monitoring/Monitoring";
import Documentation from "../documentation/Documentation";
import WorkingGroup from "../working_group/workingGroup";
import Meeting from "../meetings/Meeting";
import PublicSite from "../public_site/PublicSite";

export default function SousCategory() {
  const [subCategory, setSubCategory] = useState({});
  const [category, setCategory] = useState({});
  const { space } = useAuth();
  var pathArray = window.location.pathname.split("/");
  const loadsubCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}subCategory/${pathArray[6]}`, {})
      .then((response) => {
        setSubCategory(response.data);
        console.log("hiiiiiii", response.data);
      });
  };

  const loadCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/${pathArray[4]}`, {})
      .then((response) => {
        setCategory(response.data);
        console.log(response.data);
      });
  };

  useEffect(loadsubCategory, {});
  useEffect(loadCategory, {});
  return (
    <div>
      <SousCategoryWidget
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        category={category}
      ></SousCategoryWidget>
      <SousCategoryMenu
        subCategory={subCategory}
        category={category}
      ></SousCategoryMenu>
      <Switch>
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/description"
          }
          component={() => (
            <Description description={subCategory.description} />
          )}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/tasks"
          }
          component={() => <Tasks tasks={subCategory.task} />}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/meetings"
          }
          component={() => (
            <Meetings meetings={subCategory.meeting} tasks={subCategory.task} />
          )}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/monitoring"
          }
          component={() => <Monitoring monitorings={subCategory.monitoring} />}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/documentation"
          }
          component={() => <Documentation documentations={subCategory.documentation} />}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/workinggroup"
          }
          component={() => (
            <WorkingGroup workinggroup={subCategory.workingGroup} />
          )}
        />
        <Route
          exact
          path={
            "/s/" +
            space.name +
            "/category/" +
            category._id +
            "/subCategory/" +
            subCategory._id +
            "/meeting/:meeting_id"
          }
          component={() => <Meeting />}
        />

      </Switch>
    </div>
  );
}
