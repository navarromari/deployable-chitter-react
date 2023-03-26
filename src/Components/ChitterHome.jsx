import { NavLink } from "react-router-dom";

import AllPeeps from "./AllPeeps";
import AddPeep from "./AddPeep";
import homechick from "./images/homechick.png";
import "./css/ChitterHome.css";

const ChitterHome = ({ peeps, error, onSubmitPeep, loggedIn, user }) => {
  return (
    <div className="container" data-testid="chitter-home">
      {loggedIn && <AddPeep submitAction={onSubmitPeep} user={user} />}
      {!loggedIn && (
        <div className="login-alert">
          <img src={homechick} alt="Chicken" className="chicken-image" />
          <h1>
            {" "}
            <NavLink to="/login" className="login-link">
              Login
            </NavLink>{" "}
            to your Chitter account to start peeping
          </h1>
        </div>
      )}
      <AllPeeps data={{ peeps, error: error.message }} />
    </div>
  );
};

export default ChitterHome;
