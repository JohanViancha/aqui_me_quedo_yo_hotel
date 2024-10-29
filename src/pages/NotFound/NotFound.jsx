import { Button } from "antd";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate()
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <span>Lo siento, no hemos podido encontrar esta página.</span>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="primary" onClick={()=> navigate('/')}>Ir al inicio</Button>
    </div>
  );    
};

export default NotFound;
