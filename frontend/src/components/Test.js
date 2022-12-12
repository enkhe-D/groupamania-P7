import { useContext } from "react";
import AuthContext from "../store/authContext";
//import classes from "./Test.module.css";
import Button from "./Ui/Button";

const Test = () => {
  const authCtx = useContext(AuthContext);
  console.log("------authCtx----------");
  console.log(authCtx);

  const isLoggedIn = authCtx.isLoggedIn;

  // requete pour acceder au ressource
  const url = "http://localhost:5000/api/auth/";

  const fetchHandler = async () => {
    try {
      const res = await fetch(url, {
        method: "GET",
        // body: JSON.stringify({
        //   userId: authCtx.userId,
        // }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authCtx.token}`,
        },
      });
      const dataResponse = await res.json();
      if (res.ok) {
        console.log(dataResponse);
      } else {
        throw new Error(dataResponse.error);
      }
    } catch (error) {
      console.log("probleme serveur la requête n est pas parti");
      console.log(error);
    }
  };

  if (isLoggedIn) {
    fetchHandler();
  }

  return (
    <>
      {isLoggedIn && <p>Composent test</p>}
      {!isLoggedIn && <p>Vous n'est pas connecté </p>}
      {isLoggedIn && <p>Bienvenue, vous êtes connecté</p>}
      {isLoggedIn && <p>Votre Token: {authCtx.token}</p>}
      {isLoggedIn && <p>Votre UserId: {authCtx.userId}</p>}
      {isLoggedIn && <p onClick={authCtx.logout}>Se déconnecter</p>}
      {isLoggedIn && <Button onClick={authCtx.logout}>Se déconnecter</Button>}
    </>
  );
};

export default Test;
