import { Button, Card, Checkbox, Form, Input } from "antd";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <Card className="card-form">
        <div className="card">
          <div className="card__logo">
            <img src="../../../public/logo1.png" alt="" />
          </div>
          <div className="">
            <h2>Iniciar sesión</h2>
            <Form initialValues={{ remember: true }} autoComplete="off">
              <Form.Item
                style={{ width: 300 }}
                label="Usuario"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ width: 300 }}  
                label="Contraseña"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
