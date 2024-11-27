import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Card, Form, Input, notification } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { LoadingContext } from "../../context/useLoadingContext";
import "./Login.css";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading } = useContext(LoadingContext);
  const [api, contextHolder] = notification.useNotification();

  const sendData = async () => {
    isLoading(true);
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");

    signInWithEmailAndPassword(auth, username, password)
      .then((user) => {
        navigate("/");
      })
      .catch(() => {
        openNotificationError("top");
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const openNotificationError = (placement) => {
    api.open({
      message: "Inició de sesión",
      description: "El usuario y/o contraseña son incorrectos",
      icon: <CloseCircleFilled style={{ color: "tomato" }} />,
      placement,
    });
  };

  return (
    <>
      {contextHolder}

      <div className="container">
        <Card className="card-form">
          <div className="card">
            <div className="card__logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Flogo1.png?alt=media&token=22a20c53-15f3-4c24-a638-60c75f95847f"
                alt=""
              />
            </div>
            <div className="">
              <h2>Iniciar Sesión</h2>
              <Form
                className="form"
                initialValues={{ remember: true }}
                autoComplete="off"
                name="login"
                form={form}
                onFinish={sendData}
              >
                <Form.Item
                  className="item-username"
                  label="Usuario"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar tu usuario!",
                    },
                  ]}
                >
                  <Input style={{ width: 250 }} />
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
                  <Input.Password style={{ width: 250 }} />
                </Form.Item>

                <Form.Item className="register">
                  <Link to="/register">
                    ¿No tienes una cuenta? Crear nueva cuenta
                  </Link>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
