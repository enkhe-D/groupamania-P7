import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/pages/home.css";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" className="active-left-nav">
            <i className="fa-solid fa-house"></i>
          </NavLink>
          <br />
          <NavLink to="/trending" className="active-left-nav">
            <i className="fa-solid fa-heart"></i>
          </NavLink>
          <br />
          <NavLink to="/profil" className="active-left-nav">
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
