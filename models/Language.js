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
const Language = mongoose.model("languages", schema);
module.exports = Language;