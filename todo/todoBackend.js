const express = require("express");
const app = express();
app.use(express.json());

const todo = new Map();
let id = 0;

function generateID(){
    return (++id).toString();
}

function addTodo(req, res){
    //get the title
    const {title} = req.body;
    if(!title){
        return res.status(400).json({message : "You need to enter your todo"});
    }
    const todo = {
        id : generateID(),
        title,
        completed: false
    };
    //map -> id : todo
    // set is used to map the corresponding id to the todo
    //todos.set(todo.id, todo)
    todos.set(todo.id, todo);
    res.json({message : "Your todo has been added"});
}

function getAllTodos(req, res){
    //return all the todos
    res.json(Array.from(todos.values()));
}

function deleteAllTodos(req, res){
    //clear the map 
    const {id} = req.params;

    if(!todos.has(id)){
        return res.status(404).json({message : "This todo has not been mentioned"});

    }
    todos.delete(id);
    res.json({message : "Todo has been deleted successfully"});
}

function completeToDo(req, res){
    const {id} = req.params;
    if(!todos.has(id)){
        return res.statys(404).json({message : "to do not found"});
    }

    const todo = todos.get(id);
    todos.completed = true;
    todos.set(id, todo);
    res.json({message : "Updation has been done"});
}
app.post('/todo', addTodo);
app.get('/todos', getAllTodos);
app.delete('/todos/:id', deleteAllTodos);
app.put("/todos/:id", completeToDo);

app.listen(3001, () =>{
    console.log("Server is running")
})