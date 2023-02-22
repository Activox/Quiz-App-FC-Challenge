import React from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import QuestionForm from "./QuestionForm";

function QuestionList({ questions, onQuestionAdd, questionLimit }) {
  return (
    <div>
      <QuestionForm
        onQuestionAdd={onQuestionAdd}
        questionLimit={questionLimit}
      />
      {questions.map((question, index) => (
        <Question key={index} index={index + 1} question={question} />
      ))}
    </div>
  );
}

QuestionList.propTypes = {};

export default QuestionList;
