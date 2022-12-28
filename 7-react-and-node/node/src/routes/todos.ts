import { Router } from 'express'
// CONTROLLERS
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todos'

const router = Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router