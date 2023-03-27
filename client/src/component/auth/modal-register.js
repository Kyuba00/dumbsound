import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./modal-login";

function ModalRegister({ register, handleregister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });
  //  console.log(form);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content Type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      Swal.fire({
        icon: "success",
        title: "Suksess",
        text: "Berhasil Register",
      });
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setInterval(() => {
      navigate(0);
    }, 1000);
  });
  return (
    <>
      <Modal
        show={register}
        onHide={handleregister}
        centered
        size="md"
        className=""
      >
        <div className="bg-dark text-light">
          <Modal.Body className="modal-login">
            <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <Modal.Title className="text-left fw-semibold pb-4 fs-1 pt-5">
                Register
              </Modal.Title>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  name="fullname"
                  value={form.fullname}
                  onChange={handleOnChange}
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Full Name"
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Controlform1">
                <Form.Control
                  name="email"
                  value={form.email}
                  onChange={handleOnChange}
                  type="email"
                  className="bg-dark text-white"
                  placeholder="Email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Controlform1">
                <Form.Control
                  name="password"
                  value={form.password}
                  onChange={handleOnChange}
                  type="password"
                  className="bg-dark text-white"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Select
                aria-label="Gender"
                className="mb-3 bg-dark text-white"
                name="gender"
                onChange={handleOnChange}
              >
                <option className="text-secondary" hidden>
                  -- Gender --{" "}
                </option>
                <option value="pria">Male</option>
                <option value="wanita">Female</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleOnChange}
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Phone"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="address"
                  value={form.address}
                  onChange={handleOnChange}
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Address"
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-orange w-100">
                Register
              </Button>
              <div className="text-center pt-3">
                <span className=" text-secondary fs-6">
                  Already have an account? ? Click Here
                </span>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalRegister;
