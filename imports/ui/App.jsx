import React from "react";
import Task from "./components/Task/Task.jsx";

export const App = () => {
  const tasks = [
    { _id: 1, text: "First Task" },
    { _id: 2, text: "Second Task" },
    { _id: 3, text: "Third Task" },
  ];
  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        {tasks.map((task) => (
          <Task task={task} key={task._id} />
        ))}
      </ul>
    </div>
  );
};
