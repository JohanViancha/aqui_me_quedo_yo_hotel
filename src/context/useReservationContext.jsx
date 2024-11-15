import { createContext, useState } from "react";
import dayjs from "dayjs";

export const ReservationContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ReservationProvider = ({ children }) => {
  const [rangeDate, setRangeDate] = useState([dayjs(),dayjs()]);
  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);
  const [isPets, setIspet] = useState(false);
  const [typeRoom, setTypeRoom] = useState('')
  const [ canReservate, setCanReservate ] = useState(false)


  return (
    <ReservationContext.Provider
      value={{
        rangeDate,
        adults,
        isPets,
        child,
        typeRoom,
        canReservate,
        setCanReservate,
        setTypeRoom,
        setChild,
        setIspet,
        setAdults,
        setRangeDate,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
