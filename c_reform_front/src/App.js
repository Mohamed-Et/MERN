import React, { useState, useEffect } from "react";
import axios from "axios";

/* routers */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// transtalation
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/* context */
import { AuthContext } from "./Contextes/auth";
import { TransContext } from "./Contextes/translation";
import { AlertContext } from "./Contextes/alertContext";
/* controll access to private routes*/
import PrivateRoute from "./PrivateRoute";

/*pages*/
import Home from "./pages/Home";
import Login from "./pages/Login";
import FirstTimeLogin from "./pages/FirstTimeLogin";
import Admin from "./pages/Admin";
import Space from "./pages/space";
import ExcelForm from "./components/excel/ExcelForm";
import Psw from "./components/change_password/Psw";
import pdfComponent from "./components/pdf/pdfComponent";
import Supervisor from "./components/supervisor/Supervisor";
import PublicSite from "./components/public_site/PublicSite";
i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    react: {
      useSuspense: false, //   <---- this will do the magic
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
function App(props) {
  /*  manage token logic  */
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [roles, setRoles] = useState([{}]);
  const [space, setSpace] = useState("");
  const [category, setCategory] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [nom, setNom] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [email, setEmailLogin] = useState("");
  const [home, setHome] = useState({});
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const { t } = useTranslation();

  return (
    <AlertContext.Provider
      value={{
        alertShow,
        setAlertShow,
        alertType,
        setAlertType,
        alertMessage,
        setAlertMessage,
      }}
    >
      <TransContext.Provider value={{ t, i18n }}>
        <AuthContext.Provider
          value={{
            home,
            setHome,
            isAdmin,
            setIsAdmin,
            nom,
            setNom,
            prenom,
            setPrenom,
            email,
            setEmailLogin,
            avatar,
            setAvatar,
            authTokens,
            setAuthTokens: setTokens,
            roles,
            setRoles: setRoles,
            space,
            setSpace: setSpace,
            category,
            setCategory: setCategory,
          }}
        >
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/login" component={Login} />
              <Route path="/firstTimeLogin" component={FirstTimeLogin} />
              <Route path="/excel" component={ExcelForm} />
              <Route path="/psw" component={Psw} />
              <Route path="/pdf" component={pdfComponent} />
              <PrivateRoute path="/s/:spaceVar" component={Space} />
              <PrivateRoute path="/admin" component={Admin} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </TransContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
