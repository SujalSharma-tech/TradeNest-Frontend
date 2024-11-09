import "./useritemcard.scss";
import iphone from "./iphone.png";
import { Bookmark, Share } from "lucide-react";
import { useState } from "react";
const UserItemcard = ({ itemcard }) => {
  const [isOn, setIsOn] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOn((prev) => !prev);
  };
  return (
    <div className="useritemcard">
      <div className="f-listing">
        <div className="listing-header"></div>
        <div className="item-image">
          <img src={iphone} />
        </div>
        <div>
          <p className="listing-title">iPhone 12 Pro Max</p>
        </div>
        <div className="item-category">Category: Electronics</div>
        <div className="listing-footer">
          <p className="item-price">₹ 45000</p>

          <div className="listing-social">
            <Bookmark />
            <Share />
          </div>
        </div>
        <div className="customize-btns">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
          <div className="toggle-switch">
            <div
              className={`switch ${isOn ? "switch-on" : "switch-off"}`}
              onClick={handleToggle}
            >
              <div className="slider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItemcard;
