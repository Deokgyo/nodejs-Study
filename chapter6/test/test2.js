const express = require("express");
const bodyParser = require("body-parser");
const mongoose =  require("mongoose");
const Person = require("./test");

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.listen(8080, async ()=> {
    console.log('서버시작');
    const mongodbUri = "mongodb+srv://ejrry3218:JJkk7598%40%40@cluster0.4gferyr.mongodb.net/?appName=Cluster0";
    mongoose.connect(mongodbUri)
            .then(console.log("몽고디비와 연결"));
});

app.get("/person", async(req,res)=> {
    const person = await Person.find();
    res.send(person);
});

app.get("/person/:email", async (req,res)=> {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
})

app.post("/person", async (req, res)=> {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

app.put("/person/:email", async (req,res) => {
    const person = await Person.findOneAndUpdate(
        {email: req.params.email},
        {$set : req.body},
        {new: true}
    );
    console.log(person);
    res.send(person);
});

app.delete("/person/:email", async(req, res) => {
    await Person.deleteMany({email: req.params.email});
    res.send({success:true});
})

