import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import QuestionList from "./QuestionList";

import { Button } from "react-bootstrap";

function CreateQuiz({ presentForm }) {
  const serverUrl = "http://127.0.0.1:8000/quiz";

  const [quiz, setQuiz] = useState({
    title: "",
    questions: [],
  });
  const [countQuestions, setCountQuestions] = useState(0);

  const handleQuizSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/create/`, {
        title: quiz.title,
      });
      quiz.questions.forEach((question) => {
        setQuestions(response.data.id, question);
      });
      presentForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setQuestions = async (quizId, question) => {
    await axios.post(`${serverUrl}/create/question/`, {
      quiz: quizId,
      title: question.title,
      answer_text: question.answer,
    });
  };

  const handleQuizChange = (event) => {
    setQuiz({
      ...quiz,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionAdd = (question) => {
    setCountQuestions(countQuestions + 1);
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
    });
  };

  return (
    <form>
      <label className="form-control">
        Quiz Title:
        <input
          className="form-control"
          type="text"
          name="title"
          value={quiz.title}
          onChange={handleQuizChange}
        />
      </label>
      <QuestionList
        questions={quiz.questions}
        onQuestionAdd={handleQuestionAdd}
        questionLimit={countQuestions >= 5}
      />
      <br />
      <Button
        className="form-control"
        variant="success"
        onClick={handleQuizSubmit}
      >
        Submit Quiz
      </Button>
    </form>
  );
}

CreateQuiz.propTypes = {};

export default CreateQuiz;
