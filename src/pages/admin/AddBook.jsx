import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import bg from "../../assets/background.png";
import clip from "../../assets/clip.png";
import addbook from "../../assets/addbook.png";
import NavBar from "../../component/navbar/NavBar";

const AddBook = () => {
  let navigate = useNavigate();

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    ISBN: "",
    author: "",
    price: "",
    description: "",
    bookAttachment: "",
    thumbnail: "",
  }); //Store product data
  // console.log(form);

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
  const handleChangePdf = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log("chuaaazkkzz");
      console.log(form);
      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("ISBN", form.ISBN);
      formData.set("author", form.author);
      formData.set("price", form.price);
      formData.set("description", form.description);
      formData.set(
        "bookAttachment",
        form.bookAttachment[0],
        form.bookAttachment[0].name
      );
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);

      // console.log('dataform', formData);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.post("/add-book", formData, config);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div
      className="container-fluid vw-100 vh-100 bg-light"
      style={{ backgroundImage: `url( ${bg})` }}
    >
      <div className="container-xl">
        <NavBar />
      </div>

      <div className="container-xl pt-5 pb-3">
        <p className="fs-2 fw-bold">Add Book</p>
      </div>

      <form
        onSubmit={(e) => handleSubmit.mutate(e)}
        className="container-xl d-flex flex-column"
      >
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Title"
          style={{ height: "44px" }}
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Author"
          style={{ height: "44px" }}
          name="author"
          onChange={handleChange}
        />
        <input
          type="date"
          className="form-control mb-4"
          placeholder="Publication Date"
          style={{ height: "44px" }}
          name="publicationDate"
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-4"
          placeholder="Pages"
          style={{ height: "44px" }}
          name="pages"
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-4"
          placeholder="ISBN"
          name="ISBN"
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-4"
          placeholder="Price"
          style={{ height: "44px" }}
          name="price"
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-4"
          placeholder="About This Book"
          style={{ height: "200px" }}
          name="description"
          onChange={handleChange}
        />

        <div className="mb-4">
          <label
            htmlFor="pdfFile"
            className="btn btn-light border"
            style={{ width: "250px", backgroundColor: "#d2d6d9" }}
          >
            Attach Book File
            <img src={clip} alt="" style={{ marginLeft: "10px" }} />
          </label>
          <input
            id="pdfFile"
            type="file"
            style={{ visibility: "hidden" }}
            name="bookAttachment"
            onChange={handleChangePdf}
          />
        </div>

        <div>
          <label
            htmlFor="files"
            className="btn btn-light border"
            style={{ width: "250px", backgroundColor: "#d2d6d9" }}
          >
            Attach Book Thumbnail
            <img src={clip} alt="" style={{ marginLeft: "10px" }} />
          </label>
          <input
            id="files"
            type="file"
            style={{ visibility: "hidden" }}
            name="thumbnail"
            onChange={handleChange}
          />
        </div>
        {preview && (
          <div>
            <img
              src={preview}
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div className="d-flex justify-content-end">
          <button className="btn btn-dark mb-5">
            Add Book
            <img src={addbook} alt="" style={{ marginLeft: "10px" }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
