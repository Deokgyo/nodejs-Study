const DB = [];

function register(user) {
    return saveDB(user, function(user){
        return sendEmail(user,function(user){
            return getResult(user);
        });
    });
}

function saveDB(user,callback) {
    DB.push(user);
    console.log(`디비에 저장됨 ${user.name}`);
    return callback(user);
}

function sendEmail(user,callback) {
    console.log(`이메일 발송함 ${user.email}에게`);
    return callback(user);
}

function getResult(user) {
    return `성공함 등록 ${user.name} `;
}

const result = register({
    email:"test@test.com",
    passwd: "1234",
    name: "test"
});

console.log(result);

