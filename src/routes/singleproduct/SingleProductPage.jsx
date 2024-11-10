import "./singleproductpage.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CLODUINARY_LINK } from "../../utils/constants";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "../../store";
const SingleProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [mainphoto, setMainphoto] = useState("");
  const { id } = useParams();

  const { products } = useAppStore();

  useEffect(() => {
    const filteredProduct = products.filter((product) => product._id === id);

    setProduct(filteredProduct);
  }, [products, id]);

  const handleBackClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const keyDisplayNameMap = {
    AdditionalInfo: "Additional Info",
    DentsScratches: "Dents/Scratches",
    PublishedDate: "Published Date",
  };
  if (product?.length > 0) {
    if (mainphoto === "") {
      setMainphoto(product[0]?.images[0].url);
    }
  }
  return product?.length > 0 ? (
    <div className="singleproductpage">
      <button onClick={handleBackClick} className="back-btn">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="main-container">
        <div className="left">
          <div className="main">
            <div className="main-cover-photo">
              <img src={`${CLODUINARY_LINK + mainphoto}`} alt="" />
            </div>
          </div>
          <div className="slider-main">
            <div className="photo-slider">
              {product[0]?.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="img-body-small"
                    onClick={() => setMainphoto(image.url)}
                  >
                    <img src={`${CLODUINARY_LINK + image.url}`} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav-history">
            <p>
              <Link to={"/"}>Home</Link> {">"}{" "}
              <Link to={"/buyexchange"}> Buy</Link> {">"} {product[0].category}{" "}
              {">"} {product[0].title}
            </p>
          </div>

          <div className="product-id">PR # {product[0]._id}</div>
          <div className="product-title">{product[0].title}</div>
          <div className="price">₹ {product[0].details?.price}</div>

          <div className="contact-btns">
            <button className="contact-btn">Contact No.</button>
            <button className="contact-btn">Message</button>
          </div>
          {/* <div className="main-details">
            <div className="product-details">
              <div className="category-detail">
                <div className="detail-box-title">PR</div>
                <div className="detail-box-title">Category</div>
                <div className="detail-box-title">Brand</div>
                <div className="detail-box-title">Color</div>
                <div className="detail-box-title">Condition</div>
                <div className="detail-box-title">Warranty</div>
                <div className="detail-box-title">Dent/Scratches</div>
                <div className="detail-box-title">Location</div>
                <div className="detail-box-title">Published Date</div>
                <div className="detail-box-title">Additional Information</div>
              </div>
              <div className="category-detail-data">
                <div className="detail-box-body">: #1</div>
                <div className="detail-box-body">: Mobile Phone</div>
                <div className="detail-box-body">: Apple</div>
                <div className="detail-box-body">: Starlight</div>
                <div className="detail-box-body">: Gently Used</div>
                <div className="detail-box-body">: No</div>
                <div className="detail-box-body">: No</div>
                <div className="detail-box-body">: Phagwara</div>
                <div className="detail-box-body">: 12-Oct-2024</div>
                <div className="detail-box-body">
                  : something here about product
                </div>
              </div>
            </div>
          </div> */}
          <div className="product-details">
            <table className="details-table">
              <tbody>
                {product.length > 0
                  ? Object.entries(product[0]?.details).map(([key, value]) => (
                      <tr key={key}>
                        <td className="label-cell">
                          {keyDisplayNameMap[key] || key}
                        </td>
                        <td className="value-cell">
                          {": "}
                          {value.includes("\n")
                            ? value.split("\n").map((line, index) => (
                                <Fragment key={index}>
                                  {line}
                                  <br />
                                </Fragment>
                              ))
                            : value}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default SingleProductPage;
