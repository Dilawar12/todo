import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit,FaCheck 
 } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import {
  addTodo,
  deleteAllTodos,
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "./Store/TodoSlice";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [checkupdate, setcheckupdate] = useState(false);
  const [idtoupdate, setidtoupdate] = useState("");
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (data) => {
    setcheckupdate(true);
    console.log(data, "edit");
    const { id, text } = data;
    setidtoupdate(id);
    setNewTodo(text);
  };
  const handleCicktoupdate = () => {
    dispatch(updateTodo({ idtoupdate, text: newTodo }));
    setNewTodo("");
    setcheckupdate(false);
    setidtoupdate("");
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete({ id }));
  };
  const handleDeleteAllTodos = () => {
    dispatch(deleteAllTodos());
  };
  return (
    <div class="container">
      <div class="form">
        <input
          type="text"
          class="input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={checkupdate ? handleCicktoupdate : handleAddTodo}
          type="submit"
          class="add"
          value="Add Task"
        >
          {checkupdate ? "Update" : "Add"}
        </button>
      </div>
      <div class="tasks">
        {todos?.map((data, index) => {
          return (
            <div className="task">
              <div>{data.text}</div>
              <div>
                {data?.completed === true ? (
                  "done"
                ) : (
                 <>
                  <FaRegEdit size={22} onClick={() => handleUpdateTodo(data)} />
                  <MdDelete size={22} onClick={()=>handleDeleteTodo(data.id)}  />
                  <FaCheck size={22} onClick={()=>handleToggleComplete(data.id)} />
                 </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div class="delete-all" onClick={handleDeleteAllTodos}>Delete all</div>
    </div>
  );
};

export default App;
