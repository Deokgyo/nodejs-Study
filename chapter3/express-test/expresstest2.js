const express = require("express");
const app = express();
const port = 8080;
let posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get("/", (req,res) => {
    res.json(posts);
});

app.post("/posts", (req,res)=> {
    const {title, name, text} = req.body;
    posts.push({id:posts.length+1,title,name,text, createdDt: Date()});
    res.json({title,name,text});
})

app.delete("/posts/:id", (req,res) => {
    const id = req.params.id
    const fliteredPosts = posts.filter((post) => post.id != +id);
    const isLengthChanged = posts.length != fliteredPosts.length;
    posts = fliteredPosts;

    if(isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("Not Changed")
});

app.listen(port, ()=> {
    console.log(`${port} : 서버실행`)
})

