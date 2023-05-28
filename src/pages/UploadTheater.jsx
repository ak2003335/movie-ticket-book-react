import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function UploadTheater() {
  const [form, setForm] = useState({
    name: "",
    totalSeats: "",
    seatsPerRow: "",
    image: null,
    imageValue: "",
  });

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setForm((prevalue) => ({
        ...prevalue,
        [e.target.name]: e.target.files[0].name,
      }));
      console.log(e.target.files[0].name);
    } else {
      setForm((prevalue) => ({
        ...prevalue,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    if (!form.name || !form.image || !form.seatsPerRow || !form.totalSeats) {
      return toast.error("Please fill all details");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/theater/post-theater",
        form
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setForm({
      name: "",
      image: null,
      seatsPerRow: "",
      totalSeats: "",
      imageValue: "",
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="card"
        style={{ width: "25vw", backgroundColor: "#041134" }}
      >
        <h1 className="text-center">
          <b>Upload Theater</b>
        </h1>
        <br />
        <form className="mx-2" onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="">
              <b>Name</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your Theatername"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              <b>TotalSeats</b>
            </label>
            <input
              type="number"
              className="form-control"
              name="totalSeats"
              placeholder="Enter Total no of seats"
              value={form.totalSeats}
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">
              <b>SeatsPerRow</b>
            </label>
            <input
              type="number"
              className="form-control"
              name="seatsPerRow"
              placeholder="How many row you have"
              value={form.seatsPerRow}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              <b>Image of Theater</b>
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="image"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.imageValue}
            />
          </div>
          <div className="text-center my-3">
            <button type="submit" className="btn btn-secondary">
              Upload
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
