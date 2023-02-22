import React, { useState, useEffect } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import Quiz from "./Quiz";

function TakeQuiz({ presentForm }) {
  const serverUrl = "http://127.0.0.1:8000";
  const [userName, setUserName] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [presentQuiz, setPresentQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${serverUrl}/quiz/`);
      setQuizData(response.data);
    };
    fetchData();
  }, []);

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleOnClickQuiz = async (e, quizTitle) => {
    if (userName == "") {
      alert("Please Enter User Name");
      return;
    }

    const response = await axios.get(
      `${serverUrl}/quiz/randomQuestion/${quizTitle}/`
    );
    setQuizQuestions(response.data);

    setPresentQuiz(true);
  };

  const handlePresentQuizList = (value) => {
    setPresentQuiz(value);
  };

  return presentQuiz ? (
    <Quiz
      questions={quizQuestions}
      presentQuiz={handlePresentQuizList}
      userName={userName}
    />
  ) : (
    <>
      <label className="text-center">
        <h4 className="pl-2">Select a Quiz</h4>
      </label>
      <label className="form-control">
        User Name:
        <input
          className="form-control"
          type="text"
          name="title"
          value={userName}
          onChange={handleUserName}
        />
      </label>
      <ListGroup>
        {quizData.map((value, index) => (
          <ListGroup.Item
            key={index}
            role="button"
            onClick={(e) => handleOnClickQuiz(e, value.title)}
          >
            {value.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default TakeQuiz;
