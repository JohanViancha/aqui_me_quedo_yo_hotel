import { Layout } from "antd";
import Head from "../../components/Head/Head";
import "./Home.css";

import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;



const Home = () => {

  return (
    <Layout>
      <Head />

      <Content className="content">
        <Outlet/>
      </Content>
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
