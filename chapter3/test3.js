const { createServer } = require("http");
const { userInfo } = require("os");
const url = require("url");

createServer((req,res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    path in urlMap? urlMap[path](req,res) : notFound(req,res);
})
.listen("8080", () => console.log("서버 실행됨"));

const urlMap = {
    "/" : (req,res) => res.end("hello, it's home"),
    "/user": user,
    "/feed": feed
};

function user(req,res) {
    const userInfo = url.parse(req.url, true).query;
    res.end(`
        [user] name : ${userInfo.name}, age : ${userInfo.age}    
        <br>
        <a href="/feed">이동</a>
        <a href="/">없는 페이지</a>
    `)
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