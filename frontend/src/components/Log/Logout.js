import React from "react";
import axios from "axios";

const Logout = () => {
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: false,
    });
  };
  return (
    <li onClick={logout}>
      <img src="#" alt="mettre fontawsome" />
    </li>
  );
};

export default Logout;
