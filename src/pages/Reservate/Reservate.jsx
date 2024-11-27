import { TeamOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import {
  Button,
  Card,
  Divider,
  Image,
  Modal,
  notification,
  Spin,
  Tag,
  Typography,
  Alert,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { onValue, ref, set } from "firebase/database";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebase.config";
import { auth } from "../../../firebase.config.ts";
import Searcher from "../../components/Searcher/Searcher";
import { LoadingContext } from "../../context/useLoadingContext";
import { ReservationContext } from "../../context/useReservationContext";
import "./Reservate.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Context = createContext({
  name: "Default",
});
const { Text } = Typography;
dayjs.locale("es");

const servicesId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

const Reservate = () => {
  const [rooms, setRooms] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const [diferenciesDay, setDiferencesDay] = useState(0);
  const [roomSelected, setroomSelected] = useState({});
  const { isLoading, loading } = useContext(LoadingContext);
  const { rangeDate, canReservate, setCanReservate } =
    useContext(ReservationContext);
  // const { user } = useAuthState();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Habitación Reservada`,
      description: (
        <Context.Consumer>
          {() =>
            "La habitación ha sido reservada. Hemos enviado un correo con la información de la reserva"
          }
        </Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const RoomsRef = ref(db, "rooms/");
  const reservationRef = ref(db, "reservations/");

  const validarDisponibility = (start1, end1, start2, end2) => {
    return start1 <= end2 && start2 <= end1;
  };

  const searchRooms = (date, adults, children = 0, typeRoom, isPets) => {
    setShouldReset(false);
    setDiferencesDay(
      dayjs(new Date(date[1]["$d"])).diff(dayjs(new Date(date[0]["$d"])), "day")
    );
    onValue(reservationRef, (snapshot) => {
      const roomsBusy = [];
      if (!snapshot.val()) {
        getRoomsAll(roomsBusy, adults + children, isPets, typeRoom);
        return;
      }
      const keys = Object.keys(snapshot.val());
      keys.forEach((key) => {
        console.log(snapshot.val()[key]["state"])

        const check = validarDisponibility(
          new Date(snapshot.val()[key]["start-date"]),
          new Date(snapshot.val()[key]["end-date"]),
          new Date(date[0]["$d"]),
          new Date(date[1]["$d"])
        ) && snapshot.val()[key]["state"] === "Confirmada";
        if (check) roomsBusy.push(Object.keys(snapshot.val()[key]["rooms"])[0]);
      });
      getRoomsAll(roomsBusy, adults + children, isPets, typeRoom);
    });
  };

  const getRoomsAll = (busy = [], people = 0, isPets, typeRoom) => {
    isLoading(true);
    onValue(RoomsRef, (snapshot) => {
      const rooms = snapshot.val();
      for (const key in rooms) {
        if (busy.includes(key) || people > rooms[key]["people"]) {
          delete rooms[key];
        }
        if (
          rooms[key] &&
          isPets !== 0 &&
          !!isPets &&
          isPets !== rooms[key]["havePets"]
        ) {
          delete rooms[key];
        }
        if (
          rooms[key] &&
          typeRoom &&
          typeRoom !== "todos" &&
          typeRoom !== rooms[key]["type"]
        ) {
          delete rooms[key];
        }
      }

      setRooms(rooms);
      isLoading(false);
    });
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      currency: "COP",
    }).format(value);
  };

  const showModal = (room, key) => {
    setisOpen(true);
    setroomSelected({ key, room });
  };

  const handleOk = () => {
    const key = uuidv4();
    const user = auth.currentUser;

    set(ref(db, "reservations/" + `${key}`), {
      "start-date": String(new Date(rangeDate[0]["$d"])),
      "end-date": String(new Date(rangeDate[1]["$d"])),
      state: "Confirmada",
      total: formatPrice(roomSelected.room["price"] * diferenciesDay),
      rooms: { [roomSelected.key]: roomSelected.room },
      user: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      },
      key: key,
    }).then(() => {
      setisOpen(false);
      openNotification("topLeft");
      setShouldReset(true);

      const templateParams = {
        user: user.displayName,
        name: roomSelected.room["name"],
        start: dayjs(new Date(rangeDate[0])).format("DD MMMM YYYY"),
        end: dayjs(new Date(rangeDate[1])).format("DD MMMM YYYY"),
        type: roomSelected.room["type"],
        people: roomSelected.room["people"],
        total: formatPrice(roomSelected.room["price"] * diferenciesDay),
        email: user.email,
      };

      emailjs.send(servicesId, templateId, templateParams, { publicKey }).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

      getRoomsAll();
    });
  };

  const handleCancel = () => {
    setisOpen(false);
    setroomSelected({});
  };

  useEffect(() => {
    setCanReservate(false);
    getRoomsAll();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <div className="searcher-reservate">
          <Searcher onClickSearch={searchRooms} shouldReset={shouldReset} />
          {!auth.currentUser && (
            <Alert
              className="alert"
              closable
              action={
                <Button size="small" color="primary" variant="outlined">
                  <Link to={"/login"}>Iniciar sesión</Link>
                </Button>
              }
              message="Recuerda que solo podrás realizar la reserva de las habitaciones si estás logueado. Te invitamos a iniciar sesión"
              type="info"
              showIcon
            />
          )}
        </div>
        <Card className="main">
          <div className="grid">
            {Object.keys(rooms).length === 0 && !loading && (
              <span style={{ textAlign: "center" }}>
                Lo sentimos, no encontramos habitaciones disponibles para las
                fechas y preferencias seleccionadas. Intenta con otras fechas o
                ajusta los filtros para ver más opciones.
              </span>
            )}

            {loading && (
              <span>Estamos buscando la mejor habitación para ti.</span>
            )}

            {Object.keys(rooms).map((key) => {
              return (
                <Card
                  title={rooms[key].name}
                  key={key}
                  style={{ width: 300 }}
                  cover={
                    <Image
                      style={{ objectFit: "cover" }}
                      width={"100%"}
                      height={200}
                      src={rooms[key].image}
                    />
                  }
                  actions={[
                    <>
                      <Text strong style={{ fontSize: "20px" }}>
                        {`${formatPrice(rooms[key]["price"])}`}{" "}
                      </Text>{" "}
                      noche
                      <br />
                      {diferenciesDay !== 0 && (
                        <>
                          {" "}
                          <Text strong style={{ fontSize: "16px" }}>
                            {`${formatPrice(
                              rooms[key]["price"] * diferenciesDay
                            )}(${diferenciesDay})`}{" "}
                          </Text>
                          total
                        </>
                      )}
                      {auth.currentUser && (
                        <Button
                          key="1"
                          style={{ width: "90%", marginTop: "20px" }}
                          disabled={!canReservate}
                          onClick={() => showModal(rooms[key], key)}
                        >
                          Reservar
                        </Button>
                      )}
                    </>,
                  ]}
                >
                  <Meta
                    style={{ height: 100 }}
                    title={
                      <>
                        <Text
                          strong
                          style={{
                            fontSize: "17px",
                            textTransform: "capitalize",
                          }}
                        >
                          Habitación {rooms[key].type}{" "}
                        </Text>
                        <Tag icon={<TeamOutlined />} color="default">
                          {rooms[key].people}
                        </Tag>
                        {rooms[key].havePets === 1 && (
                          <Tag icon={<MdOutlinePets />} color="default"></Tag>
                        )}
                      </>
                    }
                    description={rooms[key].description}
                  />
                </Card>
              );
            })}
          </div>
        </Card>

        <Spin
          spinning={false}
          fullscreen
          size="large"
          tip="Estamos buscando la mejor acomodación para ti..."
        />

        <Modal
          title="Confirmar Reserva"
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Divider type="horizontal" />

          {roomSelected.room && (
            <>
              <strong>Datos de Reserva:</strong>
              <p>
                <strong>Fecha de ingreso :</strong>
                {dayjs(new Date(rangeDate[0])).format("DD MMMM YYYY")}
                <br />
                <strong>Fecha de salida :</strong>{" "}
                {dayjs(new Date(rangeDate[1])).format("DD MMMM YYYY")}
                <br />
                <strong>Nombre de la hab.: </strong>
                {roomSelected?.room.name}
                <br />
                <strong>Código de la hab.: </strong> {roomSelected.room.code}
                <br />
                <strong>Tipo de hab.: </strong>{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {roomSelected.room.type}
                </span>
                <br />
                <strong>Cant de personas: </strong>{" "}
                <span>{roomSelected.room.people}</span>
                <br />
                <strong>Precio por noche: </strong>{" "}
                {formatPrice(roomSelected?.room.price)}
                <br />
                <strong>Total :</strong>{" "}
                {formatPrice(roomSelected?.room.price * diferenciesDay)}
              </p>
            </>
          )}
          <Divider type="horizontal" />

          <p>
            ¿Estas seguro que deseas realizar esta reserva?, por favor confirma
            tu reserva
          </p>
        </Modal>
      </div>
    </Context.Provider>
  );
};

export default Reservate;
