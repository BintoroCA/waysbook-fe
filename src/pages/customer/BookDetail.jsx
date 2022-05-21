import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import bg from "../../assets/background.png";
import book from "../../assets/book1.png";
import rupiah from "rupiah-format";
import NavBar from "../../component/navbar/NavBar";
import cartIcon from "../../assets/cart.png";
import { Modal, Alert } from "react-bootstrap";

const BookDetail = (props) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [bookdetail, setBookdetail] = useState({});
  const [bookPurchased, setBookPurchased] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const getBookdetail = async () => {
    try {
      const user = await API.get(`/book-detail/` + id);
      setBookdetail(user.data.data.bookId);
      console.log("bookdetail nihhhhhh");
      console.log(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBook = async () => {
    try {
      const mybook = await API.get(`/purchased/${id}`);
      if (mybook.data.purBook) {
        setBookPurchased(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleBuy = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.post(
        "/cart",
        {
          bookId: bookdetail.id,
        },
        config
      );
      setPopUp(true);
      setTimeout(setPopUp, 2000); //pop up 2000 milliseconds (2 seconds)
      setTimeout(function () {
        navigate("/my-cart");
      }, 2000); //navigate after 2000 milliseconds (2 seconds)
    } catch (error) {
      console.log(error);
    }
  };

  const closePopUp = () => {
    setPopUp(false);
    navigate("/profile");
  };

  useEffect(() => {
    getBookdetail();
    getMyBook();
  }, [popUp]);

  return (
    <div
      className="container-fluid vw-100 vh-100 bg-light"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container">
        <NavBar />
      </div>

      <div className="container pt-5">
        <div className="row ">
          <div className="col-md-6 col-xl-4">
            <img
              style={{
                maxHeight: "400px",
                Width: "auto",
                objectFit: "contain",
              }}
              src={bookdetail.thumbnail}
              alt=""
            />
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="d-flex flex-column">
              <p className="fs-3 fw-bold">{bookdetail.title}</p>
              <p className="fst-italic" style={{ color: "grey" }}>
                By. {bookdetail.author}
              </p>
              <p className="fw-bold">Publication date</p>
              <p>{bookdetail.publicationDate}</p>
              <p className="fw-bold">Pages</p>
              <p>{bookdetail.pages}</p>
              <p className="fw-bold text-danger">ISBN</p>
              <p>{bookdetail.ISBN}</p>
              <p className="fw-bold ">Price</p>
              <p style={{ color: "#44B200", fontSize: "18px" }}>
                {rupiah.convert(bookdetail.price)}
              </p>
            </div>
          </div>
          <div className="col-md-12 col-xl-4">
            <p className="fs-4 fw-bold pt-5">About This Book</p>
            <p>{bookdetail.description}</p>
            {bookPurchased ? (
              <div className="d-flex justify-content-end pb-5">
                <a
                  className="btn btn-dark"
                  href={bookdetail.bookAttachment}
                  target="_blank"
                >
                  <span className="text-center fw-bold px-3">Download</span>
                </a>
              </div>
            ) : (
              <div className="d-flex justify-content-end pb-5">
                <div className="btn btn-dark">
                  <span
                    className="fw-bold"
                    style={{ color: "white" }}
                    onClick={handleBuy}
                  >
                    Add Cart
                  </span>
                  <img className="ps-3" src={cartIcon} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={popUp} onHide={closePopUp}>
        <Modal.Body
          className="fs-5 align-middle"
          variant="light"
          style={{ color: "#469F74" }}
        >
          <p className="text-center">
            The product is successfully added to the cart
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookDetail;
