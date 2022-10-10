import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous suppimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <i className="fa-solid fa-trash"></i>
    </div>
  );
};

export default DeleteCard;
