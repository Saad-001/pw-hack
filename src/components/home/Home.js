import React from "react";
import Image from "react-bootstrap/Image";
import heroImage from "../../assets/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import Layout from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <div className="">
          <h1>Experience The Best Survice</h1>
          <h4>
            No Metter Wherever You're, We Are <br /> Right Near You
          </h4>
        </div>
        <div style={{ maxWidth: "600px", maxHeight: "600px" }} className="">
          <Image fluid src={heroImage} rounded alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
