import React, { useState } from 'react';
import { ModalDialog } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function ModalSubs({show, handle}) {

  return (
    <>
      <Modal
        size="sm"
        show={show} 
        onHide={handle}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body closeButton className='bg-dark text-danger text-center fs-5'>
        You have not subscribed, please click &nbsp;
        <Link to='/payment' className="text-decoration-none">
            here 
        </Link>
        &nbsp;
        to Subscribe/Premium
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSubs