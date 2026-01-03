const { MongoClient } = require("mongodb");

// 실제 비밀번호가 JJkk7598@@ 라고 가정
const password = encodeURIComponent("JJkk7598@@"); 
const uri = `mongodb+srv://ejrry3218:${password}@cluster0.4gferyr.mongodb.net/board?retryWrites=true&w=majority`;
// 클라이언트 인스턴스 생성
const client = new MongoClient(uri);

module.exports = async function () {
    try {
        // 연결 시도
        await client.connect();
        console.log("MongoDB 연결 성공!");
        return client; // 혹은 client.db("board") 등을 리턴
    } catch (error) {
        console.error("MongoDB 연결 에러:", error);
        throw error;
    }
};