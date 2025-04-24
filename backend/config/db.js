const mongoose = require("mongoose");
const { find, schema } = require("../models/productSchema");
// const { decode } = require("jsonwebtoken");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/prdBagDB")
            .then(() => console.log("DB connected"))
    } catch (error) {
        console.log(error, "error connecting DB");
    }
}
module.exports=connectDB