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
        console.log('inside write: ', req.body, Object.keys(req.body)[0]);
        if (Object.keys(req.body).length == 0) {
           res.render('write.ejs'); 
        }
        else {
            var blogno = Object.keys(req.body)[0];
            var title = posts[Object.keys(req.body)[0]][0];
            var matter = posts[Object.keys(req.body)[0]][1];
            console.log('in edit', title, matter);
            res.render('edit.ejs', {title : title, matter : matter, blogno : blogno});
        }
        
        // console.log('to write');
    },
)

app.post(
    '/save',
    // saves new blog 
    (req, res) => {
        res.render('submitted.ejs');
        console.log(req.body);
        count++;
        // posts[req.body.title] = req.body.matter;
        posts[count] = [req.body.title, req.body.matter]
        console.log(posts)
    },
)

app.post(
    '/saveedit',
    (req, res) => {
        // console.log('in saveedit', req.body);
        var blogno = Object.keys(req.body)[0];
        var title = req.body['title'];
        var matter = req.body['matter'];
        console.log('in saveedit', blogno, title, matter);
        posts[blogno] = [title, matter];
        res.render('home.ejs', {posts : posts});
    },
)

app.get(
    '/blog',  
    // view blog
    (req, res) => {
        res.render('blog.ejs', {postno : req.query.number, posts : posts});
        console.log(req.query.number);

    }
)

app.post(
    '/delete',
    (req, res) => {
        console.log("in delete", req.body);
        delete posts[Object.keys(req.body)[0]];
        console.log(posts);
        var temp = {};
        for (let i=1; i<=Object.values(posts).length; i++) {
            // console.log(Object.values(a)[i-1])
            temp[String(i)] = Object.values(posts)[i-1]
        }
        posts = temp;
        console.log(posts)
        res.render('home.ejs', {posts : posts});
    }
)


app.listen(
    port,
    console.log('It is working!')
)