import "./navbar.scss";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import logoname from "./logomain.png";
import logoinitials from "./logoinitials.png";
import menu from "./menu.png";
import { Link } from "react-router-dom";
import { useAppStore } from "../../store";
import { LOGOUT_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import usericon from "./usericon.png";
const Navbar = () => {
  const { userInfo, setUserInfo } = useAppStore();
  console.log(userInfo);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isdropdownOpen, setIsdropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handledropdown = (e) => {
    e.stopPropagation();
    setIsdropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsdropdownOpen(false);
      }
    };

    if (isdropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isdropdownOpen]);

  const handlelogout = async () => {
    try {
      const data = await apiClient.get(LOGOUT_ROUTE, { withCredentials: true });
      if (data) {
        setUserInfo(undefined);

        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <div className="img1">
            <img src={logoinitials} alt="" />
          </div>

          <div className="img2">
            <img src={logoname} alt="" />
          </div>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/buyexchange">Buy/Exchange</Link>
        <Link to="/mylistings">My Listings</Link>
        <Link to="/apartments">Apartments/Rooms</Link>
      </div>
      <div className="right">
        {userInfo ? (
          <div className="user-profile-icon" onClick={handledropdown}>
            <div className="icon">
              <img src={usericon} alt="" />
            </div>
            <div className="user-profile-name">
              <p>{userInfo.first_name}</p>
            </div>
            {isdropdownOpen && (
              <div className="user-dropdown-options" ref={dropdownRef}>
                <Link to="/profile">Profile</Link>
                <Link to="/savedproducts">Saved Products</Link>
                <Link to="/createlisting">Create Listing</Link>
                <div onClick={handlelogout}>Logout </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signup" className="signup">
            SignUp <ArrowRight size={20} />
          </Link>
        )}
        <div
          className={isMenuOpen ? "menuicon white-icon" : "menuicon"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img src={menu} alt="" />
        </div>
        <div className={isMenuOpen ? "menuitems active" : "menuitems"}>
          <Link to="/">Home</Link>
          <Link to="/buyexchange">Buy/Exchange</Link>
          <Link to="/mylistings">My Listings</Link>
          <Link to="/apartments">Apartments/Rooms</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
