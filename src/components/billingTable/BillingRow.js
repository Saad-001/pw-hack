import React from "react";
import { useNavigate } from "react-router-dom";

const BillingRow = ({ data, setModalShow, setRefetch, refetch }) => {
  const { _id, fullName, email, phone, payedAmount } = data;
  const navigate = useNavigate();

  const editHandler = (id) => {
    setModalShow(true);
    navigate(`/billsTable?id=${id}`);
  };

  async function deleteHandler(id) {
    try {
      const res = await fetch(
        `https://pw-hack-backend-production.up.railway.app/api/delete-billing/${id}`,
        {
          method: "DELETE",
        }
      );
      const response = await res.json();
      if (response.success === false) {
        alert("something went wrong!");
      } else {
        setRefetch(!refetch);
        alert("Bill deleted successfully!");
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
