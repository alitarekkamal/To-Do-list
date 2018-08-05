const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var task = [];

app.post('/addtask', function(req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});



var complete = [];
app.post('/removetask', (req, res) => {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

app.listen(7000, () => {
    console.log('app is listen to port 7000');
})