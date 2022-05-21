import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";

// admin pages
import ListTransaction from "./pages/admin/ListTransaction";
import AddBook from "./pages/admin/AddBook";
import ComplainAdmin from "./pages/admin/ComplainAdmin";

// customer pages
import LandingPage from "./pages/customer/LandingPage";
import BookDetail from "./pages/customer/BookDetail";
import MyCart from "./pages/customer/MyCart";
import Profile from "./pages/customer/Profile";
import Complain from "./pages/customer/Complain";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// console.log("-----------");
// console.log(localStorage);
// console.log("-----------");
function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // console.log("------------");
    // console.log(state);
    // console.log("------------");
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/transactions");
        // navigate("/complain-admin");
      } else if (state.user.role === "customer") {
        navigate("/profile");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // console.log("------------");
      // console.log(payload);
      // console.log("------------");
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/book-detail/:id" element={<BookDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-cart" element={<MyCart />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/transactions" element={<ListTransaction />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />
      <Route path="/complain" element={<Complain />} />
    </Routes>
  );
}

export default App;
