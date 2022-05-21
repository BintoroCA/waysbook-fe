import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import users from "../../assets/users.svg";
import Complaint from "../../assets/Complaint.svg";
import logouts from "../../assets/logouts.svg";
import AddBooks from "../../assets/AddBooks.svg";

export default function DropDown(props) {
  const [state, dispatch] = useContext(UserContext);

  let dropDownType = "";
  if (state.user.role == "admin") {
    dropDownType = (
      <>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/add-book">
            <img
              src={AddBooks}
              alt=""
              style={{ width: "2rem", height: "2rem" }}
              className="me-3"
            />
            Add Book
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/complain-admin">
            <img
              src={Complaint}
              alt=""
              style={{ width: "2rem", height: "2rem" }}
              className="me-3"
            />
            Complain
          </Link>
        </li>
      </>
    );
  } else {
    dropDownType = (
      <>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/profile">
            <img
              src={users}
              alt=""
              style={{ width: "2rem", height: "2rem" }}
              className="me-3"
            />
            Profile
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/complain">
            <img
              src={Complaint}
              alt=""
              style={{ width: "2rem", height: "2rem" }}
              className="me-3"
            />
            Complain
          </Link>
        </li>
      </>
    );
  }
  return (
    <ul
      className="dropdown-menu navbar-profile"
      aria-labelledby="navbarScrollingDropdown"
    >
      {dropDownType}
      <li>
        <hr className="dropdown-divider my-2" />
      </li>

      <li className="nav-item">
        <Link onClick={props.logout} className="dropdown-item fw-bold" to="#">
          <img
            src={logouts}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
            className="me-3"
          />
          Logout
        </Link>
      </li>
    </ul>
  );
}
