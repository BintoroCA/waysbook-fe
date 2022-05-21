import React, { useContext, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function Register() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () =>
    setTimeout(function () {
      setShow(false);
    }, 2000);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // console.log(response);

      // Notification
      if (response.data.status == "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success, now you can login
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
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
        className="btn btn-dark me-3 mb-2 mb-lg-0 fw-bold px-4"
      >
        Register
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="container p-3">
            {message && message}
            <label className="fs-1 fw-bold">Register</label>
            <input
              className="form-control my-3"
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
            <input
              className="form-control my-3"
              type="text"
              placeholder="Full Name"
              value={fullName}
              name="fullName"
              onChange={handleChange}
            />
            <button onClick={handleClose} className="btn btn-dark w-100 my-3">
              Register
            </button>
            <div className="text-center ">
              <label className="d-flex flex-row align-items-center justify-content-center">
                Already have an account ? Klik
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
