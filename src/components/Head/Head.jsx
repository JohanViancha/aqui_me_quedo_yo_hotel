import { Divider, Layout, Menu, Dropdown, Button } from "antd";
import "./Head.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState.jsx";
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config.ts";

const { Header } = Layout;

const Head = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      label: (
        <Link className="item" to={"/"}>
          {" "}
          <HomeFilled /> <span>Inicio</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link className="item" to={"/search-rooms"}>
          {" "}
          <SearchOutlined />
          <span>Reservar</span>
        </Link>
      ),
    },
  ];

  const items = [
    {
      label: "Mis reservas",
      key: "1",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Cerrar sesión",
      key: "signout",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "signout") {
      signOut(auth).then(() => {
        navigate("/login");
      });
      return;
    }
    navigate("/my-reservations");
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header className="header">
      <Link to={"/"}>
        <img
          className="header__logo"
          src={
            "https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Flogo3.png?alt=media&token=fe9f5fb6-1253-4e0c-9652-9a821b628fb7"
          }
          alt="Logo"
        />
      </Link>
      <Menu
        theme="dark"
        className="header__menu"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuItems}
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
              Registrar
            </Link>
          </>
        ) : (
          <div className="username">
            <Dropdown menu={menuProps}>
              <Button color="default" variant="outline" icon={<UserOutlined />}>
                {" "}
                {user["email"]}
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </Header>
  );
};

export default Head;
