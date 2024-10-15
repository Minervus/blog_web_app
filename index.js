import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get("/", (req,res) => {
    res.render("index.ejs"); 
})

app.get("/post", (req, res) => {
    res.render("post.ejs");
  })

app.use(addPost);

// Array to store posts as objects
let posts = []; 

// Post creator function
function Post(title, subheading, content) {
    this.title = title;
    this.subheading = subheading;
    this.content = content;
}

// Add post function to be triggered on submit
function addPost(title, subheading, content) {
    const newPost = new Post(title, subheading, content);
    posts.push(newPost);
}