const TodoModel = require('../Models/Todo');

async function getTodo(req, res) {
  const todos = await TodoModel.find();
  res.json(todos);
}

async function addTodo(req, res) {
  const { task } = req.body;
  const newTodo = await TodoModel.create({ task });
  res.json(newTodo);
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  const result = await TodoModel.findByIdAndDelete(id);
  res.json(result);
}

async function toggleTodoDone(req, res) {
  const { id } = req.params;
  const todo = await TodoModel.findById(id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todo.done = !todo.done;
  const updatedTodo = await todo.save();

  res.json(updatedTodo);
}

async function editTodoById(req, res) {
  const { id } = req.params;
  const { task } = req.body;

  const updatedTodo = await TodoModel.findByIdAndUpdate(
    id,
    { task },
    { new: true }
  );

  if (!updatedTodo) {
    res.status(404).json({ message: 'Todo not found' });
  } else {
    res.json(updatedTodo);
  }
}

module.exports = {
  getTodo,
  addTodo,
  deleteTodo,
  toggleTodoDone,
  editTodoById,
};
