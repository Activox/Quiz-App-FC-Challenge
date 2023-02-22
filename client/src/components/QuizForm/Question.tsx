import React from "react";
import PropTypes from "prop-types";

function Question({ index, question }) {
  return (
    <div className="row">
      <div className="col-md-3">
        <h2>
          {" "}
          {`#${index}`} QUESTION: {question.title}
        </h2>
      </div>
      <div className="col-md-3">
        <h2> ANSWER: {question.answer}</h2>
      </div>
    </div>
  );
}

Question.propTypes = {};

export default Question;
