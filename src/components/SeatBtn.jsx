import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SeatBtn({ seat, theaterId }) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const token = cookies.user_Token;
  const [isSeatBooked, setIsSeatBooked] = useState(seat.isBooked);

  const handleClick = async (id) => {
    if(seat.isBooked){
      return toast.error("Already booked")
    }
    try {
      await axios.post(
        `https://movie-ticket-server.vercel.app/theater/${theaterId}/${id}`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Seat Booked");
      setIsSeatBooked(true);
      navigate(`/theater/${theaterId}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="grid-item">
      <button
        className={isSeatBooked ? "singleSeatRed" : "singleSeat"}
        style={{ cursor: "pointer" }}
        onClick={() => handleClick(seat._id)}
      >
        {seat.seatNumber}
      </button>
    </div>
  );
}
