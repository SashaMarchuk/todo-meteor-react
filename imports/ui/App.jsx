import React from "react";
import Task from "./components/Task/Task.jsx";

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

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
