import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function UploadTheater() {
  const [form, setForm] = useState({
    name: "",
    totalSeats: "",
    seatsPerRow: "",
    image: "",
    movieName: "",
  });

  const [cookies, setCookie] = useCookies();

  const token = cookies.user_Token;
  const navigate = useNavigate()

  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "firstupload");
        formData.append("folder", "uploads");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dey09e5yr/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          toast.success("Image uploaded successfully:");
          console.log(result);
          form.image = result.url;
        } else {
          toast.error("Image upload failed.");
        }
      } catch (error) {
        toast.error("Error uploading image:");
      }
    }
  };

  const handleChange = (e) => {
    setForm((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!form.image) {
      return toast.error("Please upload image");
    } else if (
      !form.name ||
      !form.seatsPerRow ||
      !form.totalSeats ||
      !form.movieName
    ) {
      return toast.error("Please fill all details");
    }

    try {
      const response = await axios.post(
        "https://movie-ticket-server.vercel.app/theater/post-theater",
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);
      navigate('/upload-theater')
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
      movieName: "",
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
        <form className="mx-2">
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
              <b>SeatsPerColumn</b>
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
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">
              <b>Movie name</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="movieName"
              placeholder="Latest movie"
              value={form.movieName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              <b>Image of Theater</b>
            </label>
            <div className="d-flex">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button className="btn btn-secondary mx-2" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: "30px" }}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-secondary"
            >
              Upload Theater
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
