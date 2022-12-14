import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log("-----ICI---isLoggedIn----MainHeader.js------");
  console.log(isLoggedIn);

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to="Home"
          >
            {" "}
            <li>Accueil</li>
          </NavLink>

          {isLoggedIn && (
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="Post"
            >
              {" "}
              <li>Post</li>
            </NavLink>
          )}

          {isLoggedIn && (
            <li onClick={authCtx.logout} className={classes.disconnect}>
              Se déconnecter
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
