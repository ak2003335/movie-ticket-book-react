import React, { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    toast.success(form.email)

    setForm({ email: "", password: "" });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="card" style={{ width: "25vw", backgroundColor:"#041134" }}>
        <h1 className="text-center">
          <b>Login</b>
        </h1>
        <br />
        <form className="mx-2" onSubmit={handleSubmit}>
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
              Sign in
            </button>
          </div>
        </form>
      <div className="float-right my-2 mx-3">Don't have account :- <Link to={'/signup'}> Signup</Link></div>
      </div>
    </div>
  );
}
