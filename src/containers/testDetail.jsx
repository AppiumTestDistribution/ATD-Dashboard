import React from "react";

const TestDetail = ({ match }) => {
  return <h1>{match.params.id}</h1>;
};

export default TestDetail;
