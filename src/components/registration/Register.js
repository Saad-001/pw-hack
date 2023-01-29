import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    userInfo[e.target.name] = e.target.value;
  };

  async function register() {
    try {
      const res = await fetch(`http://localhost:8000/api/registration`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.userName) {
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("email", response.email);
        setError("");
        navigate("/billsTable");
      } else {
        setError(response.message);
      }
    } catch (err) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    e.target.reset();
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="text-danger text-center">{error}</div>
    </Layout>
  );
};

export default Register;
