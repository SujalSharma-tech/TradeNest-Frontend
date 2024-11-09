import "./buyexchange.scss";
import Banner2 from "../../components/banner2/Banner2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Itemcard from "../../components/itemcard/Itemcard";
import Getintouch from "../../components/getintouch/Getintouch";
const BuyExchange = () => {
  const type = ["Buy", "Exchange"];
  const [Query, setQuery] = useState({ type: "Buy" });
  const [condition, setCondition] = useState({
    new: false,
    gentlyUsed: false,
    heavilyUsed: false,
  });
  const [category, setCategory] = useState({
    Electronics: false,
    Bicycle: false,
    Books: false,
    Clothes: false,
    Furniture: false,
    Others: false,
  });

  const [price, setPrice] = useState({
    min: "",
    max: "",
  });

  const [location, setLocation] = useState({
    University: false,
    Outside: false,
  });

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    setLocation((prevCondition) => {
      const updatedCondition = {
        ...prevCondition,
        [name]: checked,
      };
      //    onSaveQuery({ condition: updatedCondition, price });
      return updatedCondition;
    });
  };
  const handleConditionChange = (e) => {
    const { name, checked } = e.target;
    setCondition((prevCondition) => {
      const updatedCondition = {
        ...prevCondition,
        [name]: checked,
      };
      //    onSaveQuery({ condition: updatedCondition, price });
      return updatedCondition;
    });
  };
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategory((prevCondition) => {
      const updatedCondition = {
        ...prevCondition,
        [name]: checked,
      };
      //    onSaveQuery({ condition: updatedCondition, price });
      return updatedCondition;
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prevPrice) => {
      const updatedPrice = {
        ...prevPrice,
        [name]: value,
      };
      // onSaveQuery({ condition, price: updatedPrice });
      return updatedPrice;
    });
  };

  const switchType = (val) => {
    setQuery({ type: val });
  };
  return (
    <div className="buyexchange">
      <Banner2 />
      <div className="button-type-container">
        <div className="button-type">
          {type.map((type) => {
            return (
              <button
                key={type}
                className={Query.type == type ? "active" : ""}
                onClick={() => switchType(type)}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="main-container">
        <div className="left">
          <h3>Filter</h3>
          <div className="filter-section">
            <h3>Condition</h3>
            <label>
              <input
                type="checkbox"
                name="new"
                checked={condition.new}
                onChange={handleConditionChange}
              />
              New
            </label>
            <label>
              <input
                type="checkbox"
                name="gentlyUsed"
                checked={condition.gentlyUsed}
                onChange={handleConditionChange}
              />
              Gently Used
            </label>
            <label>
              <input
                type="checkbox"
                name="heavilyUsed"
                checked={condition.heavilyUsed}
                onChange={handleConditionChange}
              />
              Heavily Used
            </label>
          </div>
          {/*  */}
          <div className="filter-section">
            <h3>Category</h3>
            <label>
              <input
                type="checkbox"
                name="Electronics"
                checked={category.Electronics}
                onChange={handleCategoryChange}
              />
              Electronics
            </label>
            <label>
              <input
                type="checkbox"
                name="Bicycle"
                checked={category.Bicycle}
                onChange={handleCategoryChange}
              />
              Bicycle
            </label>
            <label>
              <input
                type="checkbox"
                name="Books"
                checked={condition.Books}
                onChange={handleCategoryChange}
              />
              Books
            </label>
            <label>
              <input
                type="checkbox"
                name="Clothes"
                checked={category.Clothes}
                onChange={handleCategoryChange}
              />
              Clothes
            </label>
            <label>
              <input
                type="checkbox"
                name="Furniture"
                checked={category.Furniture}
                onChange={handleCategoryChange}
              />
              Furniture
            </label>
            <label>
              <input
                type="checkbox"
                name="Others"
                checked={category.Others}
                onChange={handleCategoryChange}
              />
              Others
            </label>
          </div>

          <div className="filter-section">
            <h3>Location</h3>
            <label>
              <input
                type="checkbox"
                name="University"
                checked={location.University}
                onChange={handleLocationChange}
              />
              University
            </label>
            <label>
              <input
                type="checkbox"
                name="Outside"
                checked={location.Outside}
                onChange={handleLocationChange}
              />
              Outside
            </label>
          </div>

          <div className="filter-section">
            <h3>Price</h3>
            <div className="price-body">
              <label>
                <input
                  type="number"
                  name="min"
                  value={price.min}
                  onChange={handlePriceChange}
                  placeholder="Min price"
                />
              </label>
              <label>
                <input
                  type="number"
                  name="max"
                  value={price.max}
                  onChange={handlePriceChange}
                  placeholder="Max price"
                />
              </label>
            </div>
          </div>
          <button className="search-filter-btn">Search</button>
        </div>
        <div className="right">
          <div className="search-filter">
            <div className="search-bar">
              <input type="text" placeholder="Search Products Here" />
              <button>
                <Search />
              </button>
            </div>
            <button className="filter-toggle" onClick={toggleFilters}>
              {showFilters ? "Filters ▲" : "Filters ▼"}
            </button>
          </div>
          {showFilters && (
            <div className="mobile-filter-view">
              <h3 className="mobile-filter">Filter</h3>
              <div className="filter-container">
                <div className="filter-section">
                  <h3>Condition</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="new"
                      checked={condition.new}
                      onChange={handleConditionChange}
                    />
                    New
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="gentlyUsed"
                      checked={condition.gentlyUsed}
                      onChange={handleConditionChange}
                    />
                    Gently Used
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="heavilyUsed"
                      checked={condition.heavilyUsed}
                      onChange={handleConditionChange}
                    />
                    Heavily Used
                  </label>
                </div>
                <div className="filter-section">
                  <h3>Category</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="Electronics"
                      checked={category.Electronics}
                      onChange={handleCategoryChange}
                    />
                    Electronics
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Bicycle"
                      checked={category.Bicycle}
                      onChange={handleCategoryChange}
                    />
                    Bicycle
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Books"
                      checked={condition.Books}
                      onChange={handleCategoryChange}
                    />
                    Books
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Clothes"
                      checked={category.Clothes}
                      onChange={handleCategoryChange}
                    />
                    Clothes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Furniture"
                      checked={category.Furniture}
                      onChange={handleCategoryChange}
                    />
                    Furniture
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Others"
                      checked={category.Others}
                      onChange={handleCategoryChange}
                    />
                    Others
                  </label>
                </div>
                <div className="filter-section">
                  <h3>Location</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="University"
                      checked={location.University}
                      onChange={handleLocationChange}
                    />
                    University
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Outside"
                      checked={location.Outside}
                      onChange={handleLocationChange}
                    />
                    Outside
                  </label>
                </div>
                <div className="filter-section">
                  <h3>Price</h3>
                  <div className="price-body">
                    <label>
                      <input
                        type="number"
                        name="min"
                        value={price.min}
                        onChange={handlePriceChange}
                        placeholder="Min price"
                      />
                    </label>
                    <label>
                      <input
                        type="number"
                        name="max"
                        value={price.max}
                        onChange={handlePriceChange}
                        placeholder="Max price"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button className="filter-search-btn-mobile">Search</button>
            </div>
          )}
          <div className="featured-container">
            <Link to={"/productdetails/1"}>
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
            </Link>
            <Link to={"/productdetails/5"}>
              <Itemcard />
            </Link>
            <Link to={"/productdetails/6"}>
              <Itemcard />
            </Link>
            <Link to={"/productdetails/7"}>
              <Itemcard />
            </Link>
            <Link to={"/productdetails/8"}>
              <Itemcard />
            </Link>
          </div>
        </div>
      </div>
      <Getintouch />
    </div>
  );
};

export default BuyExchange;
