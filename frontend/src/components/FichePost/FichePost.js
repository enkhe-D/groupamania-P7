import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./FichePost.module.css";
import Button from "../Ui/Button";
import AuthContext from "../../store/authContext";

const FichePost = ({ data, onRefresh }) => {
  const [dataUpdate, setDataUpdate] = useState(data);
  const [modification, setModification] = useState(false);
  const authCtx = useContext(AuthContext);

  const userId = authCtx.userId;

  const refPseudo = useRef();
  const refMessage = useRef();

  //pour mettre à jour le state dataUpdate
  useEffect(() => {
    setDataUpdate(data);
  }, [data]);

  // modifier les données sur la page
  const modificationHandler = () => {
    setModification((modification) => !modification);
  };

  // voir les modifications faites dans les champs
  const changeHandler = (event) => {
    const dataPseudo = refPseudo.current.value;
    const dataMessage = refMessage.current.value;

    //gestion nouvelle image
    let changeImg;
    if (event.target.files && event.target.files.length === 1) {
      changeImg = event.target.files[0];
    }

    // mise a jours des states
    setDataUpdate({
      ...dataUpdate,
      pseudo: dataPseudo,
      message: dataMessage,
      imageUrl: changeImg,
    });

    const dataUpdateFormData = {
      pseudo: dataPseudo,
      message: dataMessage,
      imageUrl: changeImg,
    };

    //envoie des donnees modifiés
    const formData = new FormData();
    formData.append("image", changeImg);
    formData.append("post", JSON.stringify(dataUpdateFormData));

    const url = "http://localhost:5000/api/post/" + userId;

    const fetchUploadHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
          body: formData,
        });
        const dataResponse = await response.json();

        if (response.ok) {
          console.log("----response.ok---FichePost.js------");
          console.log(response);
          console.log(dataResponse);
        } else {
          console.log(
            "---> PAS OK response fetchfetchUploadHandler: FichePost.js"
          );
          console.log(response);
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

  //   pour render automatiquement GET
  useEffect(() => {
    onRefresh();
  }, [modification]);

  return (
    <>
      <section className={classes.post}>
        <h1>Bonjour {dataUpdate.pseudo} </h1>

        <p>vous etes dans le Post</p>

        <p>
          <img src={data && data.imageUrl} alt="profil img" />
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
            ref={refPseudo}
          />
        )}

        <p>Message: </p>
        {!modification && <p>{dataUpdate.message}</p>}
        {modification && (
          <input
            type="text"
            value={dataUpdate.message}
            onChange={changeHandler}
            ref={refMessage}
          />
        )}

        <div className="button">
          <Button key="btn1" onClick={modificationHandler}>
            {!modification ? "Modifier Post" : "Envoyer"}
          </Button>
          <Button key="btn2">Supprimer Post</Button>
        </div>
      </section>
    </>
  );
};

export default FichePost;
