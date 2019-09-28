import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs/react";

import Task from "./Task";

export const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2019, 0, 1, 9, 0)
};

export const actions = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

// For the long title case
const longTitle = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not`;

// 1. To initiate Storybook we first call the storiesOf() function to register the component
// 2. To define our stories, we call add() once for each of our test states to generate a story
storiesOf("Task", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Task task={object("task", { ...task })} {...actions} />
  ))
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ))
  .add("long title", () => (
    <Task task={{ ...task, title: longTitle }} {...actions} />
  ));
