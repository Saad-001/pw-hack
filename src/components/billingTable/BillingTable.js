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

  async function fetchData() {
    try {
      let res = await fetch(
        `http://localhost:8000/api/billing-list?page=${activePage}&limit=${10}`
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

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
