import { Layout, Menu } from "antd";
import React from "react";
import logo3 from "../../../public/logo3.png";
import "./Head.css";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Head = () => {
  const menuItems = [
    {
      key: "1",
      label: "Home",
    },
    {
      key: "2",
      label: "servicios",
    },
    {
      key: "3",
      label: "Habitaciones",
    },
    {
      key: "4",
      label: "Contacto",
    },
  ];

  return (
    <Header className="header">
      <Link to={'/'}>
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
    </Header>
  );
};

export default Head;
