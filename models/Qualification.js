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
const Qualification = mongoose.model("qualifications", schema);
module.exports = Qualification;