import React, { useState, Fragment } from 'react';
import axios from "axios";
import Navbar from "../header/Navbar";
import FooterPage from "../footer/Footer";
import { useAuth } from "./../../Contextes/auth";
import "./psw.css";

const Psw = () => {
    const { authTokens } = useAuth();
    const [psw, setPsw] = useState([]);
    const [newP, setNewP] = useState([]);
    const [newP2, setNewP2] = useState([]);

    const getPsw = e => {
        setPsw(e.currentTarget.value);
    }

    const getNewP = e => {
        setNewP(e.currentTarget.value);
    }

    const getNewP2 = e => {
        setNewP2(e.currentTarget.value);
    }
    const change = e => {
        e.preventDefault();
        console.log(psw); 
        console.log(newP); 
        console.log(newP2);

        axios({
            url: `http://localhost:3002/user/changePassword`,
            method: "POST",
            data: {
                password: psw,
                new_password: newP,
                new_password_confirmation: newP2
            },
            headers: { 
                Authorization: `Basic ${authTokens}`,
                'Content-Type': 'application/json'
         }
        }).then(
            (response) => {
                console.log(response);
                if (response.status === 201) {
                    console.log("Password changed successfully");
                }
            }, (error) => {
                console.log(error);
            }
        ) 
    }
    
    return (
        <Fragment>
            <Navbar nvColor="white"></Navbar>
            <div className="div-form">
                <form action="" encType="multipart/form-data">
                    <label htmlFor="">Enter your current password</label>
                    <input onChange={getPsw} type="password" required/><br/>
                    <label htmlFor="">Enter your new password</label>
                    <input onChange={getNewP} type="password" required/><br/>
                    <label htmlFor="">Retype your new password</label>
                    <input onChange={getNewP2} type="password" required/><br />
                    <input onClick={change} type="submit" />
                </form>
            </div>
            <FooterPage></FooterPage>
        </Fragment>
    );
}
export default Psw;