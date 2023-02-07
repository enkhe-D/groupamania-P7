import { createContext, useState } from "react";
const defaultValue = {
  token: "",
  userId: null,
  userIsLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

//controle du token dans le localstorage
const tokenStorage = localStorage.getItem("token");
const userIdStorage = localStorage.getItem("userId");

//context provider
export const AuthContextProvider = (props) => {
  //stokage du token
  const [token, setToken] = useState(tokenStorage);
  const [userId, setUserId] = useState(userIdStorage);

  //fonction pour mettre a jour le token dans le state
  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);

    //enregistrer les données dans le localstorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  //pour se déconnecter
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");

    localStorage.clear();
  };

  //si connecter
  const userIsLoggedIn = !!token;

  //context value
  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
