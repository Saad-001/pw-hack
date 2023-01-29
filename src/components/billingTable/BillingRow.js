import React, { useState } from "react";
import CustormForm from "../modal/CustormForm";

const updateBill = (setError, setSuccess, id) => {
  console.log(id);
  <CustormForm setError={setError} setSuccess={setSuccess} billId={id} />;
};

const BillingRow = ({ data, setModalShow, setRefetch, refetch }) => {
  const { _id, fullName, email, phone, payedAmount } = data;
  // const [error, setError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const editHandler = (id) => {
    setModalShow(true);
    updateBill(setError, setSuccess, id);
  };

  async function deleteHandler(id) {
    try {
      const res = await fetch(
        `http://localhost:8000/api/delete-billing/${id}`,
        {
          method: "DELETE",
        }
      );
      const response = await res.json();
      if (response.success === false) {
        setError(response.message);
      } else {
        setRefetch(!refetch);
        setError("");
      }
    } catch (err) {}
  }

  return (
    <>
      <tr>
        <td>{_id}</td>
        <td>{fullName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{payedAmount}</td>
        <td>
          <b
            role="button"
            onClick={() => {
              editHandler(_id);
            }}
          >
            Edit
          </b>{" "}
          |{" "}
          <b role="button" onClick={() => deleteHandler(_id)}>
            Delete
          </b>
        </td>
      </tr>
    </>
  );
};

export default BillingRow;
