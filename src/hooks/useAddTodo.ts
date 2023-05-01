import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";

interface AddTodoContext {
  previousTodos: Todo[] | undefined;
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS);
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (newTodos = []) => [
        newTodo,
        ...newTodos,
      ]);

      onAdd();
      //   if (ref.current) ref.current.value = "";
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodos) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (newTodos) =>
        newTodos?.map((todo) => {
          return todo.id === savedTodo.id ? savedTodo : todo;
        })
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
