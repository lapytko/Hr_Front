// additional files
import "./Layout.scss";

// antd
import { Layout as AntLayout } from "antd";

// auth
import { useAuth } from "../Auth/Auth";

// custom components
/*import UserMenu from "../Sider/User/UserMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";*/

// routes
import UserRoutes from "../../routes/user.routes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
//import { CountersProvider } from "./useCountersProvider";

const Layout = ({ isAdmin }: { isAdmin: boolean }) => {
    const { user, logOut } = useAuth();

    return (
      <AntLayout id="entirePage">
                <Header user={user} logOut={logOut} />
                <AntLayout className="site-layout content-sider-wrap">
                   {/* <UserMenu isAdmin={isAdmin} />*/}
                    <AntLayout>
                        <AntLayout.Content
                            id="layoutContent"
                            className="layout-content-wrap"
                        >
                            <UserRoutes isAdmin={isAdmin} />
                        </AntLayout.Content>
                        <Footer />
                    </AntLayout>
                </AntLayout>
            </AntLayout>
    );
};

export default Layout;
