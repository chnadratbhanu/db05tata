
const mongoose = require("mongoose")
const mangoSchemna = mongoose.Schema({
    Mangoname: String,
    type: String,
    price: Number
})
module.exports = mongoose.model("Mango", mangoSchemna)