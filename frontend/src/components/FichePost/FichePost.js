import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./FichePost.module.css";
import Button from "../Ui/Button";
import AuthContext from "../../store/authContext";

const FichePost = ({ data }) => {
  // console.log("--------state dataUpdate-------");
  // console.log(data);

  const [dataUpdate, setDataUpdate] = useState(data);
  const [modification, setModification] = useState(false);
  const authCtx = useContext(AuthContext);

  const pseudoInputRef = useRef();
  const messageInputRef = useRef();
  const nomInputRef = useRef();
  const prenomInputRef = useRef();

  console.log("-------dataUpdate----FichePost.js------------");
  console.log(dataUpdate);

  useEffect(() => {
    //  console.log("je suis dans le useEffect");
    setDataUpdate(data);
  }, [data]);

  // modifier les données
  const modificationHandler = () => {
    setModification((modification) => !modification);
    // console.log("----modification---FichePost.js---------");
    // console.log(modification);
  };

  // modification faites sur dans les champs
  const changeHandler = (event) => {
    const dataPseudo = pseudoInputRef.current.value;
    const dataMessage = messageInputRef.current.value;
    const dataNom = nomInputRef.current.value;
    const dataPrenom = prenomInputRef.current.value;

    //gestion nouvelle image
    // console.log("-------e---FichePost.js---------");
    // console.log(e.target.files[0]);

    let newImage;
    if (event.target.files && event.target.files.length === 1) {
      newImage = event.target.files[0];
    }

    console.log("---nouvelle image--- FichePost.js-----");
    console.log(newImage);

    // mise a jours des states
    setDataUpdate({
      ...dataUpdate,
      pseudo: dataPseudo,
      message: dataMessage,
      nom: dataNom,
      prenom: dataPrenom,
      newImage: newImage,
    });

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("post", JSON.stringify(dataUpdate));

    console.log("-----------formData---FicheForm.js----------");
    console.log(formData.get("image"));
    console.log(formData.get("post"));
    console.log("'''''''''''''''''''''''''''''''");

    const url = "http://localhost:5000/api/post/post";

    const fetchUploadHandler = async () => {
      try {
        const responseFUH = await fetch(url, {
          method: "PUT",
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
          body: formData,
        });

        const dataResponse = await responseFUH.json();

        if (responseFUH.ok) {
          console.log("----responseFUH---FichePost.js");
          console.log(responseFUH);
          console.log(dataResponse);
        } else {
          console.log("-------pas ok response fetchUpH FichePost.js");
          console.log(responseFUH);
          console.log(dataResponse);
          throw new Error(dataResponse.error);
        }
      } catch (error) {
        console.log("dans le catch error update serveur error");
        console.log(error);
      }
    };
    fetchUploadHandler();
  };

  return (
    <>
      <section className={classes.profil}>
        <h1>Bonjour {dataUpdate.pseudo} </h1>
        <p>enjoy</p>
        <p>
          <img src={data && data.image} alt="profil img" />
        </p>
        {modification && (
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={changeHandler}
          />
        )}

        <p>Pseudo: </p>
        {!modification && <p>{dataUpdate.pseudo}</p>}
        {modification && (
          <input
            type="text"
            value={dataUpdate.pseudo}
            onChange={changeHandler}
            ref={pseudoInputRef}
          />
        )}

        <p>Nom: {data && data.nom}</p>
        {!modification && <p>{dataUpdate.nom}</p>}
        {modification && (
          <input
            type="text"
            value={dataUpdate.nom}
            onChange={changeHandler}
            ref={nomInputRef}
          />
        )}

        <p>Prénom: {data && data.prenom}</p>
        {!modification && <p>{dataUpdate.prenom}</p>}
        {modification && (
          <input
            type="text"
            value={dataUpdate.prenom}
            onChange={changeHandler}
            ref={prenomInputRef}
          />
        )}

        <p>Message: </p>
        {!modification && <p>{dataUpdate.message}</p>}
        {modification && (
          <input
            type="text"
            value={dataUpdate.message}
            onChange={changeHandler}
            ref={messageInputRef}
          />
        )}

        <div className="button">
          <Button onClick={modificationHandler}>
            {!modification ? "Modifier Post" : "Envoyer"}
          </Button>
          <Button>Supprimer Post</Button>
        </div>
      </section>
    </>
  );
};

export default FichePost;
