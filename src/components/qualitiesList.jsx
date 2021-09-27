import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualitie";
const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qua) => (
        <Qualities {...qua} key={qua._id} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};
export default QualitiesList;
