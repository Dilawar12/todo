import React, { useState, useMemo, useCallback, memo } from "react";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  addTodo,
  deleteAllTodos,
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "./Store/TodoSlice";

const Task = memo(({ data, handleUpdateTodo, handleDeleteTodo, handleToggleComplete }) => {
  console.log(`Rendering Task with id: ${data.id}`);
  return (
    <div className="task">
      <div>{data.text}</div>
      <div>
        {data?.completed === true ? (
          "done"
        ) : (
          <>
            <FaRegEdit size={22} onClick={() => handleUpdateTodo(data)} />
            <MdDelete size={22} onClick={() => handleDeleteTodo(data.id)} />
            <FaCheck size={22} onClick={() => handleToggleComplete(data.id)} />
          </>
        )}
      </div>
    </div>
  );
});

const TodoForm = ({ newTodo, setNewTodo, handleAddTodo, checkupdate, handleCicktoupdate }) => (
  <div className="form">
    <input
      type="text"
      className="input"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button
      onClick={checkupdate ? handleCicktoupdate : handleAddTodo}
      type="submit"
      className="add"
      value="Add Task"
    >
      {checkupdate ? "Update" : "Add"}
    </button>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [checkupdate, setcheckupdate] = useState(false);
  const [idtoupdate, setidtoupdate] = useState("");

  const memoizedTodos = useMemo(() => todos, [todos]);

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  }, [newTodo, dispatch]);

  const handleUpdateTodo = useCallback((data) => {
    setcheckupdate(true);
    const { id, text } = data;
    setidtoupdate(id);
    setNewTodo(text);
  }, []);

  const handleCicktoupdate = useCallback(() => {
    dispatch(updateTodo({ idtoupdate, text: newTodo }));
    setNewTodo("");
    setcheckupdate(false);
    setidtoupdate("");
  }, [dispatch, idtoupdate, newTodo]);

  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  const handleToggleComplete = useCallback((id) => {
    dispatch(toggleComplete({ id }));
  }, [dispatch]);

  const handleDeleteAllTodos = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="container">
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleAddTodo={handleAddTodo}
        checkupdate={checkupdate}
        handleCicktoupdate={handleCicktoupdate}
      />
      <div className="tasks">
        {memoizedTodos?.map((data, index) => (
          <Task
            key={data.id}
            data={data}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
      <div className="delete-all" onClick={handleDeleteAllTodos}>
        Delete all
      </div>
    </div>
  );
};

export default App;
