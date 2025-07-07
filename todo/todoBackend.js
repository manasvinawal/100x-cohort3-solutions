const express = require("express");
const app = express();
app.use(express.json());

const todos = new Map();
let id = 0;

function generateID() {
    return (++id).toString();
}

function addTodo(req, res) {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "You need to enter your todo" });
    }
    const todo = {
        id: generateID(),
        title,
        completed: false,
    };
    todos.set(todo.id, todo);
    res.status(201).json({ message: "Your todo has been added", todo });
}

function getAllTodos(req, res) {
    res.json(Array.from(todos.values()));
}

function deleteTodoById(req, res) {
    const { id } = req.params;

    if (!todos.has(id)) {
        return res.status(404).json({ message: "This todo does not exist" });
    }
    todos.delete(id);
    res.json({ message: "Todo has been deleted successfully" });
}

function completeToDo(req, res) {
    const { id } = req.params;
    if (!todos.has(id)) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const todo = todos.get(id);
    todo.completed = true;
    todos.set(id, todo);
    res.json({ message: "Todo updated", todo });
}

app.post('/todos', addTodo);
app.get('/todos', getAllTodos);
app.delete('/todos/:id', deleteTodoById);
app.put('/todos/:id', completeToDo);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});