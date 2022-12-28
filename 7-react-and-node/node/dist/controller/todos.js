"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
// MODELS
const todo_models_1 = require("../models/todo.models");
let TODOS = [];
const findTodo = (todoId) => {
    return !!(TODOS.find(({ id }) => id === todoId));
};
// 'REQUESTHANDLER' IS USED TO KNOW THE FUNCTION WILL USE A COMMON NODE REQUEST FUNCTION
// WITH A REQUEST, RESPONSE, NEXT FUNCTION AND ITS ERRORS
const createTodo = (request, response, next) => {
    const text = request.body.text;
    const newTodo = new todo_models_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    response
        .status(201)
        .json({ message: 'New todo created', data: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (request, response, next) => (response.status(200).json({ todos: TODOS }));
exports.getTodos = getTodos;
const updateTodo = (request, response, next) => {
    const todoId = request.params.id;
    const updatedText = request.body.text;
    if (!findTodo(todoId)) {
        throw new Error('Todo not found with that id');
    }
    TODOS = TODOS.map(_todo => _todo.id === todoId ? Object.assign(Object.assign({}, _todo), { text: updatedText }) : _todo);
    response.status(200).json({ message: 'Todo updated', todo: updatedText });
};
exports.updateTodo = updateTodo;
const deleteTodo = (request, response, next) => {
    const todoId = request.params.id;
    if (!findTodo(todoId)) {
        throw new Error('Todo not found with that id');
    }
    TODOS = TODOS.filter(({ id }) => id !== todoId);
    response.status(200).json({ message: 'Todo deleted', todo: todoId });
};
exports.deleteTodo = deleteTodo;
