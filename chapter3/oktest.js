const {createServer} = require("http");
const server = createServer((req,res)=>{
    res.setHeader("Content-Type", "text/html");
    res.end("OK");
});

server.listen("8080", ()=> console.log("서버켜짐"));

