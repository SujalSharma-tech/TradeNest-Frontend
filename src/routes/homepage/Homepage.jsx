import "./homepage.scss";
import electronics from "./cat-1.png";
import bicycle from "./cat-2.png";
import books from "./cat-3.png";
import clothes from "./cat-4.png";
import furniture from "./cat-5.png";
import others from "./cat-6.png";
import Itemcard from "../../components/itemcard/Itemcard";
import Getintouch from "../../components/getintouch/Getintouch";
import Banner2 from "../../components/banner2/Banner2";
import HeroSection from "../../components/herosection/HeroSection";
import { Link } from "react-router-dom";
import { useAppStore } from "../../store";
const Homepage = () => {
  const { products } = useAppStore();
  console.log(products);
  return (
    <div className="homepage">
      <HeroSection />

      <div className="categories">
        <h1>Categories</h1>
      </div>

      <div className="categories-container">
        <div className="category-box">
          <div className="category-img">
            <img src={electronics} />
          </div>
          <div className="category-name">Electronics</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={bicycle} />
          </div>
          <div className="category-name">Bicycle</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={books} />
          </div>
          <div className="category-name">Books</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={clothes} />
          </div>
          <div className="category-name">Clothes</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={furniture} />
          </div>
          <div className="category-name">Furniture</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={electronics} />
          </div>
          <div className="category-name">Electronics</div>
        </div>
        <div className="category-box">
          <div className="category-img">
            <img src={others} />
          </div>
          <div className="category-name">Others</div>
        </div>
      </div>

      <div className="featured">
        <h1>Featured Listings</h1>
      </div>

      <div className="featured-container">
        {products &&
          products.map((product) => {
            return (
              <Link key={product._id} to={`/productdetails/${product._id}`}>
                <Itemcard product={product} />
              </Link>
            );
          })}
        {/* <Link to={"/productdetails/1"}>
          <Itemcard />
        </Link>
        <Link to={"/productdetails/2"}>
          <Itemcard />
        </Link>
        <Link to={"/productdetails/3"}>
          <Itemcard />
        </Link>
        <Link to={"/productdetails/4"}>
          <Itemcard />
        </Link> */}
      </div>

      <Banner2 />
      <Getintouch />
    </div>
  );
};

export default Homepage;
