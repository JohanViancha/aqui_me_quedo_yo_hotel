import React from "react";
import { Navigate, useNavigate, useRouteError } from "react-router-dom";
import './NotFound.css'
import { Button } from "antd";

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
