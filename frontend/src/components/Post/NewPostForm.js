import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.action";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      data.append("video", video);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez enter un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  const handleVideo = () => {
    let findLink = message.split(" ");
    for (let i = 0; i > findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("wtach?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(" "));
        setPostPicture("");
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>
              <span>
                {" "}
                Abonnement
                {userData.following && userData.following.length > 1
                  ? "s"
                  : null}
              </span>
            </p>

            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>
              <span>
                {" "}
                Abonné
                {userData.followers && userData.followers.length > 1
                  ? "s"
                  : null}
              </span>
            </p>
          </div>

          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>

          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Je post!"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="picturee" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encttyped-media; gyroscope; picture-inpucture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <i className="fa-solid fa-image"></i>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}

                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;