import React, { useContext } from "react";
import { UserIdContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import "../styles/pages/home.css";
import Log from "../components/Log";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
  const userId = useContext(UserIdContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {userId ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {userId && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
