import { useReducer, useState } from "react";
import tasksReducer from "./reducers/tasksReducer";

const TaskList = () => {
  const [value, dispatch] = useReducer(tasksReducer, []);

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            task: { id: Date.now(), title: "New Task" },
          })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {value.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">{task.title}</span>
            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch({ type: "DELETE", id: task.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
