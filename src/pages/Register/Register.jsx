import { Button, Card, Form, Input, notification } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { LoadingContext } from "../../context/useLoadingContext";
import "./Register.css";

const Context = createContext({
  name: "Default",
});

const Register = () => {
  const [form] = Form.useForm();
  const { isLoading } = useContext(LoadingContext);
  const [api, contextHolder] = notification.useNotification();

  const sendData = async () => {
    isLoading(true);
    try {
      const name = form.getFieldValue("name");
      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");
      const confirmPassword = form.getFieldValue("confirmPassword");

      if (password !== confirmPassword) {
        openNotification(
          "topLeft",
          "La contraseña no coincide con la confirmación de la contrasseña",
          "Registro de usuario",
          "error"
        );
        return;
      }


        if(password.length < 6 ){
          openNotification(
            "topLeft",
            "La contraseña debe contener 6 o más caracteres",
            "Registro de usuario",
            "error"
          );
          return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      });

      openNotification(
        "topLeft",
        "El usuario ha sido creado correctamente",
        "Registro de usuario",
        "info"
      );
      form.resetFields(['name','email', 'password', 'confirmPassword'])
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
      
    }
  };

  const openNotification = (placement, message, title, type) => {
    api[type]({
      message: title,
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
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
                    },{
                      type: 'email',
                      message: 'El email no tiene el formato correcto'
                    }
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
    </Context.Provider>
  );
};

export default Register;
