const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

let taskCount = 0
let tasks = [{id: ++taskCount, title: "Walk dog", description: "hi", done: true}, {id: ++taskCount, title: "Eat", description: "hey", done: false}]

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date())
  next()
})

//*********** ROUTES ****************/

app.get('/', (req, res) => {
  res.render("home.ejs", {title: "To Do List", tasks: tasks})
})

app.get('/tasks', (req, res) => {
  res.redirect('/')
})

app.get('/tasks/new', (req, res) => {
  res.render("addform.ejs", {title: "Add Task"})
})

app.post('/tasks', (req, res) => {
  let {title, description} = req.body;
  const newTask = {id: ++taskCount, title, description, done: false};
  tasks.push(newTask)
  res.redirect("/")
})

app.get('/tasks/:id', (req, res) => {
  let foundTask = tasks.find(task => task.id === parseInt(req.params.id))
  if(foundTask){
    res.render("task.ejs", {title: `${foundTask.title}`, task: foundTask})
  } else {
    res.render("notfound.ejs", {title: "Not Found"})
  }
})

app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})