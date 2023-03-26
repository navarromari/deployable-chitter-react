import { useState } from "react";
import PropTypes from "prop-types";
import PeepModel from "./utils/Peep.model";
import chicken from "./images/happychick.png";

const AddPeep = ({ submitAction, user }) => {
  const [author] = useState(user.username); //add setAuthor with user @
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const peepToSubmit = new PeepModel(
      author,
      new Date().toISOString(),
      message
    );
    submitAction(peepToSubmit);
    setMessage("");
  };

  return (
    <div className="addPeep">
      <form onSubmit={handleSubmit}>
        <div className="message-form">
          <img src={chicken} alt="Chicken" className="chicken-image" />
          <textarea
            id="message"
            data-testid="message-textarea"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="addpeep-button">
          Add Peep
        </button>
      </form>
    </div>
  );
};

AddPeep.propTypes = {
  submitAction: PropTypes.func.isRequired,
  peep: PropTypes.shape({
    peepAuthor: PropTypes.string,
    peepDateCreated: PropTypes.string,
    peepMessage: PropTypes.string,
  }),
};

export default AddPeep;
