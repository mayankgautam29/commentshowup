const express = require("express");
const app = express();
const path = require("path");
app.set('views',path.join(__dirname,'views')); //tell express app where to find ejs file
app.use(express.urlencoded({extended: true})) //parse data in object or array
app.set('view engine','ejs'); //setting ejs as view template to render files
const {v4: uuid} = require('uuid');
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

let comments = [
    {
        mid: uuid(),
        username: 'Mayank',
        comment: 'so funny'
    },
    {
        mid: uuid(),
        username: 'Shubham',
        comment: 'unfunny joke'
    },
    {
        mid: uuid(),
        username: 'user a',
        comment: 'what is this'
    },
    {
        mid: uuid(),
        username: 'user b',
        comment: 'I dont know'
    }
]

app.delete('/comments/:id',(req,res) => {
    const {id} = req.params;
    const foundComment = comments.filter(c => c.mid !== id);
    comments = foundComment;
    res.redirect('/comments');
})
app.patch('/comments/:id',(req,res) => {
    const {id} = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.mid===id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})
app.get('/comments/:id/edit',(req,res) => {
    const {id} = req.params;
    const foundComment = comments.find(c => c.mid === id);
    res.render('comments/edit',{foundComment});
})
app.get('/comments/:id',(req,res) => {
    const {id} = req.params;
    const foundComment = comments.find(c => c.mid===id);
    console.log(foundComment);
    res.render('comments/show',{foundComment});
})
app.get('/comments/new',(req,res) => {
    res.render('comments/new');
})
app.post('/comments',(req,res) => {
    const {username,comment} = req.body;
    const newComment = {mid:uuid(),username,comment};
    comments.push(newComment);
    res.redirect('/comments');
})
app.get('/comments',(req,res) => {
    res.render('comments/index',{comments});
})

app.listen(5000, () => {
    console.log("Listening");
})
