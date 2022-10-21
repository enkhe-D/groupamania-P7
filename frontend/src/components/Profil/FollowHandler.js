import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";
import "../../styles/pages/home.css";
import "../../styles/pages/profil.css";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && <i className="fa-solid fa-check"></i>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Suivre</button>
          )}
          {type === "card" && (
            <i className="fa-solid fa-check icon-checked"></i>
          )}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
