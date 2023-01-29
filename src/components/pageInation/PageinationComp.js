import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const generatePage = (num, active, setActive) => {
  let pages = [];
  const handleClick = (n) => {
    setActive(n);
  };
  for (let i = 1; i <= num; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={() => handleClick(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return pages;
};

const PageinationComp = ({ dataLength, activePage, setActivePage }) => {
  const [pageNum, setPageNum] = useState();
  console.log(dataLength);
  useEffect(() => {
    const div_val = dataLength / 10;
    const mod_val = dataLength % 10;
    if (mod_val > 0) {
      let res = div_val + 1;
      setPageNum(res);
    }
  }, [dataLength]);

  const handlePrev = (num) => {
    if (num > 1) {
      setActivePage(num - 1);
    }
  };

  const handleNext = (num) => {
    if (num < pageNum) {
      setActivePage(num + 1);
    }
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={() => handlePrev(activePage)} />
      {generatePage(pageNum, activePage, setActivePage).map((page) => page)}
      <Pagination.Next onClick={() => handleNext(activePage)} />
    </Pagination>
  );
};

export default PageinationComp;
