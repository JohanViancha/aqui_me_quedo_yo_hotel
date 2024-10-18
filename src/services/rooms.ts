import { onValue, ref } from "firebase/database";
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";

const getRoomsAll = () => {
  const [rooms, setRooms] = useState([]);

  const starCountRef = ref(db, "rooms/");
  onValue(starCountRef, (snapshot) => {
    setRooms(rooms)
  });

  useEffect(()=>{
    getRoomsAll()
  },[ ])
};

export { getRoomsAll };
