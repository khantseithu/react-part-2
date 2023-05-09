import { useReducer } from "react";
import tasksReducer from "./reducers/tasksReducer";
import TaskContext from "./contexts/taskContext";

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;
