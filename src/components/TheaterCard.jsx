import React from "react";
import { Link } from "react-router-dom";

export default function TheaterCard({ theater }) {
  return (
    <div className="col-3 my-4 mx-3">
      <Link
        to={`/theater/${theater._id}`}
        style={{ color: "white", textDecoration: "none" }}
      >
        <div
          className="card cardCst text-center"
          style={{ backgroundColor: "#041134", width: "20vw" }}
        >
          <img
            className="card-img-top"
            src={theater.image}
            alt="Card image cap"
            height={190}
          />

          <div className="card-body">
            <h4 className="card-title">
              <b>{theater.name}</b>
            </h4>
            <p className="card-text">Movie :- {theater.movieName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
