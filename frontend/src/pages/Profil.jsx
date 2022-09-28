import React, { useContext } from "react";
import Log from "../components/Log";
import { UserIdContext } from "../components/AppContext";
//import styled from "styled-components";
import "../styles/pages/home.css";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const userId = useContext(UserIdContext);
  return (
    <div className="profil-page">
      {userId ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
