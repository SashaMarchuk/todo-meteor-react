import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TaskForm.css";
import { Tasks } from "../../../api/Tasks/tasks";

const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Tasks.insert({
      text: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

TaskForm.propTypes = {};

TaskForm.defaultProps = {};

export default TaskForm;
