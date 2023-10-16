import { useEffect, useState } from 'react';
import Create from './components/Create';
import axios from 'axios';
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import EditTodoDialog from './components/EditTodoDialog'; // Import the EditTodoDialog component

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (id) => {
    axios
      .put('http://localhost:3001/update/' + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (todo) => {
    setSelectedTodoId(todo._id);
    setSelectedTodo(todo);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedTodoId(null);
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div className='task' key={index}>
            <div className='checkbox' onClick={() => handleUpdate(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className='icon' />
              )}
              <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className='icon'
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
              <span>
                <BiEdit className='icon' onClick={() => handleEdit(todo)} />
              </span>
            </div>
          </div>
        ))
      )}
      {showEditDialog && (
        <EditTodoDialog
          todoId={selectedTodoId}
          todo={selectedTodo}
          handleClose={handleCloseEditDialog}
        />
      )}
    </div>
  );
};

export default Home;
