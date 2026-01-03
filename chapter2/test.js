const { createServer } = require("http"); // require() : 모듈을 읽어오는 함수 
let count = 0;

const server = createServer((req,res) => { // http 객체로 서버 생성 
    // createServer에는 콜백 함수를 매개변수로 받고
    // 콜백 함수에는 req, res를 매개변수로 받음, req는 요청, res는 응답 
    log(count);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("hello\n");
    setTimeout(() => {
       res.end("Node.js"); 
    }, 2000);
});

function log(count) {
    console.log(count += 1);
}

server.listen(8080, () => console.log("hello Node js"));
