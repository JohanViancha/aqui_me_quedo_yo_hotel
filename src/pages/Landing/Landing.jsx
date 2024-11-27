import { Carousel } from "antd";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="slides">
      <div className="carousel">
        <Carousel dotPosition="left" infinite={true} autoplay>
          <div className="container-carousel">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Fhotel_1.jpg?alt=media&token=a61658d9-283f-46b7-8c16-6e91ad9f6048"
              }
            />
          </div>
          <div className="container-carousel">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Fhotel_2.jpg?alt=media&token=8309eeb8-366a-4e1a-94d6-09bdb359207b"
              }
            />
          </div>
          <div className="container-carousel">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Fhotel_3.jpg?alt=media&token=bc7c30f3-efc9-47d8-b3da-c940f9d374eb"
              }
            />
          </div>
          <div className="container-carousel">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/clima-95956.appspot.com/o/hotel%2Fhotel_4.jpg?alt=media&token=354518a7-886e-47fe-b735-25e44665362f"
              }
            />
          </div>
        </Carousel>
      </div>
      <div className="searcher-landing">
        <h2>Tu Escape Soñado en el Corazón de la Ciudad</h2>
        <p>
          Descubre el refugio perfecto para tus vacaciones: comodidad, elegancia
          y vistas inolvidables te esperan en nuestro hotel.
        </p>
      </div>
    </div>
  );
};

export default Landing;
