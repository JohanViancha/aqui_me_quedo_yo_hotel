import { CloseOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tooltip, notification, Tag } from "antd";
import dayjs from "dayjs";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useMemo, useState, createContext } from "react";
import { db } from "../../../firebase.config";
import { auth } from "../../../firebase.config.ts";
import "./TableReservations.css";

dayjs.locale("es");
const Context = createContext({
  name: "Default",
});
const reservationRef = ref(db, "reservations/");

const TableRerservations = () => {
  const [api, contextHolder] = notification.useNotification();

  const [reservations, setReservations] = useState([]);

  const loadReservations = () => {
    onValue(reservationRef, (snapshot) => {
      filterRerservations(Object.entries(snapshot.val()));
    });
  };

  const openNotification = (placement, message, title) => {
    api.info({
      message: title,
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  const filterRerservations = (reservations) => {
    const userCurrent = auth.currentUser;
    const result = reservations.filter(
      (reservation) => reservation[1].user.uid === userCurrent.uid
    );
    setReservations(result);
  };

  const columns = [
    {
      title: "Fecha ingreso",
      key: "start-date",
      render: (text) => (
        <span>{dayjs(text[1]["start-date"]).format("DD MMMM YYYY")}</span>
      ),
    },
    {
      title: "Fecha salida",
      key: "end-date",
      render: (text) => (
        <span>{dayjs(text[1]["end-date"]).format("DD MMMM YYYY")}</span>
      ),
    },
    {
      title: "Nombre habitación",
      key: "name",
      render: (text) => {
        const rooms = Object.values(text[1]["rooms"]);
        return <span>{rooms[0].name}</span>;
      },
    },
    {
      title: "Tipo habitación",
      key: "hab",
      render: (text) => {
        const rooms = Object.values(text[1]["rooms"]);
        return (
          <span style={{ textTransform: "capitalize" }}>{rooms[0].type}</span>
        );
      },
    },
    {
      title: "Estado",
      key: "state",
      render: (text) => <b>{text[1].total}</b>,
    },
    {
      title: "Estado",
      key: "state",
      render: (text) => (
        <Tag color={text[1].state === "Cancelada" ? "error" : "success"}>
          {" "}
          {text[1]["state"]}{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Tooltip title="Solo puedes cancelar 3 días antes de la fecha de ingreso">
            {data[1].state !== "Cancelada" && (
              <Button
                disabled={
                  dayjs(new Date(data[1]["start-date"])).diff(
                    dayjs(new Date()),
                    "day"
                  ) <= 3 || data[1].state === "Cancelada"
                }
                color="danger"
                variant="outlined"
                onClick={() => cancelReservation(data[0])}
              >
                {" "}
                <CloseOutlined />
                Cancelar{" "}
              </Button>
            )}
          </Tooltip>
        </Space>
      ),
    },
  ];

  const cancelReservation = (uid) => {
    update(ref(db, "reservations/" + `${uid}`), {
      state: "Cancelada",
    }).then(() => {
      openNotification(
        "topLeft",
        "La reserva ha sido cancelada correctamente",
        "Cancelación de reserva"
      );
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  useEffect(() => {
    loadReservations();
  }, []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="main">
        <h2>Mis reservas</h2>
        <Table
          row
          className="table"
          columns={columns}
          dataSource={reservations}
        />
      </div>
    </Context.Provider>
  );
};

export default TableRerservations;
