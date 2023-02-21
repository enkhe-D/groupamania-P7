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
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  //context
  const authCtx = useContext(AuthContext);

  //useState
  const [data, setData] = useState();
  const [isLogin, setIsLogin] = useState(true);

  //spinner pour le chargement des ressoucres
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //controler si error est true || false
  if (error) {
    console.log("erreur: true");
  } else {
    console.log("erreur: false");
  }

  const toggleAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const dataEmail = emailInputRef.current.value;
    const dataPassword = passwordInputRef.current.value;

    if (dataEmail.trim().length === 0 || dataPassword.trim().length === 0) {
      setError({
        title: "Un ou plusieurs champs sont vides",
        message: "Entrez un email et un mot de passe",
      });
      return;
    }

    const regExpEmail = (value) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    if (!regExpEmail(dataEmail)) {
      setError({
        title: "Email invalide",
        message: "Entrez un format de mail valide", //le message ne s affiche pas
      });
      return;
    }

    /********************************************************************** */

    const url = `http://localhost:5000/api/user/${
      isLogin ? "login" : "signup"
    }`;

    console.log("----> URL ROUTE authentification");
    console.log(url);

    const fetchHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: dataEmail,
            password: dataPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResponse = await response.json();

        //reponse du serveur du chargement
        setIsLoading(false);

        if (response.ok) {
          setData(dataResponse);
          authCtx.login(dataResponse.token, dataResponse.userId);
          //react router dom V6 nav par programmation
          navigate("/Post", { replace: true });
        } else {
          setError({
            title: "Authentification Echec",
            message: dataResponse.message,
          });
          throw new Error(dataResponse.error);
        }

        console.log("---->RESPONSE---");
        console.log(response);

        //voir la gestion des erreurs
        if (dataResponse && dataResponse.error) {
          console.log("je suis dans le if");
          console.log(dataResponse.error);
          setError({
            title: "Il y a un probleme",
            message: dataResponse.error,
          });
        }
      } catch (error) {
        console.log("problème serveur");
        console.log(error);
      }
    };

    //spinner pour le chargement
    setIsLoading(true);

    fetchHandler();

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: dataEmail,
        password: dataPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //  pour effacer les champs
    // emailInputRef.current.value = "";
    // passwordInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

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
            <input type="password" id="password" ref={passwordInputRef} />
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

        <div className={classes.styleFormImg}>
          <img src="../img/icon-above-font.png" alt="img-log" />
        </div>
      </section>
    </Wrapper>
  );
};

export default AuthForm;
