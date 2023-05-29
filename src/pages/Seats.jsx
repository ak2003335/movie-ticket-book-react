import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { theaterRed } from "../redux/ticket/ticketSlice";
import axios from "axios";
import { useCookies } from "react-cookie";
import SeatBtn from "../components/SeatBtn";

export default function Seats() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const token = cookies.user_Token;

  const { theater } = useSelector((state) => state.theater.singleTheater);

  console.log(theater);

  const fetchTheater = async () => {
    const response = await axios.get(
      `https://movie-ticket-server.vercel.app/theater/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch(theaterRed(response.data));
  };

  useEffect(() => {
    fetchTheater();
  }, []);

  return (
    <div className="seats">
      {theater ? (
        <div style={{ opacity: "1" }}>
          <div className="text-center">
            <h2>
              <b>{theater.name}</b>
            </h2>
            <h4>
              <b>Movie:- {theater.movieName}</b>
            </h4>
          </div>
          <div
            className="grid-container"
            style={{
              gridTemplateColumns: `repeat(${theater.seatsPerRow}, 1fr)`,
            }}
          >
            {theater.seats.map((seat, index) => (
              <SeatBtn theaterId={theater._id} seat={seat} key={index} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
