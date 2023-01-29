import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CustormForm from "./CustormForm";

const ModalForm = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSuccess("");
    setError("");
  }, [props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustormForm setError={setError} setSuccess={setSuccess} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {!error ? (
        <div className="text-success text-center mb-3">{success}</div>
      ) : (
        <div className="text-danger text-center mb-3">{error}</div>
      )}
    </Modal>
  );
};

export default ModalForm;
