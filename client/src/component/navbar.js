import { useContext, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "./auth/modal-login";
import ModalRegister from "./auth/modal-register";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

function NavHeader() {
  const navigate = useNavigate();
  // Handle Modal Login
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   Handle Modal Register
  const [register, setRegister] = useState(false);
  const handleCloseR = () => setRegister(false);
  const handleShowR = () => setRegister(true);

  const [state, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "LogOut",
      showConfirmButton: false,
      // timer: 1500
    });

    setInterval(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Navbar bg="none" expand="lg">
        <Container className="py-3">
          <Navbar.Brand>
            <Link to="/" className="d-flex text-decoration-none">
              <Image src="../../img/logo1.png" />
              <p
                style={{
                  color: "#EE4622",
                  fontSize: 19,
                  fontFamily: "sans-serif",
                }}
                className="fw-semibold"
              >
                DUMB
              </p>
              <span
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "sans-serif",
                }}
                className="fw-semibold"
              >
                SOUND
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="btn-orange-toggle "
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "900px" }}
            ></Nav>
            {state?.isLogin !== false ? (
              <div className="d-flex flex-row align-items-center">
                {state.user?.listAs === "admin" ? (
                  <div className="d-flex align-items-center">
                    <h5
                      style={{ color: "#EE4622" }}
                      className="text-capitalize fw-semibold pt-3"
                    >
                      Admin
                    </h5>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="bg-transparent"
                        style={{ border: "none" }}
                      >
                        <Image src="../../icon/admin.png" width="45px" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="bg-dark">
                        <Dropdown.Item className="text-light">
                          <Link
                            to="/add-music"
                            className="text-decoration-none text-white"
                          >
                            <Image
                              src="../../icon/music.png"
                              className="pe-3"
                              alt="gambar music"
                            />
                            Add Music
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link
                            to="/add-artist"
                            className="text-decoration-none text-white"
                          >
                            <Image
                              src="../../icon/artist.png"
                              className="pe-3"
                              alt="gambar Artis"
                            />
                            Add Artist
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-light"
                          onClick={handleLogout}
                        >
                          <Image src="../../icon/logout.png" className="pe-3" />
                          Log-out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <h5
                      style={{ color: "#EE4622" }}
                      className="text-capitalize fw-semibold fs-4"
                    >
                      Welcome,{" "}
                      <span className="text-light fw-normal">
                        {" "}
                        {state.user.name}
                      </span>
                    </h5>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="bg-transparent"
                        style={{ border: "none" }}
                      >
                        <Image src="../../icon/user.png" width="45px" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="bg-dark">
                        <Dropdown.Item>
                          <Link
                            to="/payment"
                            className="text-decoration-none text-white"
                          >
                            <Image
                              src="../../icon/bill.png"
                              className="pe-3"
                              alt="gambar Pay"
                            />
                            Pay
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={handleLogout}
                          className="text-light"
                        >
                          <Image
                            src="../../icon/logout.png"
                            className="pe-3 "
                          />
                          Log-out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button className="btn-outline" onClick={handleShow}>
                  Login
                </Button>
                <Button className="btn-orange" onClick={handleShowR}>
                  Register
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalLogin show={show} handle={handleClose} />
      <ModalRegister register={register} handleregister={handleCloseR} />
    </>
  );
}
export default NavHeader;
