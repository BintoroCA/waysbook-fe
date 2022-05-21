import React, { useState, useContext } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function Login({ setOnClick }) {
  let navigate = useNavigate();
  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // to know whos the user
      const user = response.data.data.user;

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // Status check
      if (user.status === "admin") {
        navigate("/add-book");
      } else if (user.status === "customer") {
        navigate("/profile");
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login Success
        </Alert>
      );
      setTimeout(setMessage(alert), 2000);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div>
      <Button
        variant="none"
        onClick={handleShow}
        className="btn btn-outline-dark me-3 mb-2 mb-lg-0 fw-bold px-4"
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="container p-3">
            {message && message}
            <label className="fs-1 fw-bold">Login</label>
            <input
              className="form-control my-3 "
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <input
              className="form-control my-3"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleClose} className="btn btn-dark w-100 my-3">
              Login
            </button>
            <div className="text-center ">
              <label className="d-flex flex-row align-items-center justify-content-center">
                Don't have an account ? <span onClick={setOnClick}>Klik</span>
                <Link className="nav-link text-dark fw-bold p-1 " to="#">
                  Here
                </Link>
              </label>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
