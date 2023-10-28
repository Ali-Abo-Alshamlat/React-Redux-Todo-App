import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus, GoSearch } from "react-icons/go";
import { motion } from "framer-motion";
import TodoItem from "./TodoItem";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [renderedTodos, setRenderedTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  const search = () => {
    const filteredTodos = props.todos.filter((todo) =>
      todo.item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRenderedTodos(
      filteredTodos.map((todo,item) => (
        <TodoItem
                      key={item}
                      item={todo}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                      copyTodo={props.copyTodo}
                    />
      ))
    );
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodo(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <div>
      <div className="addTodos">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          className="todo-input"
          value={todo}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="add-btn"
          onClick={() => add()}
        >
          <GoPlus />
        </motion.button>
      </div>
      <br />
      <div className="searchTodos">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="todo-input"
          value={searchTerm}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="add-btn"
          onClick={() => search()}
        >
          <GoSearch />
        </motion.button>
      </div>
      <br />
      <ul>{renderedTodos}</ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
