import React from "react";
import Container from "react-bootstrap/Container";
import NavbarComponent from "../navbar/Navbar";

const Layout = ({ children, payedAmount = 0 }) => {
  console.log(payedAmount);
  return (
    <Container>
      <NavbarComponent payedAmount={payedAmount} />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
