import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="app-header-container container">
      <Link to="/" className="main">
        <h1>Techni Calendar</h1>
      </Link>

      <Link to="/admin" className="adminButton">
        Admin
      </Link>
    </div>
  );
};

export default Header;
