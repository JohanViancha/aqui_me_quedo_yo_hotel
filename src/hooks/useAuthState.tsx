import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";

export const useAuthState = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
        setUser(userData || {})
    });
    return () => unsubscribe();
  }, []);

  return { user};
};
