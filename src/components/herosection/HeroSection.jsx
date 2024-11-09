import "./herosection.scss";
import { Search } from "lucide-react";
import groupimg from "./group.png";
const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-info">
        <div className="text">
          <h1>TradeNest</h1>
          <h3>Everything You Need,</h3>
          <h3>Right Here on Campus</h3>
        </div>
        <div className="search">
          <div className="search-bar">
            <input type="text" placeholder="What are you looking for?" />
            <button className="search-button">
              <Search size={24} />
            </button>
          </div>
        </div>
        <div className="hero-phone-img">
          <img src={groupimg} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
