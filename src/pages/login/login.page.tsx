import React, { useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, useLocation,
} from 'react-router-dom';

import "./login.scss";
//import * as logo from "../../assets/images/logo.svg";
import LoginForm from "../../components/LoginForm/LoginForm";
import { message } from "antd";

const LoginPage = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.search.includes("expired")) {
            message.error(
                "Токен авторизации устарел. Пожалуйста авторизуйтесь заново",
            );
        }
    }, [location]);

    console.log("test111")
    return (
        <Router>
            <Route path="/login">
                <div className="login-form flex-row --row-start --flex-col">
                    <div className={"logo-container flex-row --row-center"}>
                     {/*   <img src={logo} width={100} alt="FairCode" />*/}
                        <h1 className={"app-title"} style={{ margin: 0, marginLeft: 10 }}>
                            <b style={{ color: "#0a4463" }}>FairCode</b>
                        </h1>
                    </div>
                    <LoginForm />
                </div>
            </Route>
            <Navigate to={"/login"} />
        </Router>
    );
};

export default LoginPage;
