import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";
//import classes from "../components/Test.module.css";
//import Button from "../components/Ui/Button";
import { Navigate } from "react-router-dom";
import FichePost from "../components/FichePost/FichePost";

const Post = () => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);

  const isLoggedIn = authCtx.isLoggedIn;

  const userId = authCtx.userId;

  // requete pour acceder au ressource
  const url = "http://localhost:5000/api/post/" + userId;

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

      if (response.ok) {
        const dataLisible = () => {
          return {
            pseudo: dataResponse.post[0].pseudo,
            message: dataResponse.post[0].message,
            imageUrl: dataResponse.post[0].imageUrl,
          };
        };
        setData(dataLisible);
      } else {
        throw new Error(dataResponse.error);
      }
    } catch (error) {
      console.log("---> probleme serveur: la requête n est pas parti: Post.js");
      console.log(error);
    }
  }, [authCtx.token, url]);

  // pour executer la fonction au montage du composant
  useEffect(() => {
    if (isLoggedIn) {
      fetchHandler();
    }
  }, [fetchHandler, isLoggedIn]);

  console.log("----state/data---Post.js");
  console.log(data);

  const onRefresh = () => {
    fetchHandler();
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/" replace={true} />}
      {isLoggedIn && <FichePost data={data} onRefresh={onRefresh} />}
    </>
  );
};

export default Post;
