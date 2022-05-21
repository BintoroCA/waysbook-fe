import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import bg from "../../assets/background.png";
import ListBook from "../../component/customer/ListBook";
import PromoBook from "../../component/customer/PromoBook";
import NavBar from "../../component/navbar/NavBar";
import { API } from "../../config/api";
import { useQuery } from "react-query";

const LandingPage = () => {
  // Fetching all books from database with useQuery
  let { data: books } = useQuery("booksCache", async () => {
    const response = await API.get("/books");
    return response.data.data.books;
  });

  // Fetching promo books from database with useQuery
  let { data: promo } = useQuery("promoCache", async () => {
    const response = await API.get("/promo");
    return response.data.data.promobook;
  });

  return (
    <div
      className="container-fluid vw-100 vh-100 bg-light pb-5"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container">
        <NavBar />
      </div>

      <div className="container pt-3 pb-5">
        <div className="row">
          <p className="col-12 text-center fs-2">
            With us, you can shop online & help <br /> save your high street at
            the same time
          </p>
        </div>
        <div className="row mt-3">
          {promo?.map((item) => (
            <PromoBook item={item} />
          ))}
        </div>
        <p className="fs-3 fw-bold pt-5 mb-3">List Book</p>
        <div className="row">
          {books?.map((item, index) => (
            <ListBook item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
