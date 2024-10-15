import { Carousel, Spin } from "antd";
import React, { useState } from "react";
import hotel1 from "../../../public/hotel_1.jpg";
import hotel2 from "../../../public/hotel_2.jpg";
import hotel3 from "../../../public/hotel_3.jpg";
import hotel4 from "../../../public/hotel_4.jpg";
import Searcher from "../../components/Searcher/Searcher";
import { v4 as uuidv4 } from "uuid";
import "./Landing.css";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../../firebase.config";

const Landing = () => {
  const [isSpin, setIsSpin] = useState(false);

  const searchRooms = () => {
    setIsSpin(true);

    const starCountRef = ref(db, "evaluations/");
    onValue(starCountRef, (snapshot) => {
      
    });
  };
  return (
    <>
      <div className="slides">
        <div className="carousel">
          <Carousel dotPosition="left" infinite={true} autoplay>
            <div className="container-carousel">
              <img src={hotel1} />
            </div>
            <div className="container-carousel">
              <img src={hotel2} />
            </div>
            <div className="container-carousel">
              <img src={hotel3} />
            </div>
            <div className="container-carousel">
              <img src={hotel4} />
            </div>
          </Carousel>
        </div>
        <div className="searcher-landing">
          <Searcher onClickSearch={searchRooms} />
        </div>  
      </div>

      <Spin
        spinning={isSpin}
        fullscreen
        size="large"
        tip="Estamos buscando la mejor acomodación para ti..."
      />
    </>
  );
};

export default Landing;
