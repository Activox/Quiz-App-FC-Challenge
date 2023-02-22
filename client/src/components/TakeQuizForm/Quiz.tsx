import React, { useState, useEffect } from "react";
import axios from "axios";
import CountdownTimer from "./CountdownTimer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Quiz({ questions, presentQuiz, userName }) {
  const serverUrl = "http://127.0.0.1:8000";
  const [actualPosition, setActualPosition] = useState(0);
  const totalQuestions = questions.length;

  const [userAnswer, serUserAnswer] = useState("");

  const questionTimeLimit = 180000; // 3 mins

  useEffect(() => {
    const intervalId = setInterval(() => {
      validateQuestionsLimit();
      const userClickedOK = confirm(
        "Question time is over, passing to the next question"
      );
      if (userClickedOK) {
        setActualPosition(actualPosition + 1);
        serUserAnswer("");
      }
    }, questionTimeLimit);

    return () => clearInterval(intervalId);
  }, []);

  const handleOnClickNextBtn = async () => {
    const response = await axios.post(`${serverUrl}/quiz/create/submission/`, {
      question: questions[actualPosition].id,
      answer_text: userAnswer,
      user_name: userName,
      status: userAnswer == questions[actualPosition].answer,
    });
    if (response?.data) {
      validateQuestionsLimit();
      setActualPosition(actualPosition + 1);
      return;
    }
    alert("Something went wrong!");
  };

  const handleOnChangeUserAnswert = (event) => {
    serUserAnswer(event.target.value);
  };

  const validateQuestionsLimit = async () => {
    await presentQuizList();
  };

  const presentQuizList = async () => {
    if (actualPosition == totalQuestions - 1) {
      const userClickedOK = confirm("You finish the quiz!, back to Quiz List");
      if (userClickedOK) {
        presentQuiz(false);
        return;
      }
    }
  };

  const handleQuizTimeLeft = () => {
    const userClickedOK = confirm("Your time is over, back to Quiz list");
    if (userClickedOK) {
      presentQuiz(false);
      return;
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{`${questions[actualPosition].title}`}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="write an answer"
            onChange={handleOnChangeUserAnswert}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleOnClickNextBtn}>
          Next
        </Button>
      </Form>
      <div>
        <label>{`Question ${actualPosition + 1} of ${totalQuestions}`}</label>
      </div>
      <br />
      <CountdownTimer quizTimeLeft={handleQuizTimeLeft} />
    </div>
  );
}

export default Quiz;
