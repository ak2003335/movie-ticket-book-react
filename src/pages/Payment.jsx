import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/ticketCart/cart";

const Payment = () => {
  const { ticketItem, grocePrice } = useSelector((state) => state.cart);
  const { singleTheater } = useSelector((state) => state.theater);
  const [isDownload, setIsDownLoad] = useState(false);

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = cookies.user_Token;
  const data = {
    ticketItem,
    id: singleTheater.theater._id,
  };

  const handleBook = async (e) => {
    try {
      await axios.post(
        `https://movie-ticket-server.vercel.app/theater/book-seat`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsDownLoad(true);
      toast.success("Seats Booked");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDownLoad = async () => {
    try {
      const response = await axios.post(`https://movie-ticket-server.vercel.app/auth/download`, data, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ticket.pdf");
      document.body.appendChild(link);
      link.click();
      dispatch(removeItem())
      navigate(`/theater/${data.id}`)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (ticketItem.length > 0) {
      toast.warning("Please do not refresh the page");
    }
  }, []);

  return (
    <div>
      {ticketItem && ticketItem.length > 0 ? (
        <div>
          <table className="table text-light">
            <thead>
              <tr>
                <th scope="col">Sr no.</th>
                <th scope="col">Seat no</th>
                <th scope="col">Theater name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {ticketItem &&
                ticketItem.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.seatDetails.seatNumber}</td>
                    <td>{item.theater}</td>
                    <td>${item.seatDetails.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ float: "right" }}>
            <button className="custBtn px-4" onClick={() => handleBook()}>
              Pay ${grocePrice}
            </button>
            {isDownload && (
              <button
                className="custBtn px-4 mx-2"
                onClick={() => handleDownLoad()}
              >
                Download Ticket
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1>
            <b>
              Nothing to pay please <br /> Book seat
            </b>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Payment;
