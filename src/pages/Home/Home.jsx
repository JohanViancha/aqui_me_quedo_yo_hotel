import {
  Carousel,
  Layout,
  Menu
} from "antd";
import hotel1 from "../../../public/hotel_1.jpg";
import hotel2 from "../../../public/hotel_2.jpg";
import hotel3 from "../../../public/hotel_3.jpg";
import hotel4 from "../../../public/hotel_4.jpg";
import logo3 from "../../../public/logo3.png";

import "./Home.css";
import Buscador from "../../components/Buscador/Buscador";

const { Header, Content, Footer } = Layout;

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


const Home = () => {
  return (
    <Layout>
      <Header className="header">
        <img className="header__logo" src={logo3} alt="Logo" />
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
      <div className="container-carousel img-1"></div>

      <Content className="content">
        <div className="slides">
          <Carousel dotPosition="left" infinite={true} autoplay>
            <div className="container-carousel">
              <img src={hotel1} />
            </div>
            <div className="container-carousel">
              <img src={hotel2} />
            </div>
            <div className="container-carousel">
              <img src={hotel3} />
            </div>
            <div className="container-carousel">
              <img src={hotel4} />
            </div>
          </Carousel>
        </div>

        <Buscador/>

        
      </Content>

      <section></section>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Nathaly Rodriguez y Jose Sanabria ©{new Date().getFullYear()} Todos los
        derechos reservados
      </Footer>
    </Layout>
  );
};

export default Home;
