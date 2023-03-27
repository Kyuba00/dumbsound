import "bootstrap/dist/css/bootstrap.min.css";
import "./component/style.css";
import Home from "./component/home";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Pay from "./page/payment";
import ListTransaction from "./page/list-transaction";
import AddMusic from "./page/add-music";
import AddArtist from "./page/add-artist";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import PrivateUser from "./privateRoute/PrivateUser";
import PrivateAdmin from "./privateRoute/PrivateAdmin";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.isLogin === false && !isLoading) {
      navigate("/");
    } else {
      if (!isLoading)
        if (state.user.listAs == "admin") {
          navigate("/list-transaction");
        } else if (state.user.listAs == "") {
          navigate("/");
        }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PrivateAdmin />}>
              <Route path="/list-transaction" element={<ListTransaction />} />
              <Route path="/add-music" element={<AddMusic />} />
              <Route path="/add-artist" element={<AddArtist />} />
            </Route>

            <Route element={<PrivateUser />}>
              <Route path="/payment" element={<Pay />} />
            </Route>
          </Routes>
        </>
      )}
      ;
    </>
  );
}

export default App;
