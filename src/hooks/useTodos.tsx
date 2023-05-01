import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import APIClient from "../react-query/services/apiClient";
import todoService, { Todo } from "../react-query/services/todoService";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll, //.bind(apiClient),
    //20 seconds
    staleTime: 20000,
  });
};

export default useTodos;
