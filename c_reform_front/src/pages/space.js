import React, { Fragment, useEffect, useState } from "react";
import NavBarSpace from "../components/header/NavBarSpace";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersSpace from "../components/user/UsersSpace";
import Alert from "../components/alert/Alert";
import { useAlert } from "../Contextes/alertContext";
import { useAuth } from "../Contextes/auth";
import MenuSpace from "../components/menu/MenuSpace";
import axios from "axios";
import Categories from "../components/category/Categories";
import SousCategory from "../components/sousCategory/SousCategory";
import Supervisor from "../components/supervisor/Supervisor";
import PublicSite from "../components/public_site/PublicSite";
import SousCategoryDetails from "../components/sousCategory/SousCategoryDetails";
export default function Space(props) {
  const {
    roles,
    home,
    setHome,
    space,
    setSpace,
    authTokens,
    avatar,
    setAvatar,
  } = useAuth();

  const [menu, setMenu] = useState(false);

  const loadSpaceIfNotLoaded = (spaceName) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}space/` + spaceName, {
        headers: {
          Authorization: `Basic ${authTokens}`,
        },
      })
      .then((response) => {
        setSpace(response.data);
      });
  };
  const loadHome = () => {
    axios.get(`${process.env.REACT_APP_API_URL}home`, {}).then((response) => {
      setHome(response.data);
    });
  };

  const loadCurrentUser = () => {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));

    axios
      .get(`${process.env.REACT_APP_API_URL}user/currentUser`, {
        headers: {
          Authorization: `Basic ${existingTokens}`,
        },
      })
      .then((resp) => {
        setAvatar(resp.data.avatar);
      });
  };

  useEffect(() => {
    if (!avatar) loadCurrentUser();
    if (!home._id) {
      loadHome();
    }

    const spaceName = props.match.params.spaceVar;
    if (space.name !== spaceName) loadSpaceIfNotLoaded(spaceName);
  });
  const { alertMessage, alertShow, AlertType } = useAlert();

  return (
    <Fragment>
      <NavBarSpace logo_text={space.logo_text} menu={menu} setMenu={setMenu}></NavBarSpace>
      <div className="wrapper">
        {menu && <nav id="sidebar" className="indigo1 fixed">
          <MenuSpace></MenuSpace>
        </nav>}

        <div id={menu ? "content" : "contentFull"} className="m-3">
          {alertShow && (
            <Alert color={AlertType} message={alertMessage}></Alert>
          )}

          <Switch>
            <Route path="/s/:spaceVar/categories" component={Categories} />
            <Route path="/s/:spaceVar/users" component={UsersSpace} />
            <Route
              path="/s/:spaceVar/category/:categoryVar/subCategory/:subCategory"
              component={SousCategory}
            />
            <Route path="/s/:spaceVar/supervisor" component={Supervisor} />
            <Route path="/s/:spaceVar/public" component={PublicSite} />
            <Route path="/s/:spaceVar/category/:idCategory/sub/details" component={SousCategoryDetails} />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}
