import React from "react";
import PropTypes from "prop-types";
import "./Task.css";

const Task = ({ task }) => {
  return <li className="Task">{task.text}</li>;
};

Task.propTypes = {};

Task.defaultProps = {};

export default Task;
