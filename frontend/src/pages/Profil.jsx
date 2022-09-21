import React, { useContext } from "react";
import Log from "../components/Log";
import "../styles/index.scss";
import { UserIdContext } from "../components/AppContext";

const Profil = () => {
  const userId = useContext(UserIdContext);
  return (
    <div className="profile-page">
      {userId ? (
        <h1>Update page</h1>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/icon.svg" alt="reseau social de groupomania" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
