import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import morgan from 'morgan';

const PORT = 8080;
const DEBUG = false;

const dbOptions = {
    verbose: console.log
}
const tableName = 'TodoList';
const tableFields = '(id INTEGER PRIMARY KEY AUTOINCREMENT, todoText TEXT NOT NULL)';
const db = new Database('todo-list.db', DEBUG ? dbOptions : {})

// Create table
const createQuery = `CREATE TABLE IF NOT EXISTS ${tableName} ${tableFields}`;
db.prepare(createQuery).run();

const getTodos = () => {
    // Get todos back
    const selectStatement = `SELECT * FROM ${tableName}`;
    const statement = db.prepare(selectStatement);
    return statement.all();
}

const insertTodo = (todoText) => {
    // Insert todo
    const insertQuery = `INSERT INTO ${tableName} (todoText) VALUES (?)`;
    db.prepare(insertQuery).run(todoText);
    return getTodos();
}

// Express Server

const app = express();
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ todos: getTodos() });
});

app.post('/', (req, res) => {
    if(!Object.keys(req.body).includes('todo')) return res.status(400);
    const todos = insertTodo(req.body.todo);
    res.json({ todos });
})

app.listen(PORT, console.log(`Listening on port ${PORT}`));