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
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};
