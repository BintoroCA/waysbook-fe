import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

import bg from "../../assets/background.png";
import phoneIcon from "../../assets/phone.png";
import genderIcon from "../../assets/gender.png";
import mailIcon from "../../assets/mail.png";
import mapIcon from "../../assets/map.png";
import masmasIcon from "../../assets/masmas.png";

import PurchasedBook from "../../component/customer/PurchasedBook";
import NavBar from "../../component/navbar/NavBar";

const Profile = () => {
  let navigate = useNavigate();
  const [state] = useContext(UserContext); //get logged user data
  const [profile, setProfile] = useState([]); // get profile data
  const [preview, setPreview] = useState(null); //For image preview
  const [myBook, setMyBook] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  console.log("mybook nih", myBook);

  //update profile
  const [form, setForm] = useState({
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  });
  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  function handleOpen() {
    setModalShow(true);
  }

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setProfile(res.data.data.profile);
        setPreview(res.data.data.profile.avatar);
        setForm({
          ...form,
          gender: profile.gender,
          phone: profile.phone,
          address: profile.address,
        });
      })
      .catch((err) => console.log(err));

    API.get("/purchased-books")
      .then((res) => {
        setMyBook(res.data.purBook);
        console.log("-----------", res);
      })
      .catch((err) => console.log(err));
  }, [modalShow]);

  console.log("----mybook", myBook);

  const toDetail = (bookid) => {
    navigate(`/book-detail/${bookid}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store data with FormData as object
    const formData = new FormData();

    if (form.avatar) {
      formData.set("avatar", form.avatar[0], form.avatar[0]?.name);
    }
    formData.set("address", form.address);
    formData.set("gender", form.gender);
    formData.set("phone", form.phone);

    // Configuration
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    // Insert product data
    await API.patch("/profile", formData, config);

    setModalShow(false);
  };

  return (
    <div
      className="container-fluid vw-100 bg-light"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container-xl">
        <NavBar />
      </div>

      {/* PROFILE SECTION START */}
      <div className="container-xl pt-5">
        <p className="fs-2 fw-bold">Profile</p>
      </div>

      <div
        className="container-xl d-flex justify-content-between flex-wrap"
        style={{ backgroundColor: "#FFD9D9" }}
      >
        <div className="flex-column justify-items-center">
          <div className="d-flex align-items-center">
            <img
              src={mailIcon}
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
            <div className="flex-column" style={{ paddingLeft: "10px" }}>
              <p className="mb-0 mt-2 fw-bold">{state.user.email}</p>
              <p>Email</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={genderIcon}
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
            <div className="flex-column" style={{ paddingLeft: "10px" }}>
              <p className="mb-0 mt-2 fw-bold">{profile.gender}</p>
              <p>Gender</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={phoneIcon}
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
            <div className="flex-column" style={{ paddingLeft: "10px" }}>
              <p className="mb-0 mt-2 fw-bold">{profile.phone}</p>
              <p>Mobile Phone</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={mapIcon}
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
            <div className="flex-column" style={{ paddingLeft: "10px" }}>
              <p className="mb-0 mt-2 fw-bold">{profile.address}</p>
              <p>Address</p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <img
            src={profile.avatar ? profile.avatar : masmasIcon}
            alt=""
            style={{ width: "225px", paddingTop: "15px" }}
          />
          <button onClick={handleOpen} className="btn btn-danger mt-2 mb-2">
            Edit Profile
          </button>
        </div>
      </div>
      {/* EDIT PROFILE MODAL START */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        {/* {modal === "Edit Profile" ? ( */}
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Label>Gender</Form.Label>
            <Form.Group controlId="" className="">
              <Form.Control
                className=""
                type="text"
                placeholder={profile.gender}
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Group controlId="" className="">
              <Form.Control
                className=""
                type="text"
                placeholder={profile.phone}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Group controlId="" className="">
              <Form.Control
                className=""
                type="text"
                placeholder={profile.address}
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                // id="avatar"
                onChange={handleChange}
              />
            </Form.Group>
            {preview && (
              <img
                style={{ width: "60px", height: "60px" }}
                src={preview}
                alt=""
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* EDIT PROFILE MODAL END */}
      {/* PROFILE SECTION END */}

      {/* MY BOOKS SECTION START */}
      <div className="container-xl pt-5">
        <p className="fs-2 fw-bold">My Books</p>
      </div>

      <div className="container-xl justify-content-center mb-5">
        <div className="row">
          {myBook?.map((item, index) => (
            <PurchasedBook
              setOnClick={() => toDetail(item.book.id)}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
      {/* MY BOOKS SECTION END */}
    </div>
  );
};

export default Profile;
