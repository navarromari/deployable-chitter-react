import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ChitterHome from "./Components/ChitterHome";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import "./App.css";

import { getPeeps, submitPeep } from "./asyncFunctions/chitterAPICalls.js";

function App() {
  const [peeps, setPeeps] = useState([]);
  const [error, setError] = useState({ type: ``, message: `` });
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const getPeepsHandler = async () => {
    const externalDataCallResult = await getPeeps();
    if (externalDataCallResult?.error) {
      const errorObject = {
        ...externalDataCallResult.error,
      };
      errorObject.message = `There was a problem getting the peeps: ${externalDataCallResult.error.message}`;
      setError(errorObject);
    }

    const peeps = externalDataCallResult?.peeps
      ? externalDataCallResult.peeps
      : [];

    setPeeps(peeps);
  };

  useEffect(() => {
    getPeepsHandler();
  }, []);

  const submitPeepHandler = async (peep) => {
    const externalDataCallResult = await submitPeep(peep);

    if (externalDataCallResult?.error) {
      const errorObject = { ...externalDataCallResult.error };
      errorObject.message = `There was a problem adding the peep: ${externalDataCallResult.error.message}`;

      return setError(errorObject);
    }

    getPeepsHandler();
  };

  return (
    <div className="App">
      <Router>
        <Header
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          setUser={setUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ChitterHome
                peeps={peeps}
                error={error}
                onSubmitPeep={submitPeepHandler}
                loggedIn={loggedIn}
                user={user}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
