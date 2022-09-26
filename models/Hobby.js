const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        title:{
            type:String,
            required: true
        }
    }
);
const Hobby = mongoose.model("hobbies", schema);
module.exports = Hobby;