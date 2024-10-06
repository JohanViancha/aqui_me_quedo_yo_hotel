import {
  Button,
  Card,
  Carousel,
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import hotel1 from "../../assets/hotel_1.jpg";
import logo2 from "../../assets/logo2.png";
import hotel2 from "../../assets/hotel_2.jpg";
import hotel3 from "../../assets/hotel_3.jpg";
import hotel4 from "../../assets/hotel_4.jpg";
import "./Home.css";

const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <img className="header__logo" src={logo2} alt="Logo" />
        <Menu
          theme="dark"
          className="header__menu"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>

      <Content className="content">
        <Carousel arrows dotPosition="left" infinite={false}>
          <div className="container-carousel">
            <img className="container-carousel__img" src={hotel1} alt="" />
          </div>
          <div className="container-carousel">
            <img className="container-carousel__img" src={hotel2} alt="" />
          </div>
          <div className="container-carousel">
            <img className="container-carousel__img" src={hotel3} alt="" />
          </div>
          <div className="container-carousel">
            <img className="container-carousel__img" src={hotel4} alt="" />
          </div>
        </Carousel>

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
                <InputNumber
                  placeholder="Adultos"
                  min={1}
                  max={10}
                  defaultValue={""}
                />
                <InputNumber
                  placeholder="Niños"
                  min={1}
                  max={10}
                  defaultValue={""}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="rooms"
              label="Habitaciones"
              className="form-reservation__item"
            >
              <InputNumber
                placeholder="Habitaciones"
                min={1}
                max={10}
                defaultValue={""}
              />
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
