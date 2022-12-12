import { useContext, useRef, useState } from "react";
import Button from "../Ui/Button";
import classes from "./authForm.module.css";
import ErrorModal from "../Ui/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import Loader from "../Ui/Loader";
import AuthContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInuptRef = useRef();

  const navigate = useNavigate();

  //context
  const authCtx = useContext(AuthContext);
  console.log("--------authCtx---authForm.js-------------");
  console.log(authCtx.token);

  const [data, setData] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  console.log("------context----authForm.js-----------");
  console.log(typeof error);

  //controler si error est true || false
  if (error) {
    console.log("true");
  } else {
    console.log("false");
  }

  const toggleAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const dataEmail = emailInputRef.current.value;
    const dataPassword = passwordInuptRef.current.value;

    //logique a éxécuter

    if (dataEmail.trim().length === 0 || dataPassword.trim().length === 0) {
      setError({
        title: "Un ou plusieurs champs sont vides",
        message: "Entrez vote email ou mot de passe",
      });
      return;
    }

    const regExpEmail = (value) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    if (!regExpEmail(dataEmail)) {
      setError({
        title: "Email invalide",
        message: "Entrez un format de mail valide",
      });
      return;
    }

    const url = `http://localhost:5000/api/auth/${
      isLogin ? "login" : "signup"
    }`;

    const fetchHandler = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: dataEmail,
            password: dataPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataRes = await res.json();

        //reponse du serveur du chargement
        setIsLoading(false);

        if (res.ok) {
          setData(dataRes);
          console.log("---------res.ok---dataRes--- authForm.js--");
          console.log(dataRes);
          authCtx.login(dataRes.token, dataRes.userId);

          //react router dom V6 nav par programation
          navigate("/Post", { replace: true });
        } else {
          setError({
            title: "Authentification Echec",
            message: dataRes.error,
          });

          throw new Error(dataRes.error);
        }
      } catch (error) {
        console.log("---------problème serveur-----authForm.js");
        console.log(error);
      }
    };

    //spinner pour le chargement
    setIsLoading(true);

    fetchHandler();

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: dataEmail,
    //     password: dataPassword,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //pour effacer les champs
    // emailInputRef.current.value = "";
    // passwordInuptRef.current.value = "";
    // azertyAZERTY01
  };

  const errorHandler = () => {
    setError(null);
  };

  console.log("------data---autheForm.js-----------");
  console.log(data);

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <section className={classes.auth}>
        {isLogin ? <h1>Se connecter</h1> : <h1>Créer un compte</h1>}

        <form onSubmit={submitHandler}>
          <div className={classes.styleForm}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>

          <div className={classes.styleForm}>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" ref={passwordInuptRef} />
          </div>

          <div className={classes.btnForm}>
            {!isLoading && (
              <Button type={"submit"}>
                {isLogin ? "Se connecter" : "Créer un compte"}
              </Button>
            )}

            <p onClick={toggleAuthModeHandler}>
              {isLogin ? "Créer un compte" : "Se connecter"}
            </p>

            {/* {isLoading && <p>En cours de chargement...</p>} */}
            {isLoading && <Loader />}
          </div>
        </form>
      </section>
    </Wrapper>
  );
};

export default AuthForm;
