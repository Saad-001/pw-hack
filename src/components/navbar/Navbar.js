import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarComponent = ({ payedAmount }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Power Hack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/billsTable">Bills Table</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {userName ? (
              <p className="mt-3 mr-3">{userName}</p>
            ) : (
              <Nav.Link href="/login">
                <Button variant="outline-success">login</Button>
              </Nav.Link>
            )}
            {userName ? (
              <></>
            ) : (
              <Nav.Link href="/registration">
                <Button variant="outline-primary">sign up</Button>
              </Nav.Link>
            )}
            {userName ? (
              <Nav.Link onClick={() => handleLogOut()}>
                <Button variant="outline-danger">log out</Button>
              </Nav.Link>
            ) : (
              <></>
            )}
            <p className="mt-3 ml-3">
              {payedAmount !== 0 ? `Paid Amount : ${payedAmount}` : ""}
            </p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
