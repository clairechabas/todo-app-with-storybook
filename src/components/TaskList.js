import React from "react";
import PropTypes from "prop-types";

import Task from "./Task";
import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";

export const PureTaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask
  };

  // Loading state
  const loadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox"></span>
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
      </div>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check"></span>
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  // Display tasks : default and pinned states
  const tasksInOrder = [
    ...tasks.filter(task => task.state === "TASK_PINNED"),
    ...tasks.filter(task => task.state !== "TASK_PINNED")
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired
};

PureTaskList.defaultProps = {
  loading: false
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks.filter(
      task => task.state === "TASK_INBOX" || task.state === "TASK_PINNED"
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArchiveTask: id => dispatch(archiveTask(id)),
    onPinTask: id => dispatch(pinTask(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PureTaskList);
