import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";
//import classes from "../components/Test.module.css";
//import Button from "../components/Ui/Button";
import { Navigate } from "react-router-dom";
import FicheProfil from "../components/FichePost/FichePost";

const Profil = () => {
  const authCtx = useContext(AuthContext);

  const [data, setData] = useState([]);

  const isLoggedIn = authCtx.isLoggedIn;

  // requete pour acceder au ressource
  const url = `http://localhost:5000/api/post/`;

  console.log("-----------url---Post.js--------");
  console.log(url);
  // probleme pour récupérer les données GET

  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      const dataResponse = await response.json();
      console.log("--------dataResponse---Post.js------");
      console.log(dataResponse);

      if (response.ok) {
        const dataLisible = () => {
          return {
            pseudo: dataResponse.posts[0].pseudo,
            nom: dataResponse.posts[0].nom,
            prenom: dataResponse.posts[0].prenom,
            message: dataResponse.posts[0].message,
            image: dataResponse.posts[0].imageUrl,
          };
        };
        setData(dataLisible);
      } else {
        throw new Error(dataResponse.error);
      }
    } catch (error) {
      console.log(
        "---probleme serveur: la requête n est pas parti---Post.js-----------"
      );
      console.log(error);
    }
  }, [authCtx.token, url]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchHandler();
    }
  }, [fetchHandler, isLoggedIn]);

  return (
    <>
      {!isLoggedIn && <Navigate to="/" replace={true} />}
      {isLoggedIn && <FicheProfil data={data} />}
    </>
  );
};

export default Profil;
