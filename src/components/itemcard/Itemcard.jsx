/* eslint-disable react/prop-types */
import "./itemcard.scss";
import { Bookmark, Share, UserCircle2 } from "lucide-react";
import crown from "./crown 1.png";
import iphone from "./iphone.png";
import { CLODUINARY_LINK } from "../../utils/constants";

const Itemcard = ({ product }) => {
  return (
    <div className="f-listing">
      <div className="listing-header">
        <div className="user-info">
          <UserCircle2 />
          <p>{product?.owner || "Default User"}</p>
        </div>
        <div>
          <img src={crown} alt="" />
        </div>
      </div>
      <div className="item-image">
        <img src={CLODUINARY_LINK + product?.images[0].url} />
      </div>
      <div>
        <p className="listing-title">{product?.title || "iphone 12 pro max"}</p>
      </div>
      <div className="item-category">
        Category: {product?.category || "Electronics"}
      </div>
      <div className="listing-footer">
        <p className="item-price">₹ {product?.details?.price || "45000"}</p>

        <div className="listing-social">
          <Bookmark />
          <Share />
        </div>
      </div>
    </div>
  );
};

export default Itemcard;
