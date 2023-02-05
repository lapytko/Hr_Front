import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, useLocation,
} from 'react-router-dom';

import HomePage from "../pages/home/home.page";
import { useAuth } from "../components/Auth/Auth";
import { getAvailableRoutes } from "../utils/common.utils";
import LoginForm from "../components/LoginForm/LoginForm";
import React from "react";

const UserRoutes = ({ isAdmin }: { isAdmin: boolean }) => {
    const { user } = useAuth();
    const routes = Array.from(getAvailableRoutes(user?.menus));
    const location = useLocation();
    return routes.includes(location.pathname) ? (
        <Router>

            {/*<Route
                path={"/shipmentRequests"}
                component={() => <ShipmentRequestsPage />}
            />*/}
        {/*    <Route
                path={"/settings"}
                component={() => <SettingsPage isAdmin={isAdmin} />}
            />*/}
          {/*  {isAdmin && (
                <Route
                    path={"/user-management"}
                    component={() => <UserManagementPage />}
                />
            )}*/}
            <Route path="/">
                <div className="login-form flex-row --row-start --flex-col">
                    <HomePage />
                </div>
            </Route>
            <Navigate to={"/"} />
        </Router>
    ) : (
        <Navigate to={"/"} />
    );
};

export default UserRoutes;
