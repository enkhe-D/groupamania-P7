import React, { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import MainHeader from "./components/layout/MainHeader";
import Test from "./components/Test.js";
import Home from "./pages/Home";
import Post from "./pages/Post";
import AuthContext from "./store/authContext";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <MainHeader />
      <Routes>
        <Route index element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* {!isLoggedIn && <AuthForm />}
      <Test /> */}
    </>
  );
};

export default App;
