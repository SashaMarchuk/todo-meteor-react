import { Meteor } from "meteor/meteor";

import React, { Fragment, useState } from "react";
import Task from "./components/Task/Task.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";

import { useTracker } from "meteor/react-meteor-data";
import { Tasks } from "../db/Tasks/tasks.js";
import { LoginForm } from "./components/LoginForm/LoginForm.jsx";

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call("tasks.setIsChecked", _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const options = { sort: { createdAt: -1 } };
  const queryUserFilter = { ...(user?._id && { userId: user._id }) };
  const query = {
    ...(hideCompleted && { isChecked: { $ne: true } }),
    ...queryUserFilter,
  };

  const { tasks, pendingTasksCount, tasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = Tasks.find(query, options).fetch();
    const pendingTasksCount = Tasks.find(query).count();
    const tasksCount = Tasks.find(queryUserFilter).count();

    return { tasks, pendingTasksCount, tasksCount };
  });

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
            {!!pendingTasksCount && pendingTasksCount}
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username || user.profile.name} 🚪
            </div>

            <TaskForm />

            {!!tasksCount && (
              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? "Show All" : "Hide Completed"}
                </button>
              </div>
            )}

            {isLoading && <div className="loading">loading...</div>}

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
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
