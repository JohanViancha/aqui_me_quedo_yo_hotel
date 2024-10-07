import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Menu,
  Space
} from "antd";
import hotel1 from "../../../public/hotel_1.jpg";
import hotel2 from "../../../public/hotel_2.jpg";
import hotel3 from "../../../public/hotel_3.jpg";
import hotel4 from "../../../public/hotel_4.jpg";
import logo3 from "../../../public/logo3.png";

import "./Home.css";

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

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

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

        <Card bordered={false} className="card-reservation">
          <Form className="form-reservation" name="control-hooks">
            <Form.Item label="Fecha" className="form-reservation__item">
              <RangePicker
                placeholder={["Ingreso", "Salida"]}
                renderExtraFooter={() => "extra footer"}
                format={dateFormat}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="travelers"
              label="Viajeros"
              className="form-reservation__item"
            >
              <div className="card-reservation__travelers">
                <InputNumber placeholder="Adultos" min={1} max={10} />
                <InputNumber placeholder="Niños" min={1} max={10} />
              </div>
            </Form.Item>

            <Form.Item
              name="rooms"
              label="Habitaciones"
              className="form-reservation__item"
            >
              <InputNumber placeholder="Habitaciones" min={1} max={10} />
            </Form.Item>

            <Form.Item className="form-reservation__item">
              <Space>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
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
