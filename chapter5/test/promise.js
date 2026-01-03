const DB =[];

function saveDB(user) {
    const oldDBSize = DB.length+1;
    DB.push(user);
    console.log(`저장 ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if(DB.length > oldDBSize) resolve(user);
        else(reject(new Error("디비저장실패!")));
    });
}

function sendEmail(user) {
    console.log(`이메일 발송함 to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`등록 성공 ${user.name}`);
    });
}

function register(user) {
    const result = saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error));
    console.log(result);
    return result;
}

const myUser = {
    email: "test@test.com",
    passwd: "1234",
    name: "test"
}
// allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)])
// allResult.then(console.log);

const result = register(myUser);
result.then(console.log);
