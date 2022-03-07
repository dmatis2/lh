import axios from "axios";

export const getTodos = async () => {
  return (await axios.get("http://localhost:8080")).data.todos;
};

export const addTodo = async (todo) => {
    const todos = await axios.post('http://localhost:8080', { todo });
    return todos.data.todos;
}