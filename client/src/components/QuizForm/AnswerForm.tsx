import React, { useState } from "react";

function AnswerForm({ onAnswerAdd, defaultValue }) {
  const [answer, setAnswer] = useState(defaultValue);

  const handleAnswerChange = (event) => {
    onAnswerAdd(event.target.value);
    setAnswer(event.target.value);
  };

  return (
    <form>
      <label className="form-control">
        Answer:
        <input
          className="form-control"
          type="text"
          value={answer}
          onChange={handleAnswerChange}
        />
      </label>
    </form>
  );
}

export default AnswerForm;
