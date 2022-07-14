import React from "react";
import Task from "./components/Task/Task.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";

import { useTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/Tasks/tasks.js";

export const App = () => {
  const tasks = useTracker(() => Tasks.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {tasks.map((task) => (
          <Task task={task} key={task._id} />
        ))}
      </ul>
    </div>
  );
};
