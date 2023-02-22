import React, { useState } from "react";
import AnswerForm from "./AnswerForm";

import { Button } from "react-bootstrap";

function QuestionForm({ onQuestionAdd, questionLimit }) {
  const [question, setQuestion] = useState({
    title: "",
    answer: "",
  });

  const handleQuestionSubmit = (event) => {
    event.preventDefault();

    if (questionLimit) {
      const userClickedOK = confirm(
        "The limit is 5 question per quiz, you reach out this limit."
      );
      if (userClickedOK) {
        return;
      }
    }

    onQuestionAdd(question);
    setQuestion({
      title: "",
      answer: "",
    });
  };

  const handleQuestionChange = (event) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  const handleAnswerAdd = (answer) => {
    setQuestion({
      ...question,
      answer: answer,
    });
  };

  return (
    <form>
      <div>
        <label className="form-control">
          Question Title:
          <input
            className="form-control"
            type="text"
            name="title"
            value={question.title}
            onChange={handleQuestionChange}
          />
        </label>
        <AnswerForm
          onAnswerAdd={handleAnswerAdd}
          defaultValue={question.answer}
        />
        <br />
        <Button className="form-control " onClick={handleQuestionSubmit}>
          Add Question
        </Button>
      </div>
    </form>
  );
}

export default QuestionForm;
