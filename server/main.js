import { Meteor } from "meteor/meteor";
import { Tasks } from "../imports/db/Tasks/tasks";
import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";

import "../imports/db/Tasks/server/methods";
import "../imports/db/Tasks/server/publications";

const insertTask = (taskText, user) =>
  Tasks.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (Tasks.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "6c09d20a4d5f8288afb3", // insert your clientId here
      secret: "67a9e34208470a04547b1932f153780b2d085a65", // insert your secret here
    },
  }
);
