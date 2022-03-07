import { useContext } from "react";
import { TodoContext } from "./Todo";

const TodoList = () => {
    const { todoList } = useContext(TodoContext);

    return (
        <>
            <h1>Todo List</h1>
            <ul>
                {todoList.map((todoItem) => <li key={todoItem.id}>{todoItem.todoText}</li>)}
            </ul>
        </>
    )
}

export default TodoList;