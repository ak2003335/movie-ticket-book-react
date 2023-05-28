import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [cookies, setCookie] = useCookies();

  const handleChange = (e) => {
    setForm((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://movie-ticket-server.vercel.app/auth/login",
        form
      );

      setCookie("user_Token", response.data.token);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setForm({ username: "", password: "" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="card"
        style={{ width: "25vw", backgroundColor: "#041134" }}
      >
        <h1 className="text-center">
          <b>Login</b>
        </h1>
        <br />
        <form className="mx-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">
              <b>Username</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div className="text-center my-3">
            <button type="submit" className="btn btn-secondary">
              Sign in
            </button>
          </div>
        </form>
        <div className="float-right my-2 mx-3">
          Don't have account :- <Link to={"/signup"}> Signup</Link>
        </div>
      </div>
    </div>
  );
}
