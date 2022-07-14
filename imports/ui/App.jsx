import React from "react";
import Task from "./components/Task/Task.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";

import { useTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/Tasks/tasks.js";

const toggleChecked = ({ _id, isChecked }) =>
  Tasks.update(_id, { $set: { isChecked: !isChecked } });

const deleteTask = ({ _id }) => Tasks.remove(_id);

export const App = () => {
  const options = { sort: { createdAt: -1 } };
  const tasks = useTracker(() => Tasks.find({}, options).fetch());

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
