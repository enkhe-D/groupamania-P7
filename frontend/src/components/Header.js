import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";
import "../styles/pages/home.css";

const Header = () => {
  const userId = useContext(UserIdContext);
  const userData = useSelector((state) => state.userReducer);

  console.log(userData);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/profil">
            <div className="logo">
              <img src="./img/logo.png" alt="logo" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {userId ? (
          <ul>
            <li></li>
            <li className="welcome btn">
              <NavLink to="/profil">
                <h5>Bienvenu {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <i className="fa-solid fa-right-to-bracket"></i>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
