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
function Post(id, title, subheading, content) {
    this.id = id;
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

// Update post on edit screen
function updatePost(req, res, next) {
    post[i].title = req.body.title
    post[i].subheading = req.body.subheading
    post[i].content = req.body.content
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
    const newPost = new Post(req.body.id, req.body.title, req.body.subheading, req.body.content);
    posts.push(newPost);
    res.render("index.ejs",
        {
            postTitle: newPost.title,
            posts: posts
        }
    )
  })

  app.get("/edit", (req,res) => {
    console.log(posts);
    res.render("edit.ejs", 
        {
            posts: posts
        }
    )
  })

  app.post("/edit", (req,res) => {
    //const postToEdit = posts.find(posts.id === req.body.id)
    let postToEdit = {};

    for (let i=0; i < posts.length; i++) {
        if(posts[i].id === req.body.id){
            postToEdit = posts[i]; 
            postToEdit.title = req.body.title
            postToEdit.subheading = req.body.subheading
            postToEdit.content = req.body.content
        } else {
            console.log("BLOG NOT UPDATED");
        }      
    }
    res.render("index.ejs",
        {
            posts: posts
        }
    )
  })

  app.post("/delete", (req,res) => {
    const targetId = req.body.id;
    const index = posts.findIndex(element => element.id === targetId);


    posts.splice(index,1); 

    res.render("index.ejs", {
        posts: posts
    })

  })

