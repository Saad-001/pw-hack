import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Layout from "../layout/Layout";
import ModalForm from "../modal/ModalForm";
import PageinationComp from "../pageInation/PageinationComp";
import BillingRow from "./BillingRow";

const BillingTable = () => {
  const [billingData, setBillingData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [totalPayed, setTotalPayed] = useState();
  const [activePage, setActivePage] = useState(1);
  const [fullDataLen, setFullDataLen] = useState();
  const [searchBill, setSearchBill] = useState([]);

  async function fetchData() {
    try {
      let res = await fetch(
        `https://pw-hack-backend-production.up.railway.app/api/billing-list?page=${activePage}&limit=${10}`
      );
      let result = await res.json();
      if (result.data.length) {
        setBillingData(result.data);
        setFullDataLen(result.len);
        let amount = result.data.reduce((total, bill) => {
          return total + bill.payedAmount;
        }, 0);
        setTotalPayed(amount);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [modalShow, refetch, activePage]);

  async function seachData(identity, value) {
    if (identity === "email") {
      try {
        let res = await fetch(
          `https://pw-hack-backend-production.up.railway.app/api/search?email=${value}`
        );
        let result = await res.json();
        if (result[0].fullName) {
          setSearchBill(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (identity === "phone") {
      try {
        let res = await fetch(
          `https://pw-hack-backend-production.up.railway.app/api/search?phone=${value}`
        );
        let result = await res.json();
        console.log(result);
        if (result[0].fullName) {
          setSearchBill(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await fetch(
          `https://pw-hack-backend-production.up.railway.app/api/search?name=${value}`
        );
        let result = await res.json();
        if (result[0].fullName) {
          console.log(result);
          setSearchBill(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue === "") {
      alert("please enter your fullName or email or phone number!");
      return;
    }

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^(?:(?:\+|00)88|01)?\d{11}$/;

    if (searchValue.match(mailformat)) {
      seachData("email", searchValue);
      setSearchBill([]);
    } else if (searchValue.match(phoneFormat)) {
      seachData("phone", searchValue);
      setSearchBill([]);
    } else {
      seachData("name", searchValue);
      setSearchBill([]);
    }
    setSearchValue("");
  };

  return (
    <Layout payedAmount={totalPayed}>
      <div className="py-3 px-3 d-flex justify-content-between align-items-center">
        <h3>Billings</h3>
        <form className="" onSubmit={handleSubmit}>
          <input
            className=""
            type="text"
            name="text"
            value={searchValue}
            onChange={onChangeHandler}
          />
          <button className="" type="submit">
            search
          </button>
        </form>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add new bill
        </Button>
        <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      {searchBill.length > 0 ? (
        <Table className="mt-3 mb-5">
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payed Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchBill.map((bill, idx) => (
              <BillingRow
                key={idx}
                data={bill}
                setRefetch={setRefetch}
                refetch={refetch}
                setModalShow={setModalShow}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Billing ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Payed Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billingData.length > 0 &&
            billingData.map((bill, idx) => (
              <BillingRow
                setRefetch={setRefetch}
                refetch={refetch}
                setModalShow={setModalShow}
                key={idx}
                data={bill}
              />
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <PageinationComp
          dataLength={fullDataLen}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </Layout>
  );
};

export default BillingTable;
