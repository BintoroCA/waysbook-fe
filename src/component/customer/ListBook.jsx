import React from "react";
import { Link } from "react-router-dom";
import rupiah from "rupiah-format";

const ListBook = ({ item, index }) => {
  return (
    <Link
      to={`/book-detail/` + item.id}
      style={{ textDecoration: "none" }}
      className="col-sm-6 col-md-2 pe-3 mb-3"
    >
      <div key={item.id} className=" d-flex flex-column">
        <img
          className="img-fluid"
          src={item.thumbnail}
          alt=""
          // style={{ maxHeight: "270px", maxWidth: "200px" }}
        />
        <p className="fs-5 fw-bold mb-0" style={{ color: "black" }}>
          {item.title}
        </p>
        <p className="fst-talic" style={{ color: "grey" }}>
          {item.author}
        </p>
        <p style={{ color: "#44B200", fontSize: "18px" }}>
          {rupiah.convert(item.price)}
        </p>
      </div>
    </Link>
  );
};

export default ListBook;
