import { Avatar, Dropdown, Layout, Menu } from "antd";
import {
    DownOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
/*import logo from "../../assets/images/logo-caspel.svg";*/

import { User } from "../../models/common-interfaces";

const Header = ({
                    user,
                    logOut,
                }: {
    user: User | null;
    logOut: () => void;
}) => {
    const menu = (
        <Menu>
            <Menu.Item key="0">
        <span className={"flex-row --row-start span-link"}>
          <UserOutlined style={{ fontSize: "20px" }} />
          <span style={{ paddingLeft: 10 }}>Профиль</span>
        </span>
            </Menu.Item>
            <Menu.Item key="1">
        <span className={"flex-row --row-start span-link"}>
          <SettingOutlined style={{ fontSize: "20px" }} />
          <span style={{ paddingLeft: 10 }}>Настройки</span>
        </span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
        <span
            onClick={() => logOut()}
            className={"flex-row --row-start span-link"}
        >
          <LogoutOutlined style={{ fontSize: "20px" }} />
          <span style={{ paddingLeft: 10 }}>Выйти</span>
        </span>
            </Menu.Item>
        </Menu>
    );

    const userName = user?.userName;

    return (
        <Layout.Header className="header">
            <div className={"logo-container flex-row --row-start"}>
         {/*       <img style={{ marginLeft: 50 }} src={logo} alt="FMark App" />*/}
                <h1
                    className={"app-title"}
                    style={{ margin: 0, fontSize: 20, marginLeft: 10 }}
                >
                    <b style={{ color: "#0a4463" }}>FairCode</b>
                </h1>
            </div>
            <div />
            <div
                className="flex-row --row-end"
                style={{ cursor: "pointer", marginRight: 50 }}
            >
                <Dropdown
                    className={"flex-row --row-center"}
                    overlayStyle={{ width: "160px" }}
                    overlay={menu}
                    trigger={["click"]}
                >
          <span className="ant-dropdown-link flex-row bold-row height-100">
            <Avatar
                style={{
                    color: "white",
                    background: "#0a4463",
                    marginRight: "10px",
                }}
                icon={<UserOutlined />}
            />
            <span className={"profile-dd-text"} style={{ padding: "0 10px" }}>
              {userName || "Админ"}
            </span>
            <DownOutlined style={{ fontSize: "14px", marginTop: "3px" }} />
          </span>
                </Dropdown>
            </div>
        </Layout.Header>
    );
};

export default Header;
