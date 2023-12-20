import "./App.css";
import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo.id, updatedText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button className="update " onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div>
          <span className="text" onClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
          <button className="delete" onClick={() => onDelete(todo.id)}>
            Delete item
          </button>
        </div>
      )}
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [typingValue, setTypingValue] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
      setTypingValue("");
    }
  };

  const deleteTodo = (id) => {
    const indexToDelete = todos.findIndex((todo) => todo.id === id);

    if (indexToDelete !== -1) {
      setTodos((prevtodo) => [
        ...prevtodo.slice(0, indexToDelete),
        ...prevtodo.slice(indexToDelete + 1),
      ]);
    }
  };

  const updateTodo = (id, updatedText) => {
    setTodos((prevtodo) =>
      prevtodo.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setNewTodo(inputValue);
    setTypingValue(inputValue);
  };

  return (
    <div className="main">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Type here"
      />
      <button onClick={addTodo}>Add item</button>
      <br /> <br />
      <div>{typingValue}</div>
      <ol className="values">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
