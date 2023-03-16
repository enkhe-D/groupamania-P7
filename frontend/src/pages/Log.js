import React, { useContext } from "react";
import Log from "../components/Log";
import "../styles/Log.css";

import { UidContext } from "../components/AppContext";

const Connexion = () => {
  const uid = useContext(UidContext);

  return (
    <div className="log-page">
      {uid ? (
        <h1>UpdatePage</h1>
      ) : (
        <div className="connexion-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img
              src="../img/logo.png"
              alt="lodo de l entreprise"
              className="img-log-page"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Connexion;
