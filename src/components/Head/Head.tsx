import { Divider, Layout, Menu } from "antd";
import React from "react";
import logo3 from "../../../public/logo3.png";
import "./Head.css";
import { Link } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";
const { Header } = Layout;

const Head = () => {
  const { user } = useAuthState();

  const menuItems = [
    {
      key: "1",
      label: <Link to={"/"}> Home</Link>,
    },
    {
      key: "2",
      label: <Link to={"/search-rooms"}>Buscar habitación</Link>,
    },
  ];

  return (
    <Header className="header">
      <Link to={"/"}>
        <img className="header__logo" src={logo3} alt="Logo" />
      </Link>
      <Menu
        theme="dark"
        className="header__menu"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      <div className="auth">
        {Object.keys(user).length === 0 ? (
          <>
            <Link className="auth__login" to={"/login"}>
              Ingresar
            </Link>
            <Divider
              dashed={true}
              type="vertical"
              style={{ background: "white", height: "64px" }}
            />
            <Link className="auth__register" to={"/register"}>
              Register
            </Link>
          </>
        ) : (
          <Link to={"#"} className="username">
           
          {user['email']}
        </Link>
        )}
      </div>
    </Header>
  );
};

export default Head;
