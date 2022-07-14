import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Tasks } from "../tasks";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = Tasks.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    Tasks.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = Tasks.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    Tasks.update(taskId, { $set: { isChecked } });
  },
});
