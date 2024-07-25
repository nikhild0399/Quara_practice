const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   
        id: uuidv4(),
        username: "Nikhil Dwivedi",
        content: "I LOVE CODING"
    },
    {
        id: uuidv4(),
        username: "Rashi Sharma",
        content: "I LOVE DANCING"
    },
    {
        id: uuidv4(),
        username: "Ravi Kumar",
        content: "I LOVE MEGHA"
    }
];

// Display all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Form to create a new post
app.get("/posts/new", (req, res) => {
    res.render("form");
});

// Create a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// Display a single post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show", { post });
});

// Edit form for a post
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit", { post });
});

// Update a post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const newContent = req.body.content;
    const post = posts.find(p => p.id === id);
    post.content = newContent;
    res.redirect(`/posts/${id}`);
});

//Deleting a post
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=>p.id !== id);
    //posts.splice(post.indexof(post.id));
    res.redirect("/posts");
})
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
