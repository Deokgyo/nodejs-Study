async function myName() {
    return "andy";
}

console.log(myName());

async function showName() {
    const name = await myName();
    console.log(name);
}

console.log(showName());


