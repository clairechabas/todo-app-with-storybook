// Simple redux store/actions/reducer implementation
// for the purpose of learning Storybook
import { createStore } from "redux";

// action types
export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK"
};

// action creators
export const archiveTask = id => {
  return { type: actions.ARCHIVE_TASK, id };
};
export const pinTask = id => {
  return { type: actions.PIN_TASK, id };
};

// reducer
function taskReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task => {
        return task.id === action.id ? { ...task, state: taskState } : task;
      })
    };
  };
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskReducer("ARCHIVE_TASK")(state, action);
    case actions.PIN_TASK:
      return taskReducer("PIN_TASK")(state, action);
    default:
      return state;
  }
};

// mock tasks for the store initial state
const defaultTasks = [
  { id: "1", title: "Some fox", state: "TASK_INBOX" },
  { id: "2", title: "Some girafe", state: "TASK_INBOX" },
  { id: "3", title: "Some bunny", state: "TASK_INBOX" },
  { id: "4", title: "Some kitten", state: "TASK_INBOX" }
];

// exporting mock store
export default createStore(reducer, { tasks: defaultTasks });
