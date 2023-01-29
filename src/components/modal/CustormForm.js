import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CustormForm = ({ setError, setSuccess, billId }) => {
  const [billInfo, setBillInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    payedAmount: "",
  });

  const onChangeHandler = (e) => {
    billInfo[e.target.name] = e.target.value;
  };

  //   async function updateBill(billId) {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:8000/api/update-billing/${billId}`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify(billInfo),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const response = await res.json();
  //       if (response.success === false) {
  //         setError(response.message);
  //         setSuccess("");
  //       } else {
  //         setSuccess("Bill has been updated successfully");
  //         setError("");
  //       }
  //     } catch (err) {}
  //   }

  async function createBill() {
    try {
      const res = await fetch(`http://localhost:8000/api/add-billing`, {
        method: "POST",
        body: JSON.stringify(billInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    // if (billId?.id === false) {
    //   createBill();
    // } else {
    //   console.log(billId?.id);
    //   updateBill(billId?.id);
    // }
    createBill();
    e.target.reset();
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
            name="phone"
            placeholder="phone number"
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Payable Amount</Form.Label>
          <Form.Control
            type="number"
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
