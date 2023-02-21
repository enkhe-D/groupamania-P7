import { createContext, useState } from "react";
const defaultValue = {
  token: "",
  userId: null,
  admin: false,
  userIsLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

//controle du token dans le localstorage
const tokenStorage = sessionStorage.getItem("token");
const userIdStorage = sessionStorage.getItem("userId");
const adminStorage = sessionStorage.getItem("admin");

//context provider
export const AuthContextProvider = (props) => {
  //stokage du token
  const [token, setToken] = useState(tokenStorage);
  const [userId, setUserId] = useState(userIdStorage);
  const [admin, setAdmin] = useState(adminStorage);

  //fonction pour mettre a jour le token dans le state
  const loginHandler = (token, userId, admin) => {
    setToken(token);
    setUserId(userId);
    setAdmin(admin)

    //enregistrer les données dans le localstorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setAdmin("admin", admin)
  };

  //pour se déconnecter
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setAdmin(null);
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("userId");
    //sessionStorage.removeItem("userId");
    sessionStorage.clear();
  };

  //si connecter
  const userIsLoggedIn = !!token;

  //context value
  const contextValue = {
    token: token,
    userId: userId,
    admin: admin, 
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
