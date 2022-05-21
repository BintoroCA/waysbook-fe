import React, { useEffect, useState } from "react";
import { API } from "../../config/api";
import bg from "../../assets/background.png";
import NavBar from "../../component/navbar/NavBar";
import rupiahFormat from "rupiah-format";

const ListTransaction = () => {
  const [listTrans, setListTrans] = useState([]);
  useEffect(() => {
    API.get("/transactions")
      .then((res) => setListTrans(res.data.trx))
      .catch((err) => console.log(err));
  }, []);

  console.log("----res----", listTrans);
  return (
    <div
      className="container-fluid vw-100 vh-100 bg-light"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container-xl">
        <NavBar />
      </div>

      <div className=" container table-w mb-5 ">
        <h3>Incoming Transaction</h3>
      </div>
      <div className="container overflow-auto table-responsive ">
        <table className="w-75 m-auto table table-hover">
          <thead>
            <tr className="text-danger">
              <th>No</th>
              <th>Users</th>
              <th>Product Purchased</th>
              <th>Total Payment</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {listTrans.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.buyerName}</td>
                <td>{item.books}</td>
                <td>{rupiahFormat.convert(item.total)}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTransaction;
