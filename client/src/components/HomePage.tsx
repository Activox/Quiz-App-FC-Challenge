import React, { useState } from "react";
import CreateQuiz from "./QuizForm/CreateQuiz";
// import PropTypes from "prop-types";

import { Button } from "react-bootstrap";
import TakeQuiz from "./TakeQuizForm/TakeQuiz";

function HomePage(props) {
  const [presentCreateQuizForm, setCreateQuizForm] = useState(false);
  const [presentTakeQuiz, setPresentTakeQuiz] = useState(false);

  function handleOnClickCreateQuiz() {
    setCreateQuizForm(true);
  }

  function handleOnClickPresentQuiz() {
    setPresentTakeQuiz(true);
    setCreateQuizForm(false);
  }

  const presentPage = presentCreateQuizForm ? (
    <CreateQuiz presentForm={setCreateQuizForm} />
  ) : (
    <TakeQuiz presentForm={setCreateQuizForm} />
  );

  return presentCreateQuizForm || presentTakeQuiz ? (
    presentPage
  ) : (
    <div className="row pt-2 ">
      <div className="col-md-2">
        <Button className="form-control" onClick={handleOnClickCreateQuiz}>
          Create Quiz
        </Button>
      </div>
      <div className=" col-md-2">
        <Button
          className="form-control"
          variant="secondary"
          onClick={handleOnClickPresentQuiz}
        >
          Take a Quiz
        </Button>
      </div>
    </div>
  );
}

// HomePage.propTypes = {};

export default HomePage;
