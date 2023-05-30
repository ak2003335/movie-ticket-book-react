import React, { useEffect } from "react";
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

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = cookies.user_Token;

  const handleBook = async (e) => {
    const data = {
      ticketItem,
      id: singleTheater.theater._id,
    };

    try {
      const response = await axios.post(
        `https://movie-ticket-server.vercel.app/theater/book-seat`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Seats Booked");
      dispatch(removeItem());
      navigate(`/theater/${singleTheater.theater._id}`);
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
          <button
            className="custBtn px-4"
            style={{ float: "right" }}
            onClick={() => handleBook()}
          >
            Pay ${grocePrice}
          </button>
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
