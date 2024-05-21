import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import multer from 'multer'
import path from "path"
import jwt from 'jsonwebtoken'


//порт на котором будет работать сервер
const PORT = 3000

//сама переменная сервера
const app = express()

//чтобы сервер понимал json
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage })


app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

//ветка регистрации
app.post('/reg', register)
//ветка логина
app.post('/auth', auth)

app.get("/requests/", roleMiddleware(['USER']), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`select * from books where fk_user = ${id}`
    res.send(data)
})

app.get("/user_info/", roleMiddleware(['USER']), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`select * from users where id = ${id}`
    res.send(data)
})

app.get("/admin_info/", roleMiddleware(['ADMIN']), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`select * from users where id = ${id}`
    res.send(data)
})

app.get("/undone_books/", async (req, res) => {
    const data = await sql`select * from books where status = 'На проверке'`
    res.send(data)
})

app.get("/Done_books/", async (req, res) => {
    const data = await sql`select * from books where not status = 'На проверке'`
    res.send(data)
})

app.post("/add/", roleMiddleware(['USER']),upload.single('image'), async (req, res) => {
    const image = req.file.filename
    const { book_name, book_description, book_author, status} = req.body
    console.log(image)
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`INSERT INTO books(book_name, book_description, book_author, image, fk_user, status) values(${book_name}, ${book_description}, ${book_author}, ${`http://localhost:3000/${image}`}, ${id}, 'На проверке')`
    res.sendStatus(200)
})

app.post("/edit_user_info/", roleMiddleware(['USER']), async (req, res) => {
    const { name, email} = req.body
    console.log(name, email);
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`UPDATE users SET name = ${name},
        email = ${email}
    WHERE id = ${id}`
    res.sendStatus(200)
})

app.post("/edit_admin_info/", roleMiddleware(['ADMIN']), async (req, res) => {
    const { email} = req.body
    console.log(email);
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`UPDATE users SET email = ${email} WHERE id = ${id}`
    res.sendStatus(200)
})

app.post("/edit_status/", roleMiddleware(['ADMIN']), async (req, res) => {
    const { id, status } = req.body
    console.log(id);
    await sql`UPDATE books SET status = ${status} where book_id = ${id}`
    res.sendStatus(200)
})

//функция старта приложения
const start = async () => {

    //создаем таблицы
    await sql`create table if not exists Roles(
        role varchar(100) unique primary key
    )`

    await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        role varchar(100),
        password varchar(100),
        email varchar(100),
        FOREIGN KEY (role) REFERENCES Roles(role)
    )`

    await sql`CREATE TABLE IF NOT EXISTS books (
        book_id SERIAL PRIMARY KEY,
        date_of_creation DATE DEFAULT NOW(),
        book_name varchar(100),
        book_description VARCHAR(500),
        book_author VARCHAR(100),
        image varchar(100),
        status varchar(50),
        fk_user INTEGER REFERENCES users(id)
        )`

    //запустить в первый раз и больше не запускать
    //чтобы добавить роли в таблицу ролей

    // await sql`insert into Roles(role) values('USER')`
    // await sql`insert into Roles(role) values('ADMIN')`

    //запустить сервак
    //(прослушивать порт на запросы)
    //вторым аргументом функция которая запустится при успешном запуске сервака



    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })
}

start()
