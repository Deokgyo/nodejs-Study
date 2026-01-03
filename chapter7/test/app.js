const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./config/mongodb");
const postService = require("./service/post-service");

app.engine("handlebars", handlebars.create({
        helpers: require("./config/helper")
    }).engine,
);
app.set("view engine", "handlebars"); 
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.render("home", {title: "자유 게시판"});
});

app.get("/write", (req, res)=> {
    res.render("write", {title: "자유 게시판"});
});

app.post("/write", async (req,res)=> {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:idx", (req,res) => {
    res.render("detail",{title: "자유 게시판"});
})

let collection;
app.listen(8080, async ()=> {
    console.log('서버실행');
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("post");
    console.log("디비연결");
});
