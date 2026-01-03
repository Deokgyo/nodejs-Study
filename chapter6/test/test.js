let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const personSc = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true}
});

module.exports = mongoose.model('Person', personSc);

