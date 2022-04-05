import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./styles.css";
import { MdOutlineDone } from "react-icons/md";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  
  }, [edit])
  

  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        handleEdit(e, todo.id);
      }}
    >
      {edit ? (
        <input
          className="todos__single--text"
          value={editTodo}
          ref={inputRef}
          onChange={(e) => {
            setEditTodo(e.target.value);
          }}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
