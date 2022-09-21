import React, { useState } from "react";
import { UserIdContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data);
        })

        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, []);

  return (
    <UserIdContext.Provider value={userId}>
      <Routes />
    </UserIdContext.Provider>
  );
};

export default App;
