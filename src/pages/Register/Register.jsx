import { Button, Card, Form, Input } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { LoadingContext } from "../../context/useLoadingContext";
import "./Register.css";

// const servicesId = import.meta.env.VITE_SERVICE_ID;
// const templateId = import.meta.env.VITE_TEMPLATE_ID;
// const publicKey = import.meta.env.VITE_PUBLIC_KEY;
// const domainUrl = import.meta.env.VITE_DOMAIN_URL;

const Register = () => {
  const [form] = Form.useForm();
  const { isLoading } = useContext(LoadingContext);
  

  const sendData = async () => {
    isLoading(true);
    try {
      const name = form.getFieldValue("name");
      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      }); 
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="container">
      <Card className="card-form">
        <div className="card">
          <div className="card__logo">
            <img src="../../../public/logo1.png" alt="" />
          </div>
          <div>
            <h2>Crear cuenta</h2>
            <Form
              className="form"
              initialValues={{ remember: true }}
              autoComplete="off"
              name="login"
              form={form}
              onFinish={sendData}
            >
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar tu nombre completo!",
                  },
                ]}
              >
                <Input style={{ width: "250px" }} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar tu email!",
                  },
                ]}
              >
                <Input style={{ width: "250px" }} />
              </Form.Item>

              <Form.Item
                className="item-password"
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar tu contraseña!",
                  },
                ]}
              >
                <Input.Password style={{ width: "250px" }} />
              </Form.Item>

              <Form.Item
                className="item-password"
                label="Confirmar contraseña"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Por favor confirma tu contraseña!",
                  },
                  {},
                ]}
              >
                <Input.Password style={{ width: "250px" }} />
              </Form.Item>

              <Form.Item className="register">
                <Link to="/login">Ya tengo una cuenta. Iniciar sesión</Link>
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Crear cuenta
              </Button>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
