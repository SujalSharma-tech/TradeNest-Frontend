import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";
const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
