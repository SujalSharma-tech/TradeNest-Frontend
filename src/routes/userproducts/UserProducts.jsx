import Itemcard from "../../components/itemcard/Itemcard";
import "./userproducts.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserItemcard from "../../components/useritemcard/UserItemcard";
const UserProducts = () => {
  const navigate = useNavigate();
  return (
    <div className="userproducts">
      <div className="listing-heading">
        <h1>My Listings</h1>
      </div>

      <div className="create-listing-btn">
        <button onClick={() => navigate("/createlisting")}>
          Create Product Listing +
        </button>
      </div>
      <div className="featured-container">
        <Link to={"/productdetails/1"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/2"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/3"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/4"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/5"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/6"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/7"}>
          <UserItemcard />
        </Link>
        <Link to={"/productdetails/8"}>
          <UserItemcard />
        </Link>
      </div>
    </div>
  );
};

export default UserProducts;
