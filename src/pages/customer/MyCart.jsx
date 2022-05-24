import bg from "../../assets/background.png";
import book from "../../assets/book1.png";
import deletebtn from "../../assets/deletebtn.png";
import NavBar from "../../component/navbar/NavBar";
import { API } from "../../config/api";
import React, { useState, useContext, useEffect } from "react";
import rupiah from "rupiah-format";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";

const MyCart = (item) => {
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [popUpRmv, setPopUpRmv] = useState(false);

  const getCart = async () => {
    try {
      const carts = await API.get("/carts");
      setCart(carts.data.getCart);
    } catch (error) {
      console.log(error);
    }
  };

  // ACTIVE CODE BELOW IF WANT TO RUN APP WITHOUT MIDTRANS

  // const payBooks = async () => {
  //   try {
  //     await API.post("/transaction");
  //     setPopUp(true);
  //     setTimeout(setPopUp, 2000); //pop up 2000 milliseconds (2 seconds)
  //     setTimeout(function () {
  //       navigate("/profile");
  //     }, 2000); //navigate after 2000 milliseconds (2 seconds)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const payBooks = async () => {
    await API.post("/transaction")
      .then((res) => {
        console.log("ini respon", res);
        const token = res.data.payment.token;

        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log(result);
            setPopUp(true);
            setTimeout(setPopUp, 2000);
          },
          onPending: function (result) {
            console.log(result);
            setPopUp(true);
            setTimeout(setPopUp, 2000);
          },
          onError: function (result) {
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const closePopUp = () => {
    setPopUp(false);
    navigate("/profile");
  };

  const handleDelete = (id) => {
    deleteCart(id);
  };

  const deleteCart = async (id) => {
    try {
      const cartDel = await API.delete("/cart/" + id);
      setPopUpRmv(true);
      setTimeout(setPopUpRmv, 2000); //pop up 2000 milliseconds (2 seconds)
    } catch (error) {
      console.log(error);
    }
  };

  const closePopUpRmv = () => {
    setPopUpRmv(false);
  };

  useEffect(() => {
    getCart();
  }, [popUp, popUpRmv]);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-RG5XKn0g6DVkrN0F";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div
      className="container-fluid vw-100 vh-100 bg-light"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container-xl">
        <NavBar />
      </div>

      <div className="container-xl pt-5">
        <p className="fs-2 fw-bold">My Cart</p>
        <p className="fs-5">Review Your Order</p>
      </div>

      <div className="container-xl">
        <div className="row">
          <div className="col-8">
            <div className="border border-dark mb-3"></div>
            {cart.map((item, index) => (
              <div className="container-xl d-flex ps-0" key={item.id}>
                <div className="col-sm-auto me-3">
                  <img
                    className="img-bookcart"
                    src={item.book.thumbnail}
                    alt=""
                    style={{ maxHeight: "345px" }}
                  />
                </div>

                <div className="col d-md-block " style={{ maxWidth: "270px" }}>
                  <div className="d-flex flex-column">
                    <p className="fs-4 fw-bold mb-0">{item.book.title}</p>
                    <p className="fst-italic" style={{ color: "grey" }}>
                      By. {item.book.author}
                    </p>
                    <p>{item.book.description}"</p>
                    <p style={{ color: "#44B200", fontSize: "18px" }}>
                      {rupiah.convert(item.book.price)}
                    </p>
                  </div>
                </div>

                <div className="col-sm-auto ms-auto">
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    style={{ border: "none", background: "none" }}
                  >
                    <img src={deletebtn} alt="" />
                  </button>
                </div>
              </div>
            ))}
            <div className="border border-dark mt-3"></div>
          </div>

          <div className="col-4">
            <div className="d-flex flex-column">
              <div className="border border-dark mb-3"></div>
              <div className="d-flex flex-row justify-content-between">
                <p>Subtotal</p>
                <p>
                  {rupiah.convert(
                    cart
                      .map((item) => {
                        return item.total;
                      })
                      .reduce((a, b) => a + b, 0)
                  )}
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <p>Qty</p>
                <p>
                  {cart
                    .map((item) => {
                      return item.qty;
                    })
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="border border-dark  mb-3"></div>
              <div className="d-flex flex-row justify-content-between">
                <p style={{ color: "#44B200" }}>Total</p>
                <p style={{ color: "#44B200" }}>
                  {rupiah.convert(
                    cart
                      .map((item) => {
                        return item.total;
                      })
                      .reduce((a, b) => a + b, 0)
                  )}
                </p>
              </div>
              <button
                onClick={() => payBooks()}
                className="btn btn-dark fw-bold"
              >
                Pay
              </button>
            </div>
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
            Thank you for ordering in us, please wait 1 x 24 hours to verify you
            order
          </p>
        </Modal.Body>
      </Modal>
      <Modal
        className="fs-5 align-middle"
        show={popUpRmv}
        onHide={closePopUpRmv}
      >
        <Modal.Body variant="light">
          <p className="text-center" style={{ color: "orange" }}>
            Book successfully removed from your cart
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyCart;
