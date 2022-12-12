import { useContext } from "react";
import AuthForm from "../components/Auth/AuthForm";
import Feed from "../components/feed/Feed";
import AuthContext from "../store/authContext";
import "../../src/index.css";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <>
      <section>{!isLoggedIn && <AuthForm />}</section>
      {isLoggedIn && <Feed />}
    </>
  );
};

export default Home;
