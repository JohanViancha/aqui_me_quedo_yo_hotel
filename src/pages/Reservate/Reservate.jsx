import { Spin } from "antd";
import { useState } from "react";
import Searcher from "../../components/Searcher/Searcher";
import './Reservate.css'

const Reservate = () => {
  const [isSpin, setIsSpin] = useState(false);

  const searchRooms = () => {
    setIsSpin(true);
  };

  return (
    <div>
      <div className="searcher-reservate">
        <Searcher onClickSearch={searchRooms} />
      </div>

      <Spin
        spinning={isSpin}
        fullscreen
        size="large"
        tip="Estamos buscando la mejor acomodación para ti..."
      />
    </div>
  );
};

export default Reservate;
