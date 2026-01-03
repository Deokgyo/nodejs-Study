const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios.get(url)
     .then((result)=>{
        if(result.status != 200) throw new Error("요청 실패!");
        if(result.data) return result.data;
        throw new Error("데이터가 없음");
     })
     .then((data) => {
        if(!data.articleList || data.articleList.size == 0) throw new Error("articleList의 데이터가 없습니다");
        return data.articleList;
     })
     .then((articles) => {
        return articles.map((article,idx) => {
            return {title: article.title,
                rank: idx +1
            };
        });
     })
     .then((results) => {
        for (let movieinfo of results) {
            console.log(`[${movieinfo.rank}위 ${movieinfo.title}]`);
        }
     })
     .catch((err) => {
        console.log("<<에러발생>>");
        console.error(err);
     });
