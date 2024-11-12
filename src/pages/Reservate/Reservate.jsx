import { TeamOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Image,
  Modal,
  notification,
  Spin,
  Tag,
  Typography,
} from "antd";
import { onValue, ref, set } from "firebase/database";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebase.config";
import Searcher from "../../components/Searcher/Searcher";
import { LoadingContext } from "../../context/useLoadingContext";
import { ReservationContext } from "../../context/useReservationContext";
import "./Reservate.css";
import dayjs from "dayjs";

const { Meta } = Card;

const Context = createContext({
  name: "Default",
});
const { Text } = Typography;

const Reservate = () => {
  const [rooms, setRooms] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const [diferenciesDay, setDiferencesDay] = useState(0);
  const [roomSelected, setroomSelected] = useState({});
  const { isLoading, loading } = useContext(LoadingContext);
  const { rangeDate, canReservate } = useContext(ReservationContext);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Habitación Reservada`,
      description: (
        <Context.Consumer>
          {() => "La habitación ha sido reservada correctamente"}
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
    isPets = isPets === 0 ? undefined : isPets === 1 ? true : false;
    console.log(date)
    console.log(adults)
    console.log(children)
    console.log(typeRoom)
    console.log(isPets)
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
        const check = validarDisponibility(
          new Date(snapshot.val()[key]["start-date"]),
          new Date(snapshot.val()[key]["end-date"]),
          new Date(date[0]["$d"]),
          new Date(date[1]["$d"])
        );
        if (check) roomsBusy.push(snapshot.val()[key]["rooms"]);
      });
      getRoomsAll(roomsBusy, adults + children, isPets, typeRoom);
    });
  };

  const getRoomsAll = (
    busy = [],
    people = 0,
    isPets = undefined,
    typeRoom = undefined
  ) => {
    isLoading(true);
    onValue(RoomsRef, (snapshot) => {
      const rooms = snapshot.val();
      for (const key in rooms) {
        if (busy.includes(key) || people > rooms[key]["people"]) {
          delete rooms[key];
        }
        if (isPets !== undefined && isPets !== rooms[key]["havePets"]) {
          delete rooms[key];
        }
        console.log(typeRoom)
        console.log(rooms[key]['type'])
        if (typeRoom && typeRoom !== JSON.stringify(rooms[key]["type"])) {
          delete rooms[key];
        }
      }

      setRooms(rooms);
      isLoading(false);
    });
  };

  const showModal = (room) => {
    setisOpen(true);
    setroomSelected(room);
  };

  const handleOk = () => {
    set(ref(db, "reservations/" + `${uuidv4()}`), {
      "start-date": new Date(rangeDate[0]["$d"]),
      "end-date": new Date(rangeDate[1]["$d"]),
      state: "registrado",
      rooms: roomSelected,
    }).then(() => {
      setisOpen(false);
      openNotification("topLeft");
    });
  };

  const handleCancel = () => {
    setisOpen(false);
    setroomSelected({});
  };

  useEffect(() => {
    getRoomsAll();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <div className="searcher-reservate">
          <Searcher onClickSearch={searchRooms} />
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
                        {`${new Intl.NumberFormat("en-US", {
                          style: "currency",
                          minimumFractionDigits: 0,
                          currency: "COP",
                        }).format(rooms[key].price)}`}{" "}
                      </Text>{" "}
                      noche
                      <br />
                      {diferenciesDay !== 0 && (
                        <>
                          {" "}
                          <Text strong style={{ fontSize: "16px" }}>
                            {`${new Intl.NumberFormat("en-US", {
                              style: "currency",
                              minimumFractionDigits: 0,
                              currency: "COP",
                            }).format(diferenciesDay * rooms[key].price)}`}{" "}
                          </Text>
                          total
                        </>
                      )}
                      <Button
                        key="1"
                        style={{ width: "90%", marginTop: "20px" }}
                        disabled={!canReservate}
                        onClick={() => showModal(rooms[key])}
                      >
                        Reservar
                      </Button>
                      ,
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
                        {rooms[key].havePets && (
                          <Tag icon={<MdOutlinePets />} color="default">
                            {" "}
                          </Tag>
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
          <p>
            ¿Estas seguro que deseas realizar esta reserva?, por favor confirma
            tu reserva{" "}
          </p>
        </Modal>
      </div>
    </Context.Provider>
  );
};

export default Reservate;
