import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Registration() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.username || !form.email || !form.password) {
      return toast.error("Please fill all details");
    }

    try {
      const response = await axios.post(
        "https://movie-ticket-server.vercel.app/auth/register",
        form
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setForm({ username: "", email: "", password: "" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="card"
        style={{ width: "25vw", backgroundColor: "#041134" }}
      >
        <h1 className="text-center">
          <b>Sign up</b>
        </h1>
        <br />
        <form className="mx-2" onSubmit={handleSubmit}>
          <div className="form-group my-2">
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
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={form.email}
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
              Sign up
            </button>
          </div>
        </form>
        <div className="float-right my-2 mx-3">
          Already have account :- <Link to={"/signin"}> Sign in</Link>
        </div>
      </div>
    </div>
  );
}
