import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rupiah from "rupiah-format";
import { API } from "../../config/api";
import { Modal } from "react-bootstrap";

const PromoBook = ({ item }) => {
  const [popUp, setPopUp] = useState(false);
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
          bookId: item.id,
        },
        config
      );
      setPopUp(true);
      setTimeout(setPopUp, 2000); //pop up 2000 milliseconds (2 seconds)
      setTimeout(function () {
        closePopUp();
      }, 2000); //close pop up after 2000 milliseconds (2 seconds)
    } catch (error) {
      console.log(error);
    }
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  useEffect(() => {}, [popUp]);

  return (
    <div className="col-sm-12 col-md-6" key={item.id}>
      <div className="row pt-3">
        <div
          // key={item.id}
          className="col-md-5 col-sm-12 align-items-center"
          // style={{ width: "auto", marginRight: "10px" }}
        >
          <Link
            to={`/book-detail/` + item.id}
            style={{ textDecoration: "none" }}
          >
            <img className="img-fluid" src={item.thumbnail} alt="" />
          </Link>
        </div>
        <div
          className="col-md-7 col-sm-12 pe-1 ps-1"
          // style={{ maxWidth: "270px" }}
        >
          <div className="d-flex flex-column">
            <Link
              to={`/book-detail/` + item.id}
              style={{ textDecoration: "none" }}
            >
              <p
                style={{
                  textOverflow: "ellipsis",
                  maxHeight: "65px",
                  overflow: "hidden",
                  color: "black",
                }}
                className="fs-4 fw-bold"
              >
                {item.title}
              </p>
              <p className="fst-italic" style={{ color: "grey" }}>
                By. {item.author}
              </p>
              <p
                style={{
                  textOverflow: "ellipsis",
                  maxHeight: "100px",
                  overflow: "hidden",
                  color: "black",
                }}
              >
                "{item.description}"
              </p>
              <p style={{ color: "#44B200", fontSize: "18px" }}>
                {rupiah.convert(item.price)}
              </p>
            </Link>
            <button
              onClick={handleBuy}
              className="btn btn-dark py-2 px-5 text-center"
              style={{ textDecoration: "none" }}
            >
              Add to Cart
            </button>
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

export default PromoBook;
