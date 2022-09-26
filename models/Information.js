const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        profile:{
            type:String,
            required: true
        },
        objective:{
            type:String,
            required: true
        }
    }
);
const Information = mongoose.model("informations", schema);
module.exports = Information;