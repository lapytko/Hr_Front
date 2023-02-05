import "./index.css";
import AppWrap from "./App";
import * as ReactDOM from 'react-dom';
import "./i18n/config";
import * as React from "react";

ReactDOM.render(
    <React.StrictMode>
        <AppWrap />
    </React.StrictMode>,
    document.getElementById("root"),
);
