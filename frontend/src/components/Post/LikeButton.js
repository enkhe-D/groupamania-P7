import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions/post.action";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userId = useContext(UserIdContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };
  const unlike = () => {};

  useEffect(() => {
    if (post.likers.includes(userId)) setLiked(true);
  }, [userId, post.likers, liked]);

  return (
    <div className="like-container">
      {userId === null && (
        <Popup
          trigger={<i className="fa-regular fa-heart"></i>}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez vous pour aimer un post</div>
        </Popup>
      )}
      {userId && liked === false && (
        <i className="fa-solid fa-heart" onClick={like}></i>
      )}

      {userId && liked && (
        <i className="fa-regular fa-heart" onClick={unlike}></i>
      )}
    </div>
  );
};

export default LikeButton;
