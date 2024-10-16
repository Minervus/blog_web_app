import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); 



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Array to store posts as objects
let posts = []; 

// Post creator function
function Post(title, subheading, content) {
    this.title = title;
    this.subheading = subheading;
    this.content = content;
}

// Add post function to be triggered on submit
function addPost(req, res, next) {
    const newPost = new Post(req.body.title, req.body.subheading, req.body.content);
    posts.push(newPost);
    console.log(`Posts array ${posts}`); 
    next();
    res.render("index.ejs");
}

app.get("/", (req,res) => {
    res.render("index.ejs", 
        { 
         posts: posts
        }
    )
    console.log(`Current posts ${posts}`); 
})

app.get("/post", (req,res) => {
    res.render("post.ejs");
    
})

app.post("/submit", (req, res) => {
    const newPost = new Post(req.body.title, req.body.subheading, req.body.content);
    posts.push(newPost);
    res.render("index.ejs",
        {
            postTitle: newPost.title,
            posts: posts
        }
    )
  })

  app.get("/edit", (req,res) => {
    const title = req.body.title; 
    const subheading = req.body.subheading;
    const content = req.body.subheading;
    console.log(`title: ${title}, subheading: ${subheading}, content: ${content}`)
    res.render("edit.ejs", 
        {
            title: title,
            subheading: subheading,
            content: content
        }
    )
  })



