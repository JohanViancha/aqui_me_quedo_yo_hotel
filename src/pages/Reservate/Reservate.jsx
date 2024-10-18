import { Button, Card, Col, Row, Spin, Image } from "antd";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Searcher from "../../components/Searcher/Searcher";
import "./Reservate.css";

const { Meta } = Card;

const Reservate = () => {
  const [rooms, setRooms] = useState([]);

  const starCountRef = ref(db, "rooms/");
  const searchRooms = () => {
    console.log("On click");
  };

  const getRooms = () => {
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      setRooms(snapshot.val());
    });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div>
      <div className="searcher-reservate">
        <Searcher onClickSearch={searchRooms} />
      </div>

      <Card className="main">
        <div className="grid">
          {Object.keys(rooms).map((key) => {
            return (
              <Card
                key={key}
                style={{ width: 300 }}
                cover={<Image style={{objectFit:'cover'}} width={'100%'} height={200}  src={rooms[key].image} />}
                actions={[
                  <Button key="1" style={{ width: "90%" }}>
                    Reservar
                  </Button>,
                ]}
              >
                <Meta
                  style={{height:100}}
                  title={rooms[key].type}
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

      <main></main>
    </div>
  );
};

export default Reservate;
