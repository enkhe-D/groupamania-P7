import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { UserIdContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import "../styles/pages/home.css";
import "../styles/components/thread.css";

const Trending = () => {
  const userId = useContext(UserIdContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {userId && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trending;
