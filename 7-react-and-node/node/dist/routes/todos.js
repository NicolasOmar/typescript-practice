"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// CONTROLLERS
const todos_1 = require("../controller/todos");
const router = (0, express_1.Router)();
router.get('/', todos_1.getTodos);
router.post('/', todos_1.createTodo);
router.patch('/:id', todos_1.updateTodo);
router.delete('/:id', todos_1.deleteTodo);
exports.default = router;
