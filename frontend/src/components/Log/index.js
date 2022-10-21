import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "../../styles/components/log.css";
import "../../styles/pages/home.css";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signin);
  const [signInModal, setSignInModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
      </div>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
};

export default Log;
