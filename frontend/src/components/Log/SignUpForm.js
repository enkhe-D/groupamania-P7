import axios from "axios";
import { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmeError = document.querySelector(
      ".passwordConfirme.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmeError.innerHTML = " ";
    termsError.innerHTML = " ";

    if (password !== passwordControl || !terms.checked) {
      if (password !== passwordControl) {
        passwordConfirmeError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (!terms.checked) {
        termsError.innerHTML = "Valider les conditions générales";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log("---res dans SignUpForm---");
          console.log(res);

          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <br />
          <div className="pseudo error"></div>
          <br />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <div className="email error"></div>
          <br />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <div className="password error"></div>
          <br />

          <label htmlFor="passwordConfirme">Confirmer mot de passe</label>
          <input
            type="password"
            name="password"
            id="passwordConfirme"
            onChange={(e) => setPasswordControl(e.target.value)}
            value={passwordControl}
          />
          <br />
          <div className="passwordConfirme error"></div>
          <br />

          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferre">
              conditions générals
            </a>{" "}
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
