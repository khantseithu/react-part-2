import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService, { Todo } from "../react-query/services/todoService";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import APIClient from "../react-query/services/apiClient";

interface AddTodoContext {
  previousTodos: Todo[] | undefined;
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
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
