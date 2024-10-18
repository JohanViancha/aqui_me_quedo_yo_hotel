import { DollarOutlined, TeamOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import { Button, Card, Image, Modal, Spin, Tag, notification } from "antd";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Searcher from "../../components/Searcher/Searcher";
import "./Reservate.css";
import { createContext, useMemo } from "react";

const { Meta } = Card;

const Context = createContext({
  name: "Default",
});

const Reservate = () => {
  const [rooms, setRooms] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const [roomSelected, setroomSelected] = useState({});
  const [date, setdate] = useState([]);

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

  const searchRooms = ({ date, adults, children }) => {
    onValue(reservationRef, (snapshot) => {
      const keys = Object.keys(snapshot.val());
      const roomsBusy = [];
      keys.forEach((key) => {
        const check = validarDisponibility(
          new Date(snapshot.val()[key]["start-date"]),
          new Date(snapshot.val()[key]["end-date"]),
          new Date(date[0]["$d"]),
          new Date(date[1]["$d"])
        );
        if (check) roomsBusy.push(snapshot.val()[key]["rooms"]);
      });
      setdate([
        String(new Date(date[0]["$d"])),
        String(new Date(date[1]["$d"])),
      ]);
      getRoomsAll(roomsBusy, adults + children);
    });
  };

  const getRoomsAll = (busy = [], people = 0) => {
    onValue(RoomsRef, (snapshot) => {
      const rooms = snapshot.val();
      for (const key in rooms) {
        if (busy.includes(key) || people > rooms[key]["people"]) {
          delete rooms[key];
        }
      }

      setRooms(rooms);
    });
  };

  const showModal = (keyRoom) => {
    setisOpen(true);
    setroomSelected(keyRoom);
  };

  const handleOk = () => {
    set(ref(db, "reservations/" + `${uuidv4()}`), {
      "start-date": date[0],
      "end-date": date[1],
      state: "registrado",
      rooms: roomSelected,
    }).then(() => {
      setisOpen(false);
      openNotification("topLeft");
    });
  };

  const handleCancel = () => {
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
            {Object.keys(rooms).length === 0 && (
              <span style={{ textAlign: "center" }}>
                Lo sentimos, no encontramos habitaciones disponibles para las
                fechas y preferencias seleccionadas. Intenta con otras fechas o
                ajusta los filtros para ver más opciones.
              </span>
            )}

            {Object.keys(rooms).map((key) => {
              return (
                <Card
                  title={rooms[key].name}
                  extra={
                    <Tag icon={<DollarOutlined />} color="processing">
                      {rooms[key].price}
                    </Tag>
                  }
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
                    <Button
                      key="1"
                      style={{ width: "90%" }}
                      disabled={date.length == 0}
                      onClick={() => showModal(key)}
                    >
                      Reservar
                    </Button>,
                  ]}
                >
                  <Meta
                    style={{ height: 100 }}
                    title={
                      <>
                        {rooms[key].type}{" "}
                        <Tag icon={<TeamOutlined />} color="default">
                          {rooms[key].people}
                        </Tag>
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
