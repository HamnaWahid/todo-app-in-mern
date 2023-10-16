const express = require('express');
const router = express.Router();

const {
  getTodo,
  addTodo,
  deleteTodo,
  toggleTodoDone,
  editTodoById,
} = require('../controller/todoController'); // Corrected import

router.get('/get', getTodo);

router.post('/add', addTodo);

router.delete('/delete/:id', deleteTodo);

router.put('/update/:id', toggleTodoDone);

router.put('/edit/:id', editTodoById);

module.exports = router;
