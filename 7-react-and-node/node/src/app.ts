import express, { Request, Response, NextFunction} from "express"
import { json } from "body-parser"
// ROUTES
import todoRoutes from './routes/todos'

const app = express()
// THIS PARSE THE DATA AS JSON OBJECTS
app.use(json())
app.use('/todos', todoRoutes)
app.use(
  (errors: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({ message: errors.message})
    console.warn(response, request)
    next()
  }
)
app.listen(3000, () => console.log('TS Server ON'))