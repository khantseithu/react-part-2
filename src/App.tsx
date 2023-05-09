import { useReducer } from "react";
import "./App.css";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TaskContext from "./state-management/contexts/taskContext";
import loginReducer from "./state-management/reducers/loginReducer";
import UserContext from "./state-management/contexts/userContext";

function App() {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
  const [user, userDispatch] = useReducer(loginReducer, "");
  return (
    <>
      <UserContext.Provider value={{ user, dispatch: userDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
          <NavBar />
          <HomePage />
        </TaskContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
