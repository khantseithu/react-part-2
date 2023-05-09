interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  id: number;
}

type TaskAction = AddTask | DeleteTask;

const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.task];
    case "DELETE":
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};

export default tasksReducer;
