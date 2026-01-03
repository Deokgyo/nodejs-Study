const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ejrry3218:JJkk7598%40%40@cluster0.4gferyr.mongodb.net/board";
module.exports = function (callback) {
    return MongoClient.connect(uri,callback);
}