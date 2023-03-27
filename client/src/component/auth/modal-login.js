// import React, { useState } from 'react';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../../config/api';
import { UserContext } from '../../context/UserContext';
import ModalRegister from './modal-register';

function ModalLogin({show, handle}) {
  const navigate = useNavigate()  

  const [state, dispatch] = useContext(UserContext)
  // console.log(state);
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = useMutation(async(e) => {
    try {
      e.preventDefault()
      


      const response = await API.post('/login', form)
      // console.log('response data', response.data);
      if (response?.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data
          })
          if (response.data.data.role === "admin") {
            navigate('/list-transaction')
          }else{
            navigate('/')
          }
      }

    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Failed',
        // text: 'Login Gagl',
      })
    }

    setInterval(() => { 
      navigate(0)
    },1000)
  })

  
  
  return (
    <>

      <Modal show={show} onHide={handle} centered size="md">
        <div className='bg-dark'>
          <Modal.Body className='modal-login text-light '>
            <Form onSubmit={(e) => handleOnSubmit.mutate(e) }>
              <Modal.Title className='text-left text-light fw-semibold pb-4 fs-1 pt-5'>Login</Modal.Title>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={form.email}
                  className='bg-dark text-white'
                  placeholder='Email'
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={form.password}
                  onChange={handleOnChange}
                  type="password"
                  className='bg-dark text-white'
                  placeholder='Password'
                />
              </Form.Group>
            <Button className='btn-orange w-100' type='submit'>
              Login
            </Button>
            </Form>
            <div className='text-center pt-3'>
            <span className=' text-secondary fs-6'>Don't have an account? ? Click 
              Here
            </span>            
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalLogin