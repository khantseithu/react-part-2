import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import axios from "axios";
import { Todo } from "../hooks/useTodos";

interface AddTodoContext {
  previousTodos: Todo[] | undefined;
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (newTodos) => [
        newTodo,
        ...(newTodos || []),
      ]);

      if (ref.current) ref.current.value = "";
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodos) => {
      queryClient.setQueryData<Todo[]>(["todos"], (newTodos) =>
        newTodos?.map((todo) => {
          return todo.id === savedTodo.id ? savedTodo : todo;
        })
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Saving..." : "Add Todo"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
