import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { logout , login} from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, isLoggedin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://movie-ticket-server.vercel.app/auth/logout"
      );

      setCookie("user_Token", null);
      dispatch(logout());
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      // toast.error(error.response);
    }
  };

  const token = cookies.user_Token;

  const fetchData = async () => {
    const response = await axios.get(
      "https://movie-ticket-server.vercel.app/auth/me",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch(login(response.data));
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" to={"/"}>
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1100748499/thumb/12.jpg?ip=x480"
            alt=""
            height={60}
          />
          <h2 style={{ marginLeft: "-25px", marginTop: "10px" }}>
            <b>
              Movie<span className="clr">Tic</span>{" "}
            </b>
          </h2>
        </Link>
        <div className="float-right">
          {!isLoggedin ? (
            <Link className="custBtn px-4 mx-3" to={"/signin"}>
              <b>SIGN IN</b>
            </Link>
          ) : (
            ""
          )}
          {isLoggedin ? (
            <button className="custBtn px-4 mx-3" onClick={handleLogout}>
              <b>Logout</b>
            </button>
          ) : (
            ""
          )}
          {isLoggedin ? (
            <Link className="custBtn px-4" to={"/book-ticket"}>
              <b>BOOK TICKET</b>
            </Link>
          ) : (
            ""
          )}
          {/* {isLoggedin && user.role == 'ownwer' ? (
            <Link className="custBtn px-4" to={"/upload-theater"}>
              <b>UPLOAD THEATER</b>
            </Link>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </nav>
  );
}
