import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import logo from "../assets/logo.png";
import "../styles/NavBar.css";
const NavBar = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo-img">
              <img
                src={logo}
                className="logo-navbar"
                alt="mettre un fontawsome"
              />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <h5>Bienvenue 'ehdized'</h5>
              </NavLink>
            </li>
            logo logout
          </ul>
        ) : (
          <ul>
            <li></li>
            <NavLink to="/connexion"></NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
