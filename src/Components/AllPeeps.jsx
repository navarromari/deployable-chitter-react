import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Peep from "./Peep";
import PeepModel from "./utils/Peep.model";

const AllPeeps = ({ data }) => {
  const [dataStatus, setDataStatus] = useState({
    name: `loading`,
    message: `Data is loading...`,
  });

  useEffect(() => {
    const { error } = data;
    if (error?.length) {
      return setDataStatus({ name: `error`, message: error });
    }
  }, [data]);

  const populatePeeps = () => {
    const { peeps } = data;
    if (peeps?.length > 0) {
      const displayPeeps = peeps.map((currentPeep) => {
        const peep = new PeepModel(
          currentPeep.peepAuthor,
          currentPeep.peepDateCreated,
          currentPeep.peepMessage,
          currentPeep._id
        );
        return <Peep peep={peep} key={peep._id} />;
      });
      return displayPeeps.reverse();
    } else {
      return (
        <div>
          <p id={dataStatus.name}>{dataStatus.message}</p>
        </div>
      );
    }
  };

  return <div className="peeps">{populatePeeps()}</div>;
};

AllPeeps.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.exact({
      peeps: PropTypes.arrayOf(
        PropTypes.shape({
          peepAuthor: PropTypes.string,
          peepDateCreated: PropTypes.string,
          peepMessage: PropTypes.string,
        })
      ),
      error: PropTypes.string,
    }),
  ]),
};

export default AllPeeps;
