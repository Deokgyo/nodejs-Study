// 컨트롤러 역할을 함 - 사용자의 요청을 받아서 서비스에게 전달하고, 서비스가 처리한 결과를 다시 사용자에게 응답

const express = require("express"); // 익스프레스 프레임워크 불러오기
const handlebars = require("express-handlebars"); // 핸들바 템플릿 엔진 불러오기
const app = express(); // 익스프레스 앱 생성
const mongodbConnection = require("./config/mongodb"); // 몽고디비 연결 설정 불러오기
const postService = require("./service/post-service");

app.engine("handlebars", handlebars.create({ // 핸들바 엔진 설정
        helpers: require("./config/helper") // 헬퍼 함수 불러오기
    }).engine, // 엔진 등록
);
app.set("view engine", "handlebars"); // 뷰 엔진으로 핸들바 설정
app.set("views", __dirname + "/views"); // 뷰 파일 경로 설정
app.use(express.json()); // JSON 요청 바디 파싱 미들웨어 등록
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱 미들웨어 등록

app.get("/", async (req, res)=> { // 홈 라우트

    const page = parseInt(req.query.page) || 1; // 페이지 번호 쿼리 파라미터
    const search = req.query.search || ""; // 검색어 쿼리 파라미터  
    try {
        const [ posts, paginator ] = await postService.list(collection, page, search);
        res.render("home", {title: "자유 게시판", search, posts, paginator}); // 홈 뷰 렌더링
    } catch (error) {
        console.error(error);
        res.render("home", {title : "자유 게시판"});
    }
});

app.get("/write", (req, res)=> { // 글쓰기 페이지 라우트
    res.render("write", {title: "자유 게시판"});
});

app.post("/write", async (req,res)=> { // 글쓰기 폼 제출 라우트
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:idx", (req,res) => { // 글 상세 페이지 라우트
    res.render("detail",{title: "자유 게시판"});
})

let collection; // 포스트 컬렉션 참조 변수
app.listen(8080, async ()=> { // 서버 시작
    console.log('서버실행'); // 서버 실행 메시지
    const mongoClient = await mongodbConnection(); // 몽고디비 연결
    collection = mongoClient.db().collection("post"); // 포스트 컬렉션 참조
    console.log("디비연결"); // 디비 연결 완료 메시지
});
