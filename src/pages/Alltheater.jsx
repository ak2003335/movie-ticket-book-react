import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { allTheaters } from "../redux/ticket/ticketSlice";
import TheaterCard from "../components/TheaterCard";

export default function Alltheater() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();

  const { allTheater } = useSelector((state) => state.theater);

  const token = cookies.user_Token;

  const fetchTheater = async () => {
    try {
      const response = await axios.get(
        "https://movie-ticket-server.vercel.app/theater/all-theaters",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(allTheaters(response.data.theaters));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheater();
  }, []);

  return (
    <div>
      <h1 className="text-center">
        <b>Book Ticket</b>
      </h1>
        <p className="text-center"><b>Book your seat on your favourite theater </b></p>
      <div className="row container" style={{display:"flex" , justifyContent:"center"}}>
        {allTheater.map((theater) => (
          <TheaterCard theater={theater} key={theater._id} />
        ))}
      </div>
    </div>
  );
}
