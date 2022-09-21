import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/index.scss";
import { UserIdContext } from "./AppContext";
import "../styles/index.scss";
import Logout from "./Log";

const Navbar = () => {
  const userId = useContext(UserIdContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.svg" alt="icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {userId ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue 'valeur dynamique'</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icon.svg" className="logout" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
