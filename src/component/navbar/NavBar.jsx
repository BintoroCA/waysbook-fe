import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import LogoApp from "../../assets/LogoApp.svg";
import masmasIcon from "../../assets/Profile.png";
import cart from "../../assets/cart.png";
import { API } from "../../config/api";
import DropDown from "./DropDown";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Badge } from "react-bootstrap";

export default function NavBar() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [cartcount, setCartcount] = useState([]);
  const [profilePic, setProfilePic] = useState({});
  // console.log("chuaaaaazkzkzkzkzk", state);
  const logout = () => {
    // console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    API.get("/carts").then((res) => {
      setCartcount(res.data.getCart);
    });
    API.get("/profile").then((res) => {
      setProfilePic(res.data.data.profile);
    });
  }, []);

  console.log("wiuwiuwiu", profilePic);

  let navbarType = "";
  if (state.isLogin) {
    navbarType = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center ">
        {state.user.role == "customer" ? (
          <li className="nav-item ">
            <Link to="/my-cart" className="nav-link">
              <Badge pill bg="danger">
                {cartcount.length}
              </Badge>
              <img
                src={cart}
                alt=""
                style={{ width: "3rem", height: "3rem" }}
                className="ms-1 me-lg-4"
              />
            </Link>
          </li>
        ) : (
          <li style={{ display: "none" }}></li>
        )}
        <li className="nav-item dropdown ">
          <div
            className="bg-dark rounded-circle overflow-hidden"
            style={{ width: "4rem", height: "4rem" }}
            id="navbarScrollingDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={profilePic.avatar ? profilePic.avatar : masmasIcon}
              alt=""
              className="img-fluid"
            />
          </div>
          <DropDown logout={logout} />
        </li>
      </ul>
    );
  } else {
    navbarType = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center ">
        <li className="nav-item ">
          <Login />
        </li>
        <li className="nav-item  ">
          <Register />
        </li>
      </ul>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container py-lg-4 ">
        {state.user.role == "admin" ? (
          <Link className="navbar-brand" to="/transactions">
            <img src={LogoApp} alt="" />
          </Link>
        ) : (
          <Link className="navbar-brand" to="/">
            <img src={LogoApp} alt="" />
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  " id="navbarTogglerDemo02">
          {navbarType}
        </div>
      </div>
    </nav>
  );
}
