import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/ticketCart/cart";

export default function SeatBtn({ seat, theater }) {
  const dispatch = useDispatch();

  const [isSeatBooked, setIsSeatBooked] = useState(false);

  const handleClick = async (seatDetails) => {
    if (seat.isBooked) {
      return toast.error("Already booked");
    }

    const data = {
      seatDetails,
      theater,
    };

    dispatch(addItem(data));

    setIsSeatBooked(true);

    setTimeout(() => {
      dispatch(removeItem());
      setIsSeatBooked(false);
    }, 60000 * 5);
  };

  return (
    <div className="grid-item">
      <button
        className={seat.isBooked ? "singleSeatRed" : "singleSeat"}
        style={{
          cursor: "pointer",
          backgroundColor: `${isSeatBooked ? "#bbbb76" : ""}`,
        }}
        onClick={() => handleClick(seat)}
      >
        {seat.seatNumber}
      </button>
    </div>
  );
}
