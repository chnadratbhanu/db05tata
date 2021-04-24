
const mongoose = require("mongoose")
const mangoSchemna = mongoose.Schema({
    Mangoname: {
        type:String,
        required:[true,"Name is a mandatory field"]
    }
    type: String,
    price: {
        type:Number,
        min:[1,"Mango should have a minimun of 1$ price" ],
        max:[50,"Mangoes canot have a price greater than 50$"]
    }
})
module.exports = mongoose.model("Mango", mangoSchemna)