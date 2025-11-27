import express from "express"
import bodyParser from "body-parser"


const app = express();
const port = 3001;
var count = 0
var posts = {}

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get(
    '/',
    (req, res) => {
        res.render('home.ejs', { posts: posts })
    }
)


app.get(
    '/write',
    (req, res) => {
        res.render('write.ejs');
        console.log('to write');
    },
)



app.post(
    '/write',
    (req, res) => {
        res.render('write.ejs');
        console.log('to write');
    },
)

app.post(
    '/save',
    (req, res) => {
        res.render('submitted.ejs');
        console.log(req.body);
        count++;
        // posts[req.body.title] = req.body.matter;
        posts[count] = [req.body.title, req.body.matter]
        console.log(posts)
    },
)

app.get(
    '/blog/:id',
    (req, res) => {
        res.render('blog.ejs');
        console.log(req.params);

    }
)


app.listen(
    port,
    console.log('It is working!')
)