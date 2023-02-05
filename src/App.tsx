import React, {memo, useEffect, useState} from "react";

import "./App.less";
import "./app.scss";

// router
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, useLocation,
} from 'react-router-dom';

// auth
import { useAuth, AuthProvider } from "./components/Auth/Auth";

// antd
import ruRU from "antd/lib/locale/ru_RU";

// custom components
import LoginPage from "./pages/login/login.page";

import Layout from "./components/Layout/Layout";

import "moment/locale/ru";
import { useTranslation } from "react-i18next";
import FullScreenLoading from "./components/FullScreenLoading/FullScreenLoading";
import { ConfigProvider, Modal, Result } from "antd";
import { GlobalSettingProvider } from "./hooks/useGlobalSettings";
// import ResetPasswordModal from "./components/ResetPasswordModal";


const App = () => <LoginPage/>

export default function AppWrap() {
    console.log("test")

    return (


                        <App/>


    );
}
