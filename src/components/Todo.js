import { createContext, useEffect, useState } from "react";
import { getTodos } from "../utils/req";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
export const TodoContext = createContext();

const Todo = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        (async () => setTodoList(await getTodos()))()
    }, [])

    return (
        <TodoContext.Provider value={{todoList, setTodoList}}>
            <h1>Todo app</h1>
            <TodoInput />
            <TodoList />
        </TodoContext.Provider>
    );
}

export default Todo;