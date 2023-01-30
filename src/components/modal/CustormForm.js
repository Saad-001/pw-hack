import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

const CustormForm = ({ setError, setSuccess }) => {
  const [billInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    payedAmount: "",
  });
  const [billId, setBillId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let s = location.search;
    if (s.length) {
      setBillId(s.split("=")[1]);
    }
  }, [location.pathname, location.search]);

  const onChangeHandler = (e) => {
    billInfo[e.target.name] = e.target.value;
    if (e.target.name === "phone") {
      e.target.setCustomValidity("");
    }
  };

  const handleInvalid = (e) => {
    if (e.target.validity) {
      e.target.setCustomValidity("Please enter a valid phone number");
    }
  };

  async function updateBill(id) {
    try {
      const res = await fetch(
        `https://pw-hack-backend-production.up.railway.app/api/update-billing/${id}`,
        {
          method: "POST",
          body: JSON.stringify(billInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      if (response.success === false) {
        setError(response.message);
        setSuccess("");
      } else {
        setSuccess("Bill has been updated successfully");
        setBillId("");
        setError("");
        navigate("/billsTable");
      }
    } catch (err) {}
  }

  async function createBill() {
    try {
      const res = await fetch(
        `https://pw-hack-backend-production.up.railway.app/api/add-billing`,
        {
          method: "POST",
          body: JSON.stringify(billInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      if (response.success === false) {
        setError(response.message);
        setSuccess("");
      } else {
        setSuccess("Bill has been created successfully");
        setError("");
      }
    } catch (err) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (billId.length) {
      updateBill(billId);
    } else {
      createBill();
    }
    e.target.reset();
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter full name"
              onChange={onChangeHandler}
              required
            />
          </Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            maxLength="11"
            minLength="11"
            name="phone"
            pattern="[0-9]+"
            onInvalid={handleInvalid}
            placeholder="phone number"
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Payable Amount</Form.Label>
          <Form.Control
            type="number"
            min="0"
            onKeyPress={preventMinus}
            name="payedAmount"
            placeholder="amount"
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CustormForm;
