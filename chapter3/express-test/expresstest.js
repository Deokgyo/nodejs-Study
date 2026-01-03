const express = require("express");
const url = require("url");
const app = express();
const port = 8080;


app.get("/", (_,res) => res.end("home!!"));

app.get("/user", user);
app.get("/feed", feed);




app.listen(port, ()=> {
    console.log(`서버 실행: 포트는 ${port}`);
});

function user(req,res) {
    const user = url.parse(req.url, true).query;
    res.json(`[user] name : ${user.name}, age: ${user.name}`)
}

function feed (req,res) {
    res.end(`
        <li>
            <ul>1번</ul>
            <ul>2번</ul>
            <ul>3번</ul>
        </li>  
        <a href="/user">이동 </a>
        <a href="/"> 없는 페이지 </a>
    `);
};

function notFound(req,res) {
    res.statusCode = 404;
    res.end(`페이지 없지롱<a href="/user">이동</a>
        <a href="/">없는 ㅍㅍ페ㅣ지</a>`);
};