import { updateProfile, User, verifyBeforeUpdateEmail } from "firebase/auth";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Verify = () => {
  const location = useLocation();

  useEffect(() => {
  
      const queryParams = new URLSearchParams(location.search);
      const oobCode = JSON.parse(queryParams.get("oobCode")!);
      console.log(oobCode)

  })
    

  return (
    <div className="">
      <h1>Test</h1>
    </div>
  );
};

export default Verify;
