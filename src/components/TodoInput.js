import { useContext, useState } from "react";
import { TodoContext } from "./Todo";
import "./TodoInput.css";
import { addTodo } from "../utils/req";

const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setTodoList } = useContext(TodoContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      window.alert("You need to provide a value");
      return;
    }
    setInputValue("");
    const todos = await addTodo(inputValue);
    setTodoList(todos);
  };

  return (
    <>
      <form id="todo_form" onSubmit={handleSubmit}>
        <input
          id="todo_input"
          type="text"
          placeholder="Write your todo here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button id="todo_btn">
          <i className="fa-solid fa-2x fa-plus"></i>
        </button>
      </form>
    </>
  );
};

export default TodoInput;
