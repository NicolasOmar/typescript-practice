"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
// ROUTES
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
// THIS PARSE THE DATA AS JSON OBJECTS
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
app.use((errors, request, response, next) => {
    response.status(500).json({ message: errors.message });
    console.warn(response, request);
    next();
});
app.listen(3000, () => console.log('TS Server ON'));
