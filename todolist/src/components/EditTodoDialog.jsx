import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; 
import './EditTodoDialog.css'; // Import the CSS file

const EditTodoDialog = ({ todoId, todo, handleClose }) => {
  const [updatedTask, setUpdatedTask] = useState('');

  useEffect(() => {
    setUpdatedTask(todo.task);
  }, [todo.task]);

  const handleTaskChange = (event) => {
    setUpdatedTask(event.target.value);
  };

  const handleEditTodo = () => {
    const updatedTodo = {
      task: updatedTask, // Add updatedTask to the body
    };

    axios
      .put(`http://localhost:3001/edit/${todoId}`, updatedTodo) // Use todoId and send the updatedTask in the body
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <div className='edit-todo-dialog'>
      <div className='dialog-content'>
        <h3>Edit Todo</h3>
        <input type='text' value={updatedTask} onChange={handleTaskChange} />
        <button onClick={handleEditTodo}>Save</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

EditTodoDialog.propTypes = {
  todoId: PropTypes.any.isRequired,
  todo: PropTypes.any.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditTodoDialog;
