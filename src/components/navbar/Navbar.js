import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarComponent = ({ payedAmount }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Power Hack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/billsTable">Bills Table</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {userName ? (
              <p className="mt-2 mr-2">{userName}</p>
            ) : (
              <a href="/login">
                <Button variant="outline-success">login</Button>
              </a>
            )}
            {userName ? (
              <></>
            ) : (
              <a href="/registration">
                <Button variant="outline-primary">sign up</Button>
              </a>
            )}
            <p className="mt-2 pl-2">
              {payedAmount !== 0 ? `Paid Amount : ${payedAmount}` : ""}
            </p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
