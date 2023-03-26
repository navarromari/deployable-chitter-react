import PropTypes from "prop-types";
import PeepModel from "./utils/Peep.model";

const Peep = ({ peep }) => {
  const { peepAuthor, peepDateCreated, peepMessage } = peep;
  const dateCreated = new Date(peepDateCreated).toUTCString();
  const author = peepAuthor;
  const message = peepMessage;

  return (
    <div className="peep">
      <h3>@{author} says:</h3>
      <h2>{message}</h2>

      <p>{dateCreated}</p>
    </div>
  );
};

Peep.propTypes = {
  peep: PropTypes.instanceOf(PeepModel),
};

export default Peep;
