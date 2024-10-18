import { Carousel, Spin } from "antd";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import { db } from "../../../firebase.config";
import hotel1 from "../../../public/hotel_1.jpg";
import hotel2 from "../../../public/hotel_2.jpg";
import hotel3 from "../../../public/hotel_3.jpg";
import hotel4 from "../../../public/hotel_4.jpg";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Searcher from "../../components/Searcher/Searcher";
import "./Landing.css";

const Landing = () => {
  const [isSpin, setIsSpin] = useState(false);
  const navigate = useNavigate()

  const searchRooms = () => {
    // setIsSpin(true);
    set(ref(db, "rooms/" + `${uuidv4()}`), {
      code: 'E125',
      name: '',
      description: '',
      image:'',
      price:'',
      services:'',
      type: ''
    }).then();
  
  

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
