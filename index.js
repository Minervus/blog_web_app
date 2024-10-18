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

// Get to present the homepage and show blogs if any exist
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

// Post to create a new blog
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

  // Get the edit page
  app.get("/edit", (req,res) => {
    console.log(posts);
    res.render("edit.ejs", 
        {
            posts: posts
        }
    )
  })

  // Post to update blog based on ID 
  app.post("/edit", (req,res) => {
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

  //Delete function that deletes object based on ID
  app.post("/delete", (req,res) => {
    const targetId = req.body.id;
    const index = posts.findIndex(element => element.id === targetId);

    posts.splice(index,1); 

    res.render("index.ejs", {
        posts: posts
    })

  })

