import { onValue, ref } from "firebase/database";
import { db } from "../../firebase.config";
import { useState } from "react";

const getRooms = async () => {
  const [rooms, setRooms] = useState([]);

  const starCountRef = ref(db, "evaluations/");
  onValue(starCountRef, (snapshot) => {
    setRooms(snapshot.val());
  });

  return rooms;
};
