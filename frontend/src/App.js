import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./pages/Log";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Header from "./components/Header";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/63f45d706de145ea445a043e`,
        withCredentials: false,
      })
        .then((res) => {
          console.log("---res dans App.js---");
          console.log(res);

          setUid(res.data);
        })
        .catch((err) => console.log("No Token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
