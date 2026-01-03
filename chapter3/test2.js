const http = require("http");
const url = require("url");

http.createServer((req,res)=> {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type","text/html; charset=utf-8");
    path == "/user" ? user(req,res) 
    : path == "/feed" ? feed(req,res) : notFound(req,res);             
})
.listen("8080", ()=> console.log("서버실행됨 라우터"));

const user = (req,res) => {
    res.write(`<a href="/feed">이동</a>`);
    res.end("[user] name : andy, age : 30"); 
}

const feed = (req,res) => {
    res.end(
        `<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>
        <a href="/user">이동</a>
        <a href="/">없는 요청 보내기</a>
        `
    );
}

const notFound = (req,res) => {
    res.statusCode = 404;
    res.end("페이지 없다 ㅄ아");
}