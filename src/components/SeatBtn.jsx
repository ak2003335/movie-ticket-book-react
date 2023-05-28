import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SeatBtn({ seat, theaterId }) {
    const handleClick  = async(id)=>{
        
    }
  return (
    <div className="col-1">
      <button
        className="singleSeat my-2 px-1"
        style={{ cursor: "pointer" }}
        onClick={() => handleClick(seat._id)}
      >
        {seat.seatNumber}
      </button>
    </div>
  );
}
