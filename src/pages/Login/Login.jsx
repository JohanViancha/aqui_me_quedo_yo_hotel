import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Card, Form, Input, notification } from "antd";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import "./Login.css";
import { useContext } from "react";
import { LoadingContext } from "../../context/useLoadingContext";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading } = useContext(LoadingContext);
  const [api, contextHolder] = notification.useNotification();

  const sendData = async () => {
    isLoading(true);
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, username, password)
        .then(() => {
          isLoading(false);
          navigate("/");
        })
        .catch(() => {
          openNotificationError("top");
          isLoading(false);
        });
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
              <img src="../../../public/logo1.png" alt="" />
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
                  style={{ width: 350 }}
                  label="Usuario"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar tu usuario!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  className="item-password"
                  style={{ width: 350 }}
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar tu contraseña!",
                    },
                  ]}
                >
                  <Input.Password />
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
