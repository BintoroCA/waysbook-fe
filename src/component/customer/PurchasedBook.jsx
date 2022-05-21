import React from "react";

const PurchasedBook = ({ setOnClick, item, index }) => {
  return (
    <div key={index} className="d-flex flex-column col-3 col-sm-auto">
      <img
        onClick={setOnClick}
        src={item.book.thumbnail}
        alt=""
        style={{ maxHeight: "270px", maxWidth: "200px", cursor: "pointer" }}
      />
      <p
        onClick={setOnClick}
        className="fs-5 fw-bold"
        style={{ maxWidth: "200px", cursor: "pointer" }}
      >
        {item.book.title}
      </p>
      <p className="fst-talic" style={{ color: "grey" }}>
        {item.book.author}
      </p>
      <a
        href={item.book.bookAttachment}
        target="_blank"
        className="btn btn-dark"
      >
        Download
      </a>
    </div>
  );
};

export default PurchasedBook;
